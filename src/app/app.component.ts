import { Component, OnInit } from '@angular/core'
import * as _ from 'lodash'
import { physicalTraits } from 'src/assets/traits/physicaltraits'
import { roles } from 'src/assets/traits/role'
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
      name: 'Rôle',
      traits: roles,
    },
    {
      name: 'Attributs physiques',
      traits: physicalTraits,
    },
    {
      name: 'Équipements',
      traits: equipments,
    },
  ]

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
}
