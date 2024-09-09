import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core'
import { imageReferencesRootPath } from 'src/environments/environment'
import itemList from 'src/assets/img/image-references/image catalog.json'

@Component({
  selector: 'app-open-references-button',
  templateUrl: './open-references-button.component.html',
  styleUrls: ['./open-references-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenReferencesButtonComponent {
  @ViewChild('referencesDialog')
  referencesDialog!: ElementRef<HTMLDialogElement>
  @Input() trait
  @Output() onSave = new EventEmitter()

  traitImages

  @HostListener('click', ['$event'])
  onDialogClick(event: MouseEvent) {
    if ((event.target as any).nodeName === 'DIALOG') {
      this.close()
    }
  }
  openDialog() {
    this.getReferenceImages(this.trait)

    this.referencesDialog.nativeElement.showModal()
  }
  close() {
    this.referencesDialog.nativeElement.close()
  }
  getReferenceImages(trait) {
    const rooPath = `${imageReferencesRootPath}/${trait.name}/${trait.selected}/`
    this.traitImages = itemList
      .filter(
        img =>
          img.categories[0] == trait.name &&
          img.categories[1] == trait.selected,
      )
      .map(item => `${rooPath}${item.path}`)
  }
}
