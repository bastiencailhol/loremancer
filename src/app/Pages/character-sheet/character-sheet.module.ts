import { NgModule } from '@angular/core'
import { CharacterSheetComponent } from './character-sheet.component'
import { FormsModule } from '@angular/forms'
import { CardModule } from 'src/app/Components/card/card.module'
import { GenerateButtonModule } from 'src/app/Components/generate-button/generate-button.module'
import { LockButtonModule } from 'src/app/Components/lock-button/lock-button.module'
import { RerollButtonModule } from 'src/app/Components/reroll-button/reroll-button.module'

@NgModule({
  declarations: [CharacterSheetComponent],
  imports: [
    FormsModule,
    GenerateButtonModule,
    LockButtonModule,
    RerollButtonModule,
    CardModule,
    CharacterSheetModule,
  ],
  exports: [CharacterSheetComponent],
})
export class CharacterSheetModule {}
