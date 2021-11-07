import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'adv-menu',
  template: `
    <div class="menu">
      <a href="#" [routerLink]="['/welcome']">Welcome</a> |
      <a href="#" [routerLink]="['/advform']">Adv Form</a> |
      <a href="#" [routerLink]="['/obsform']">Obs Form</a> |
      <a href="#" [routerLink]="['/missingLink']">Missing Link</a>
    </div>
  `,
  styles: [
    `
    .menu {
      padding: 1rem;
      padding-top:0rem;
    }
    
    `
  ]
})
export class MenuComponent {
  constructor() { }
}
