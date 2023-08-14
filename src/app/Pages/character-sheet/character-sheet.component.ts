import { Component, OnInit } from '@angular/core'
import sample from 'lodash.sample'
import { physicalTraits } from 'src/assets/traits/physicaltraits'
import { coreTraits } from 'src/assets/traits/coretraits'
import { equipments } from 'src/assets/traits/equipment'

import { ActivatedRoute, Router } from '@angular/router'
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
    this.initCategories()
    this.route.queryParams.subscribe(queryParams => {
      this.queryParams = queryParams
      const traits: any = this.categories.reduce(
        (acc: typeof coreTraits, category) => [...acc, ...category.traits],
        [],
      )
      traits.forEach(trait => {
        trait.selected = queryParams[trait.name]
      })
    })
  }

  initCategories() {
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
    this.router.navigate([''], { queryParams: this.queryParams })
  }

  clearAllUrlParams() {
    this.router.navigate([''], {})
    this.initCategories()
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
