import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core'

@Component({
  selector: 'app-generate-button',
  templateUrl: './generate-button.component.html',
  styleUrls: ['./generate-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerateButtonComponent {
  @Output() onClick = new EventEmitter()

  versions = [
    {
      text: 'Make the magic',
      color: '#FFE959',
    },
    {
      text: 'Ok, maybe something else',
      color: '#FFA553',
    },
    {
      text: 'Nah, let’s try again',
      color: '#B0F6FF',
    },
    {
      text: '…and again',
      color: '#FF8ACD',
    },
    {
      text: 'And again and again',
      color: '#76F7AE',
    },
  ]
  version = 0
  buttonState = 'default'

  onButtonClick() {
    this.onClick.emit()
    if (this.version !== this.versions.length - 1) {
      this.version += 1
    } else {
      this.version -= 1
    }
  }

  setButtonState(state: string) {
    this.buttonState = state
  }
}
