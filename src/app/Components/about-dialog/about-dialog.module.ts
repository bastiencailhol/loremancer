import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AboutDialogComponent } from './about-dialog.component'
import { DialogModule } from '@angular/cdk/dialog'
import { CloseButtonModule } from '../close-button/close-button.module'

@NgModule({
  declarations: [AboutDialogComponent],
  imports: [CommonModule, DialogModule, CloseButtonModule],
  exports: [AboutDialogComponent],
})
export class AboutDialogModule {}
