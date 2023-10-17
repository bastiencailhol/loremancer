import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: 'character-sheet',
    loadChildren: () =>
      import('./Pages/character-sheet/character-sheet.module').then(
        (m) => m.CharacterSheetModule,
      ),
  },
  { path: '', redirectTo: '/character-sheet', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
