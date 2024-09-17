import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
} from '@angular/core'

@Component({
  selector: 'app-ref-image',
  templateUrl: './ref-image.component.html',
  styleUrls: ['./ref-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefImageComponent implements AfterViewInit, OnChanges {
  @ViewChild('expandable', { static: false }) expandable!: ElementRef // Assure-toi que expandable est de type ElementRef
  @Output() onClick = new EventEmitter()
  @Input() src: string

  ngAfterViewInit() {
    this.updateHeight() // Appel initial dans ngAfterViewInit
  }

  ngOnChanges() {
    if (this.expandable) {
      this.updateHeight() // Appel uniquement si expandable est défini
    }
  }

  onImageClick() {
    this.onClick.emit()
  }

  updateHeight(
    delay = 50 /* valeur arbitraire pour attendre les images. Risque de ne plus fonctionner en ligne à cause du délai de DL)*/,
  ) {
    const el = this.expandable.nativeElement

    setTimeout(() => {
      const prevHeight = el.style.height ? el.style.height : '0px'
      el.style.height = 'auto'
      const newHeight = el.scrollHeight + 'px'
      el.style.height = prevHeight

      setTimeout(() => {
        el.style.height = newHeight
      }, 50)
    }, delay)
  }
}
