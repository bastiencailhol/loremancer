import { Component, OnInit } from '@angular/core'
import * as _ from 'lodash'
import { physicalTraits } from 'src/assets/attributes/physicaltraits'
import { roles } from 'src/assets/attributes/role'
import { coreTraits } from 'src/assets/attributes/coretraits'
import { equipments } from 'src/assets/attributes/equipment'
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

  rollAllAttributes() {
    this.categories.forEach((category) => {
      category.traits
        .filter((trait) => !trait.locked)
        .forEach((trait) => {
          trait.selected = _.sample(
            trait.attributes.filter(
              (attribute) => attribute !== trait.selected,
            ),
          )
        })
    })
  }

  rollAttributes(trait) {
    if (!trait.locked) {
      trait.selected = _.sample(
        trait.attributes.filter((attribute) => attribute !== trait.selected),
      )
    }
  }

  toggleTraitLock(trait) {
    trait.locked = !trait.locked
  }
}
