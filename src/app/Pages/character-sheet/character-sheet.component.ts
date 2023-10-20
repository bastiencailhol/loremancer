import { Component, OnInit } from '@angular/core'
import sample from 'lodash.sample'
import { physicalTraits } from 'src/assets/traits/physicaltraits'
import {
  coreTraits,
  fantasy,
  anphibians,
  arthropods,
  birds,
  cnidarians,
  fish,
  mammals,
  molluscs,
  reptiles,
  worms,
} from 'src/assets/traits/coretraits'
import { equipments } from 'src/assets/traits/equipment'

import { ActivatedRoute, NavigationExtras, Router } from '@angular/router'
import { context } from 'src/assets/traits/context'

interface Category {
  traits: typeof coreTraits
  locked: boolean
}
@Component({
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss'],
})
export class CharacterSheetComponent implements OnInit {
  settings: {
    typeOfRace: string
    showContext: boolean
    showImageRefs: boolean
  }
  coreTraitsCategory!: Category
  equipmentsCategory!: Category
  physicalTraitsCategory!: Category
  contextCategory!: Category

  categories: Category[] = []

  queryParams: any = {}
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      this.queryParams = queryParams

      this.settings = {
        typeOfRace: queryParams.typeOfRace || 'fantasy',
        showContext:
          queryParams.showContext !== undefined
            ? queryParams.showContext === 'true'
            : true,
        showImageRefs:
          queryParams.showImageRefs !== undefined
            ? queryParams.showImageRefs === 'true'
            : true,
      }
      if (!this.categories.length) {
        this.initCategories()
      }
      this.initTraits()
    })
  }

  initCategories() {
    if (this.settings.typeOfRace === 'fantasy') {
      coreTraits.find(trait => trait.name === 'Race').attributes = fantasy
    } else if (this.settings.typeOfRace === 'animals') {
      coreTraits.find(trait => trait.name === 'Race').attributes = [
        ...anphibians,
        ...arthropods,
        ...birds,
        ...cnidarians,
        ...fish,
        ...mammals,
        ...molluscs,
        ...reptiles,
        ...worms,
      ].sort()
    }
    console.log(coreTraits)
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
  }

  getRaces() {}

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
