import { Component, OnInit } from '@angular/core'
import sample from 'lodash.sample'
import { physicalTraits } from 'src/assets/traits/physicaltraits'
import { coreTraits } from 'src/assets/traits/coretraits'
import { equipments } from 'src/assets/traits/equipment'
import { ActivatedRoute, Router } from '@angular/router'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  coreTraitsCategory = {
    name: 'Caractéristiques',
    traits: coreTraits,
    locked: false,
  }
  equipmentsCategory = {
    name: 'Équipements',
    traits: equipments,
    locked: false,
  }
  physicalTraitsCategory = {
    name: 'Attributs physiques',
    traits: physicalTraits,
    locked: false,
  }

  categories: any[] = [
    this.coreTraitsCategory,
    this.equipmentsCategory,
    this.physicalTraitsCategory,
  ]

  queryParams: any = {}
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
      this.queryParams = queryParams
      const traits: any = this.categories.reduce(
        (acc, category) => [...acc, ...category.traits],
        [],
      )
      traits.forEach((trait) => {
        trait.selected = queryParams[trait.name]
      })
    })
  }

  rollAllTraits() {
    this.categories.forEach((category) => {
      this.rollCategoryTraits(category)
    })
  }

  rollCategoryTraits(category) {
    if (!category.locked) {
      category.traits.forEach((trait) => {
        this.rollTrait(trait)
      })
    }
  }

  rollTrait(trait) {
    if (!trait.locked) {
      trait.selected = sample(
        trait.attributes.filter((attribute) => attribute !== trait.selected),
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
  }

  toggleTraitLock(category, trait) {
    trait.locked = !trait.locked
    this.setCategoryLock(category, this.checkIfEveryTraitIsLocked(category))
  }

  toggleCategoryLock(category) {
    category.locked = !category.locked
    category.traits.forEach((trait) => {
      trait.locked = category.locked
    })
  }
  setCategoryLock(category, value) {
    category.locked = value
  }

  checkIfEveryTraitIsLocked(category) {
    return category.traits
      .map((trait) => trait.locked)
      .every((traitIsLocked) => traitIsLocked)
  }
}
