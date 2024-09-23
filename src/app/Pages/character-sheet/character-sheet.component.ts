import { Component, OnInit, ViewChild } from '@angular/core'
import sample from 'lodash.sample'
import { physicalTraits } from 'src/assets/traits/physicaltraits'
import {
  coreTraits,
  fantasy,
  anphibians,
  arthropods,
  birds,
  cnidarians,
  fishes,
  mammals,
  molluscs,
  reptiles,
  worms,
} from 'src/assets/traits/coretraits'
import { equipments } from 'src/assets/traits/equipment'

import { ActivatedRoute, NavigationExtras, Router } from '@angular/router'
import { context } from 'src/assets/traits/context'
import { GenerateButtonComponent } from 'src/app/Components/generate-button/generate-button.component'
import { imageReferencesRootPath } from 'src/environments/environment'
import itemList from 'src/assets/img/image-references/image-catalog.json'
import { Dialog } from '@angular/cdk/dialog'
import { RefImageGalleryComponent } from 'src/app/Components/ref-image-gallery/ref-image-gallery.component'
import { SettingsDialogComponent } from 'src/app/Components/settings-dialog/settings-dialog.component'
import { AboutDialogComponent } from 'src/app/Components/about-dialog/about-dialog.component'

interface Category {
  name: String
  traits: Trait[]
  locked?: boolean
  rerollIsPressed?: boolean
}
interface Trait {
  name: string
  attributes: string[]
  locked?: boolean
  selectedAttribute?: string
  selectedImage?: ImageRef
}
interface ImageRef {
  path: string
  mismatchPercentage: number
  sourceUrl: string
}
export interface ImageGallery {
  trait: Trait
  imageGallery: ImageRef[]
}
export interface Settings {
  race: string
  showContext: boolean
}
@Component({
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss'],
})
export class CharacterSheetComponent implements OnInit {
  @ViewChild(GenerateButtonComponent)
  generateButtonComponent!: GenerateButtonComponent
  settings: Settings
  contextCategory!: Category
  coreTraitsCategory!: Category
  equipmentsCategory!: Category
  physicalTraitsCategory!: Category

  categories: Category[]
  leftSideEquipments: Trait[] = []
  middleSideEquipments: Trait[] = []
  rightSideEquipments: Trait[] = []

  queryParams: any = {}

  categoriesLoaded = false
  firstLoad = true

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: Dialog,
  ) {}
  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      this.queryParams = queryParams
      this.settings = {
        race: queryParams.race || 'fantasy',
        showContext:
          queryParams.showContext !== undefined
            ? queryParams.showContext === 'true'
            : true,
      }
      if (!this.categoriesLoaded) {
        this.initCategories()
      }
      this.firstLoad && this.initSelectedTraits()
      this.firstLoad = false
    })
  }

  initCategories() {
    if (this.settings.race === 'fantasy') {
      coreTraits.find(trait => trait.name === 'Race').attributes = fantasy
    } else {
      const races = this.settings.race.split(',')
      coreTraits.find(trait => trait.name === 'Race').attributes = [
        ...(races.includes('anphibians') ? anphibians : []),
        ...(races.includes('arthropods') ? arthropods : []),
        ...(races.includes('birds') ? birds : []),
        ...(races.includes('cnidarians') ? cnidarians : []),
        ...(races.includes('fishes') ? fishes : []),
        ...(races.includes('mammals') ? mammals : []),
        ...(races.includes('molluscs') ? molluscs : []),
        ...(races.includes('reptiles') ? reptiles : []),
        ...(races.includes('worms') ? worms : []),
      ].sort()
    }
    this.coreTraitsCategory = {
      name: 'coreTraits',
      traits: JSON.parse(JSON.stringify(coreTraits)),
      locked: false,
    }
    this.physicalTraitsCategory = {
      name: 'physicalTraits',
      traits: JSON.parse(JSON.stringify(physicalTraits)),
      locked: false,
    }
    this.contextCategory = {
      name: 'context',
      traits: JSON.parse(JSON.stringify(context)),
      locked: false,
    }
    this.equipmentsCategory = {
      name: 'equipments',
      traits: JSON.parse(JSON.stringify(equipments)),
      locked: false,
    }
    this.leftSideEquipments = this.equipmentsCategory.traits.filter(
      trait =>
        trait.name === 'Weapon' ||
        trait.name === 'Hands' ||
        trait.name === 'Accessories',
    )
    this.middleSideEquipments = this.equipmentsCategory.traits.filter(
      trait =>
        trait.name === 'Head' ||
        trait.name === 'Chest' ||
        trait.name === 'Legs' ||
        trait.name === 'Feet',
    )
    this.rightSideEquipments = this.equipmentsCategory.traits.filter(
      trait =>
        trait.name === 'Neck' ||
        trait.name === 'Shoulders' ||
        trait.name === 'Hips',
    )
    this.categories = [
      this.coreTraitsCategory,
      this.physicalTraitsCategory,
      this.contextCategory,
      this.equipmentsCategory,
    ]

    this.categoriesLoaded = true
  }

  initSelectedTraits() {
    this.categories.forEach(category => {
      category.traits.forEach(trait => {
        if (this.queryParams[trait.name]) {
          const selectedAttribute = this.queryParams[trait.name].split(':')
          trait.selectedAttribute = selectedAttribute[0]
          if (category.name === 'equipments') {
            if (selectedAttribute[1]) {
              this.pickAttributeImage(trait, selectedAttribute[1])
            } else {
              this.rollAttributeImage(trait)
            }
          }
        }
      })
    })
  }

  rollAllTraits() {
    this.categories.forEach(category => {
      this.rollCategoryTraits(category)
    })
  }
  categoryRerollIsPressed(category: Category, isPressed: boolean) {
    category.rerollIsPressed = isPressed
  }
  categoriesRerollIsPressed(categories: Category[], isPressed: boolean) {
    categories.forEach(category => {
      category.rerollIsPressed = isPressed
    })
  }

  rollCategoryTraits(category: Category) {
    if (!category.locked) {
      category.traits.forEach(trait => {
        this.rollTrait(trait, category.name === 'equipments')
      })
    }
  }

  rollTrait(trait: Trait, shouldRollImage = false) {
    if (!trait.locked) {
      trait.selectedAttribute = sample(
        trait.attributes.filter(
          attribute => attribute !== trait.selectedAttribute,
        ),
      )
      if (trait.name !== '' && shouldRollImage) {
        this.rollAttributeImage(trait)
      } else {
        this.updateUrl(trait)
      }
    }
  }

  rollAttributeImage(trait: Trait) {
    this.pickAttributeImage(
      trait,
      sample(Object.keys(itemList[trait.selectedAttribute])),
    )
  }
  pickAttributeImage(trait: Trait, imageHash: string) {
    trait.selectedImage = itemList[trait.selectedAttribute][imageHash]
    this.updateUrl(trait, imageHash)
  }

  getRootImagePath(trait: Trait) {
    return `${imageReferencesRootPath}/${trait.selectedAttribute}/`
  }

  emptyImageTrait(trait: Trait) {
    trait.selectedImage = null
  }

  openImageGalleryDialog(trait: Trait) {
    const imageGallery = itemList[trait.selectedAttribute]
    const dialogRef = this.dialog.open(RefImageGalleryComponent, {
      data: {
        trait,
        imageGallery,
      },
      backdropClass: 'dialog-backdrop',
      autoFocus: false,
    })
    dialogRef.closed.subscribe((selectedImageKey: string) => {
      if (selectedImageKey) {
        this.pickAttributeImage(trait, selectedImageKey)
      }
    })
  }

  openSettingsDialog() {
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      data: {
        ...this.settings,
      },
      backdropClass: 'dialog-backdrop',
      autoFocus: false,
    })
    dialogRef.closed.subscribe(result => {
      this.categoriesLoaded = false
    })
  }
  openAboutDialog() {
    const dialogRef = this.dialog.open(AboutDialogComponent, {
      data: {
        ...this.settings,
      },
      backdropClass: 'dialog-backdrop',
      autoFocus: false,
    })
  }

  updateUrl(trait: Trait, imageHash = '') {
    let traitUrl = imageHash
      ? `${trait.selectedAttribute}:${imageHash}`
      : trait.selectedAttribute

    this.queryParams = {
      ...this.queryParams,
      [trait.name]: traitUrl,
    }
    this.router.navigate([], { queryParams: this.queryParams })
  }
  onSelectChange(trait: any, category: any) {
    if (category.name === 'equipments') {
      if (trait.selectedAttribute) {
        this.rollAttributeImage(trait)
      } else {
        this.emptyImageTrait(trait)
        this.updateUrl(trait)
      }
    } else {
      this.updateUrl(trait)
    }
    this.toggleTraitLock(category, trait, true)
  }

  clearAllUrlParams() {
    this.initCategories()
    this.generateButtonComponent.resetVersion()
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ...this.settings,
      },
    }
    this.router.navigate([], navigationExtras)
  }

  toggleTraitLock(category, trait, value?: boolean) {
    if (value !== undefined) {
      trait.locked = value
    } else {
      trait.locked = !trait.locked
    }
    this.setCategoryLock(category, this.checkIfEveryTraitIsLocked(category))
  }

  toggleCategoryLock(category) {
    category.locked = !category.locked
    category.traits.forEach(trait => {
      trait.locked = category.locked
    })
  }
  setCategoryLock(category, value) {
    category.locked = value
  }

  checkIfEveryTraitIsLocked(category) {
    return category.traits
      .map(trait => trait.locked)
      .every(traitIsLocked => traitIsLocked)
  }
}
