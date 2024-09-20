import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RefImageGalleryComponent } from './ref-image-gallery.component'
import { DialogModule } from '@angular/cdk/dialog'
import { RefImageModule } from '../ref-image/ref-image.module'
import { SourceUrlButtonModule } from '../source-url-button/source-url-button.module'
import { CloseButtonModule } from '../close-button/close-button.module'

@NgModule({
  declarations: [RefImageGalleryComponent],
  imports: [
    CommonModule,
    DialogModule,
    RefImageModule,
    SourceUrlButtonModule,
    RefImageModule,
    CloseButtonModule,
  ],
  exports: [RefImageGalleryComponent],
})
export class RefImageGalleryModule {}
