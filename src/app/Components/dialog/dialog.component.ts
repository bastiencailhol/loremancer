import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog'
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core'
import { DialogData } from 'src/app/Pages/character-sheet/character-sheet.component'
import { imageReferencesRootPath } from 'src/environments/environment'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomDialogComponent {
  imagesRootPath = `${imageReferencesRootPath}/${this.data.trait.selectedAttribute}`
  constructor(
    public dialogRef: DialogRef<CustomDialogComponent>,
    @Inject(DIALOG_DATA) public data: DialogData,
  ) {}

  onClose(selectedImage) {
    this.dialogRef.close(selectedImage)
  }
}
