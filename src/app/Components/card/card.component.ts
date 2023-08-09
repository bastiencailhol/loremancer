import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() addClass = ''
  @Input() size: 'sm' | 'xl' = 'sm'
  @Input() color: string | undefined = 'white'

  variant = Math.floor(Math.random() * 2) + 1
}
