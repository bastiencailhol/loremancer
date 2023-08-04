import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { FormsModule } from '@angular/forms'
import { GenerateButtonModule } from './Components/generate-button/generate-button.module'
import { LockButtonModule } from './Components/lock-button/lock-button.module'
import { RerollButtonModule } from './Components/reroll-button/reroll-button.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    GenerateButtonModule,
    LockButtonModule,
    RerollButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
