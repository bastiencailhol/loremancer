import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CharacterSheetComponent } from './character-sheet.component'

const routes = [{ path: '', component: CharacterSheetComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharacterSheetRouterModule {}
