import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RerollButtonComponent } from './Components/reroll-button/reroll-button.component';
import { LockButtonComponent } from './Components/lock-button/lock-button.component';

@NgModule({
  declarations: [
    AppComponent,
    RerollButtonComponent,
    LockButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
