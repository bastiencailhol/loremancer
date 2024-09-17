import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog'
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core'
import { ImageGallery } from 'src/app/Pages/character-sheet/character-sheet.component'
import { imageReferencesRootPath } from 'src/environments/environment'

@Component({
  selector: 'app-ref-image-gallery',
  templateUrl: './ref-image-gallery.component.html',
  styleUrls: ['./ref-image-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefImageGalleryComponent {
  imagesRootPath = `${imageReferencesRootPath}/${this.data.trait.selectedAttribute}`
  constructor(
    public dialogRef: DialogRef<RefImageGalleryComponent>,
    @Inject(DIALOG_DATA) public data: ImageGallery,
  ) {}

  onClose(selectedImage) {
    this.dialogRef.close(selectedImage)
  }
}
