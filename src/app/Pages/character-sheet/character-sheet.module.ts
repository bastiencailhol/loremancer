import { NgModule } from '@angular/core'
import { CharacterSheetComponent } from './character-sheet.component'
import { FormsModule } from '@angular/forms'
import { CardModule } from 'src/app/Components/card/card.module'
import { GenerateButtonModule } from 'src/app/Components/generate-button/generate-button.module'
import { LockButtonModule } from 'src/app/Components/lock-button/lock-button.module'
import { RerollButtonModule } from 'src/app/Components/reroll-button/reroll-button.module'
import { CommonModule } from '@angular/common'
import { CharacterSheetRouterModule } from './character-sheet-routing.module'
import { BannerModule } from 'src/app/Components/banner/banner.module'
import { RefImageModule } from 'src/app/Components/ref-image/ref-image.module'
import { RefImageGalleryModule } from 'src/app/Components/ref-image-gallery/ref-image-gallery.module'
import { SettingsDialogModule } from 'src/app/Components/settings-dialog/settings-dialog.module'

@NgModule({
  declarations: [CharacterSheetComponent],
  imports: [
    CharacterSheetRouterModule,
    CommonModule,
    FormsModule,
    GenerateButtonModule,
    LockButtonModule,
    RerollButtonModule,
    CardModule,
    BannerModule,
    SettingsDialogModule,
    RefImageGalleryModule,
    RefImageModule,
  ],
  exports: [CharacterSheetComponent],
})
export class CharacterSheetModule {}
