import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SettingsDialogComponent } from './settings-dialog.component'
import { ReactiveFormsModule } from '@angular/forms'
import { CloseButtonModule } from '../close-button/close-button.module'

@NgModule({
  declarations: [SettingsDialogComponent],
  imports: [CommonModule, ReactiveFormsModule, CloseButtonModule],
  exports: [SettingsDialogComponent],
})
export class SettingsDialogModule {}
