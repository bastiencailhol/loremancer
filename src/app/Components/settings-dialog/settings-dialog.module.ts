import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SettingsDialogComponent } from './settings-dialog.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [SettingsDialogComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [SettingsDialogComponent],
})
export class SettingsDialogModule {}
