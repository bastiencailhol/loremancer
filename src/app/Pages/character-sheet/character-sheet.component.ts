import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
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
import itemList from 'src/assets/img/image-references/image catalog.json'

interface Category {
  traits: Trait[]
  locked?: boolean
}
interface Trait {
  name: string
  attributes: string[]
  locked?: boolean
  selectedAttribute?: string
  selectedImage?: string
}
@Component({
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss'],
})
export class CharacterSheetComponent implements OnInit, AfterViewInit {
  @ViewChild(GenerateButtonComponent)
  generateButtonComponent!: GenerateButtonComponent
  settings: {
    race: string
    showContext: boolean
    showImageRefs: boolean
  }
  contextCategory!: Category
  coreTraitsCategory!: Category
  equipmentsCategory!: Category
  physicalTraitsCategory!: Category

  categories: Category[] = []
  leftSideEquipments: Trait[] = []
  middleSideEquipments: Trait[] = []
  rightSideEquipments: Trait[] = []

  queryParams: any = {}

  categoriesLoaded = false
  firstLoad = true

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
        showImageRefs:
          queryParams.showImageRefs !== undefined
            ? queryParams.showImageRefs === 'true'
            : true,
      }
      if (!this.categoriesLoaded) {
        this.initCategories()
      }
      this.initSelectedTraits()
      this.firstLoad = false
    })
  }

  ngAfterViewInit() {}

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
      traits: JSON.parse(JSON.stringify(coreTraits)),
      locked: false,
    }
    this.physicalTraitsCategory = {
      traits: JSON.parse(JSON.stringify(physicalTraits)),
      locked: false,
    }
    this.contextCategory = {
      traits: JSON.parse(JSON.stringify(context)),
      locked: false,
    }
    this.equipmentsCategory = {
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
    const traits: Trait[] = this.categories.reduce(
      (acc: typeof coreTraits, category) => [...acc, ...category.traits],
      [],
    )
    traits.forEach(trait => {
      trait.selectedAttribute = this.queryParams[trait.name]
      if (this.firstLoad && trait.selectedAttribute) {
        this.rollTraitImage(trait)
      }
    })
  }

  rollAllTraits() {
    this.categories.forEach(category => {
      this.rollCategoryTraits(category)
    })
  }

  rollCategoryTraits(category: Category) {
    if (!category.locked) {
      category.traits.forEach(trait => {
        this.rollTrait(trait)
      })
    }
  }

  rollTrait(trait: Trait) {
    if (!trait.locked) {
      trait.selectedAttribute = sample(
        trait.attributes.filter(
          attribute => attribute !== trait.selectedAttribute,
        ),
      )
      this.rollTraitImage(trait)
      this.updateUrl(trait)
    }
  }
  rollTraitImage(trait: Trait) {
    const traitImagesPath = `${trait.name}/${trait.selectedAttribute}`
    const sampledImage = `${imageReferencesRootPath}/${traitImagesPath}/${sample(
      itemList[traitImagesPath],
    )}`
    console.log(traitImagesPath, itemList[traitImagesPath], sampledImage)
    trait.selectedImage = sampledImage
  }

  updateUrl(trait: Trait) {
    this.queryParams = {
      ...this.queryParams,
      [trait.name]: trait.selectedAttribute,
    }
    this.router.navigate([], { queryParams: this.queryParams })
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
