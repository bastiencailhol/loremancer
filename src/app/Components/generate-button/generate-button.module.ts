import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GenerateButtonComponent } from './generate-button.component'
import { CardModule } from '../card/card.module'

@NgModule({
  declarations: [GenerateButtonComponent],
  imports: [CommonModule, CardModule],
  exports: [GenerateButtonComponent],
})
export class GenerateButtonModule {}
