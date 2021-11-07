import { Component, OnInit } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { AppToggleCredits } from '../store/app.actions';
import { AppState } from '../store/app.reducer';
import { getAppCreditsVisible } from '../store/app.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private store:Store<AppState>) { }

  creditsVisible$ = this.store.select(getAppCreditsVisible);

  ngOnInit(): void {
  }

  toggleCredits(): void {
    this.store.dispatch(new AppToggleCredits());
  }

}
