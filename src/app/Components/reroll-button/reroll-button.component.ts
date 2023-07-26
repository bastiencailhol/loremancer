import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core'

@Component({
  selector: 'app-reroll-button',
  templateUrl: './reroll-button.component.html',
  styleUrls: ['./reroll-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RerollButtonComponent {
  @Output() onClick = new EventEmitter()

  onButtonClick() {
    this.onClick.emit()
  }
}
