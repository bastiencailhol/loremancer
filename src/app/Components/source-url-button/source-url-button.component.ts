import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'

@Component({
  selector: 'app-source-url-button',
  templateUrl: './source-url-button.component.html',
  styleUrls: ['./source-url-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SourceUrlButtonComponent {
  @Input() url = 'string'

  openUrl() {
    if (this.openUrl) {
      window.open(this.url, '_blank')
    }
  }
}
