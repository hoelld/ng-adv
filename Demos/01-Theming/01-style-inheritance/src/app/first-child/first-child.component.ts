import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-first-child',
  template: `
    <div class="divclass">First Child</div>
    <h3>Never had a span like this</h3>
    <div class="seehowctxworks">
      <app-nested-child></app-nested-child>
    </div>
  `,
  //encapsulation : ViewEncapsulation.Emulated,
  styles: [
    `
      .divclass {
        border: blue 4px solid;
      }
    `,
  ],
})
export class FirstChildComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
