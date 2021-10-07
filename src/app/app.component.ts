import { Component, OnInit } from '@angular/core'
import * as _ from 'lodash'
import {
  ageAttributes,
  appearanceAttributes,
  genderAttributes,
  hairAttributes,
  keyFeatureAttributes,
  personnalityAttributes,
  raceAttributes,
} from 'src/assets/attributes/being'
import {
  backgroundAttributes,
  frameAttributes,
  paletteAttributes,
  periodAttributes,
} from 'src/assets/attributes/framing'

import {
  backAttributes,
  beltAttributes,
  bottomAttributes,
  feetAttributes,
  handAttributes,
  headAttributes,
  jewelsAttributes,
  petAttributes,
  topAttributes,
} from 'src/assets/attributes/props'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
/*
TODO :
- Migrer les categories dans un fichier de définition
- Compléter les listes
- Renseigner liestes manquantes
- Ajouter des icônes pour chaque catégorie
- Séparer Cheveux & pilosité ?
 */
export class AppComponent implements OnInit {
  categories: any = [
    {
      name: 'Tête',
      attributes: headAttributes,
    },
    {
      name: 'Main',
      attributes: handAttributes,
    },
    {
      name: 'Haut',
      attributes: topAttributes,
    },
    {
      name: 'Bas',
      attributes: bottomAttributes,
    },
    {
      name: 'Pieds',
      attributes: feetAttributes,
    },
    {
      name: 'Dos',
      attributes: backAttributes,
    },
    {
      name: 'Ceinture',
      attributes: beltAttributes,
    },
    {
      name: 'Bijoux',
      attributes: jewelsAttributes,
    },
    {
      name: 'Familier',
      attributes: petAttributes,
    },
    {
      name: 'Genre',
      attributes: genderAttributes,
    },
    {
      name: 'Âge',
      attributes: ageAttributes,
    },
    {
      name: 'Race',
      attributes: raceAttributes,
    },
    {
      name: 'Apparence',
      attributes: appearanceAttributes,
    },
    {
      name: 'Coiffure',
      attributes: hairAttributes,
    },
    {
      name: 'Particularité',
      attributes: keyFeatureAttributes,
    },
    {
      name: 'Personnalité',
      attributes: personnalityAttributes,
    },
    {
      name: 'Cadre',
      attributes: frameAttributes,
    },
    {
      name: 'Palette',
      attributes: paletteAttributes,
    },
    {
      name: 'Décors',
      attributes: backgroundAttributes,
    },
    {
      name: 'Période',
      attributes: periodAttributes,
    },
  ]

  constructor() {}
  ngOnInit() {}

  rollAllAttributes() {
    this.categories
      .filter((category) => !category.locked)
      .forEach((category) => {
        category.selected = _.sample(
          category.attributes.filter(
            (attribute) => attribute !== category.selected,
          ),
        )
      })
  }

  rollAttributes(category) {
    if (!category.locked) {
      category.selected = _.sample(
        category.attributes.filter(
          (attribute) => attribute !== category.selected,
        ),
      )
    }
  }

  toggleCategoryLock(category) {
    category.locked = !category.locked
  }
}
