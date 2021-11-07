import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu.component';
import { WelcomeComponent } from './pages/welcome.component';
import { AdvformComponent } from './pages/advform/advform.component';
import { Error404Component } from './pages/error404.component';
import { AdvGinTxtRMlComponent } from './components/adv-gin-txt-r-ml.component';
import { AdvGinSelRComponent } from './components/adv-gin-sel-r.component';
import { ObsSampleComponent } from './pages/obs-sample/obs-sample.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    WelcomeComponent,
    AdvformComponent,
    Error404Component,
    AdvGinTxtRMlComponent,
    AdvGinSelRComponent,
    ObsSampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
