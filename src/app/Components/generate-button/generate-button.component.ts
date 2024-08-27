import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import sample from 'lodash.sample'

interface Version {
  text: string
  color: string
  lighterColor: string
  darkerColor: string
}

@Component({
  selector: 'app-generate-button',
  templateUrl: './generate-button.component.html',
  styleUrls: ['./generate-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerateButtonComponent {
  constructor(private cd: ChangeDetectorRef) {}
  @Output() onClick = new EventEmitter()

  versions: Version[] = [
    {
      text: 'Summon the fates!',
      color: '#FBF472',
      lighterColor: '#F9ED86',
      darkerColor: '#7F7E25',
    },
    {
      text: 'Tell another tale',
      color: '#FFC95E',
      lighterColor: '#FECC67',
      darkerColor: '#7F5E25',
    },
    {
      text: 'Give it another go',
      color: '#8DFFF2',
      lighterColor: '#9AFDF3',
      darkerColor: '#255F7F',
    },
    {
      text: 'Seek new horizons',
      color: '#FFAADF',
      lighterColor: '#FEAEE0',
      darkerColor: '#7F2561',
    },
    {
      text: 'One more attempt',
      color: '#8DFFC2',
      lighterColor: '#9AFDC8',
      darkerColor: '#257F5F',
    },
    {
      text: 'Seeking perfection',
      color: '#FF9595',
      lighterColor: '#FE9B9B',
      darkerColor: '#7E2525',
    },
    {
      text: 'Adventure goes on!',
      color: '#80E8FF',
      lighterColor: '#8FEAFD',
      darkerColor: '#255F7F',
    },
    {
      text: 'Keep exploring…',
      color: '#FFB388',
      lighterColor: '#FEB78F',
      darkerColor: '#7F4F25',
    },
    {
      text: 'New fantasy awaits',
      color: '#BFFF80',
      lighterColor: '#C5FD8F',
      darkerColor: '#4F7F25',
    },
    {
      text: 'Quest for more !',
      color: '#ABC2FF',
      lighterColor: '#B2C7FF',
      darkerColor: '#25617F',
    },
    {
      text: 'Need to dig deeper',
      color: '#FFA9F2',
      lighterColor: '#FEAEF3',
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

  public resetVersion() {
    this.version = this.versions[0]
    this.cd.detectChanges()
  }
}
