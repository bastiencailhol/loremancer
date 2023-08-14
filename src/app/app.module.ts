import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CharacterSheetModule } from './Pages/character-sheet/character-sheet.module'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CharacterSheetModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
