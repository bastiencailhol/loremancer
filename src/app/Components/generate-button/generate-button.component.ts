import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core'
import * as _ from 'lodash'

interface Version {
  text: string
  color: string
}

@Component({
  selector: 'app-generate-button',
  templateUrl: './generate-button.component.html',
  styleUrls: ['./generate-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerateButtonComponent {
  @Output() onClick = new EventEmitter()

  versions: Version[] = [
    {
      text: 'Unleash the Magic!',
      color: '#FFE959',
    },
    {
      text: 'Hmmm… something else?',
      color: '#FFA553',
    },
    {
      text: 'Try again',
      color: '#B0F6FF',
    },
    {
      text: 'Not quite right…',
      color: '#FF8ACD',
    },
    {
      text: 'One more time',
      color: '#76F7AE',
    },
    {
      text: 'Seeking Perfection…',
      color: '#FBBDAE',
    },
    {
      text: 'The adventure continues!',
      color: '#A4C3E7',
    },
    {
      text: 'Keep exploring',
      color: '#FFC48C',
    },
    {
      text: 'Another fantasy awaits!',
      color: '#A3E7C4',
    },
    {
      text: 'Nah… another quest!',
      color: '#E5A3FF',
    },
    {
      text: "Let's dig deeper…",
      color: '#FFC4E5',
    },
  ]
  version: Version | undefined = this.versions[0]
  buttonState = 'default'

  onButtonClick() {
    this.onClick.emit()
    this.version = _.sample(
      this.versions.filter((version) => version !== this.version),
    )
  }

  setButtonState(state: string) {
    this.buttonState = state
  }
}
