import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CharacterSheetModule } from './Pages/character-sheet/character-sheet.module'

const routes: Routes = [
  { path: 'character-sheet', loadChildren: () => CharacterSheetModule },
  { path: '', redirectTo: '/character-sheet', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
