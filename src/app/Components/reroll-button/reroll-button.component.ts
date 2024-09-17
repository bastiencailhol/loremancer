import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
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
  @Input() hidden = false
  @Input() categoryRerollIsPressed = false

  onButtonClick() {
    this.onClick.emit()
  }
}
