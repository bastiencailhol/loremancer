import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'

@Component({
  selector: 'app-lock-button',
  templateUrl: './lock-button.component.html',
  styleUrls: ['./lock-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LockButtonComponent {
  @Output() onClick = new EventEmitter()
  @Input() isLocked = false

  onButtonClick() {
    this.onClick.emit()
  }
}
