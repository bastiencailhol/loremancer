import { Component, OnInit } from '@angular/core'
import * as _ from 'lodash'
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
  categories: any[] = [
    {
      name: 'Caractéristiques',
      traits: coreTraits,
    },
    {
      name: 'Équipements',
      traits: equipments,
    },
    {
      name: 'Attributs physiques',
      traits: physicalTraits,
    },
  ]
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

  constructor() {}
  ngOnInit() {}

  rollAllTraits() {
    this.categories.forEach((category) => {
      if (!category.locked) {
        this.rollCategoryTraits(category)
      }
    })
  }

  rollCategoryTraits(category) {
    category.traits.forEach((trait) => {
      if (!trait.locked) {
        this.rollTrait(trait)
      }
    })
  }

  rollTrait(trait) {
    trait.selected = _.sample(
      trait.attributes.filter((attribute) => attribute !== trait.selected),
    )
  }

  toggleTraitLock(trait) {
    trait.locked = !trait.locked
  }
  toggleCategoryLock(category) {
    category.locked = !category.locked
  }
}
