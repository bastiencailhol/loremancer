import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RefImageComponent } from './ref-image.component'
import { SourceUrlButtonModule } from '../source-url-button/source-url-button.module'

@NgModule({
  declarations: [RefImageComponent],
  imports: [CommonModule, SourceUrlButtonModule],
  exports: [RefImageComponent],
})
export class RefImageModule {}
