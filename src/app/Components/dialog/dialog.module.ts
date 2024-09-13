import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CustomDialogComponent } from './dialog.component'
import { DialogModule } from '@angular/cdk/dialog'

@NgModule({
  declarations: [CustomDialogComponent],
  imports: [CommonModule, DialogModule],
  exports: [CustomDialogComponent],
})
export class CustomDialogModule {}
