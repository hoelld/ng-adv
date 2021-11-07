import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvformComponent } from './pages/advform/advform.component';
import { Error404Component } from './pages/error404.component';
import { ObsSampleComponent } from './pages/obs-sample/obs-sample.component';
import { WelcomeComponent } from './pages/welcome.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'advform', component: AdvformComponent },
  { path: 'obsform', component: ObsSampleComponent },
  { path: '', redirectTo: 'welcome', pathMatch:'full'},
  { path: '**', component:Error404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
