import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() size: 'sm' | 'xl' = 'sm'

  variant = Math.floor(Math.random() * 2) + 1
}
