import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core'
import sample from 'lodash.sample'

interface Version {
  text: string
  color: string
  darkerColor: string
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
      color: '#FCFF65',
      darkerColor: '#7F7E25',
    },
    {
      text: 'Hmmm… something else?',
      color: '#FFC95E',
      darkerColor: '#7F5E25',
    },
    {
      text: 'Try again',
      color: '#8DFFF2',
      darkerColor: '#255F7F',
    },
    {
      text: 'Not quite right…',
      color: '#FFAADF',
      darkerColor: '#7F2561',
    },
    {
      text: 'One more time',
      color: '#8DFFC2',
      darkerColor: '#257F5F',
    },
    {
      text: 'Seeking Perfection…',
      color: '#FF9595',
      darkerColor: '#7E2525',
    },
    {
      text: 'The adventure continues!',
      color: '#80E8FF',
      darkerColor: '#255F7F',
    },
    {
      text: 'Keep exploring',
      color: '#FFB388',
      darkerColor: '#7F4F25',
    },
    {
      text: 'Another fantasy awaits!',
      color: '#BFFF80',
      darkerColor: '#4F7F25',
    },
    {
      text: 'Nah… another quest!',
      color: '#ABC2FF',
      darkerColor: '#25617F',
    },
    {
      text: "Let's dig deeper…",
      color: '#FFA9F2',
      darkerColor: '#7F2561',
    },
  ]

  version: Version | undefined = this.versions[0]
  buttonState = 'default'

  onButtonClick() {
    this.onClick.emit()
    this.version = sample(
      this.versions.filter((version) => version !== this.version),
    )
  }

  setButtonState(state: string) {
    this.buttonState = state
  }
}
