import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core'

@Component({
  selector: 'app-ref-image',
  templateUrl: './ref-image.component.html',
  styleUrls: ['./ref-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefImageComponent {
  @ViewChild('expandable', { static: false }) expandable!: ElementRef
  @Output() onClick = new EventEmitter<void>()
  @Input() src: string = ''
  firstLoad = true

  onImageClick() {
    this.onClick.emit()
  }

  updateHeight() {
    const el = this.expandable.nativeElement

    requestAnimationFrame(() => {
      let prevHeight
      if (this.firstLoad) {
        el.style.height = '0px'
        prevHeight = '0px'
      } else {
        prevHeight = el.style.height
        el.style.height = 'auto'
      }
      const newHeight = el.scrollHeight + 'px'
      el.style.height = prevHeight

      // Use requestAnimationFrame for smoother animation
      requestAnimationFrame(() => {
        el.style.height = newHeight
      })
    })

    this.firstLoad = false
  }
}
