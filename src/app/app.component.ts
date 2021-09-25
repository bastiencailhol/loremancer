import { Component, OnInit } from '@angular/core'
import * as _ from 'lodash'

import { hatAttributes } from 'src/assets/attributes/hats'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  hatAttributes: string[] = hatAttributes
  selectedHat = ''
  constructor() {}
  ngOnInit() {}

  rollAllAttributes() {
    this.selectedHat = _.sample(this.hatAttributes)!
  }
}
