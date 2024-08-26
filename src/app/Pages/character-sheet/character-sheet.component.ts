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

interface Category {
  traits: typeof coreTraits
  locked: boolean
}
@Component({
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss'],
})
export class CharacterSheetComponent implements OnInit, AfterViewInit {
  @ViewChild(GenerateButtonComponent) generateButtonComponent!: GenerateButtonComponent
  settings: {
    race: string
    showContext: boolean
    showImageRefs: boolean
  }
  coreTraitsCategory!: Category
  equipmentsCategory!: Category
  physicalTraitsCategory!: Category
  contextCategory!: Category

  categories: Category[] = []

  queryParams: any = {}

  categoriesLoaded = false

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
      this.initTraits()
    })
  }

  ngAfterViewInit() {

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
    this.categories = [
      this.coreTraitsCategory,
      this.physicalTraitsCategory,
      this.contextCategory,
      this.equipmentsCategory,
    ]
    this.categoriesLoaded = true
  }

  initTraits() {
    const traits: any = this.categories.reduce(
      (acc: typeof coreTraits, category) => [...acc, ...category.traits],
      [],
    )
    traits.forEach(trait => {
      trait.selected = this.queryParams[trait.name]
    })
  }

  rollAllTraits() {
    this.categories.forEach(category => {
      this.rollCategoryTraits(category)
    })
  }

  rollCategoryTraits(category) {
    if (!category.locked) {
      category.traits.forEach(trait => {
        this.rollTrait(trait)
      })
    }
  }

  rollTrait(trait) {
    if (!trait.locked) {
      trait.selected = sample(
        trait.attributes.filter(attribute => attribute !== trait.selected),
      )
      this.updateUrl(trait)
    }
  }
  updateUrl(trait) {
    this.queryParams = { ...this.queryParams, [trait.name]: trait.selected }
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
