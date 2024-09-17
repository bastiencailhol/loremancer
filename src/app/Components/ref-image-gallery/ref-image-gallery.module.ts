import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RefImageGalleryComponent } from './ref-image-gallery.component'
import { DialogModule } from '@angular/cdk/dialog'
import { RefImageModule } from '../ref-image/ref-image.module'

@NgModule({
  declarations: [RefImageGalleryComponent],
  imports: [CommonModule, DialogModule, RefImageModule],
  exports: [RefImageGalleryComponent],
})
export class RefImageGalleryModule {}
