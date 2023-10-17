import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SettingsButtonComponent } from './settings-button.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [SettingsButtonComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [SettingsButtonComponent],
})
export class SettingsButtonModule {}
