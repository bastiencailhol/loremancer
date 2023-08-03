import { Component, OnInit } from '@angular/core'
import sample from 'lodash.sample'
import { physicalTraits } from 'src/assets/traits/physicaltraits'
import { coreTraits } from 'src/assets/traits/coretraits'
import { equipments } from 'src/assets/traits/equipment'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
/*
TODO :
- Migrer les categories dans un fichier de définition
- Compléter les listes
- Renseigner listes manquantes
- Ajouter des icônes pour chaque catégorie
- Séparer Cheveux & pilosité ?
 */
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
  constructor() {}
  ngOnInit() {}

  rollAllTraits() {
    this.categories.forEach((category) => {
      {
        this.rollCategoryTraits(category)
      }
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
    }
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
