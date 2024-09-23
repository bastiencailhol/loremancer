import { DialogRef } from '@angular/cdk/dialog'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutDialogComponent {
  constructor(public dialogRef: DialogRef<AboutDialogComponent>) {}

  onClose() {
    this.dialogRef.close()
  }
}
