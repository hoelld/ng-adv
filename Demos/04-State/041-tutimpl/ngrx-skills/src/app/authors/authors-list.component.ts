import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppLoadAuthors, AppLoadAuthorsFailure } from '../store/app.actions';
import { AppState } from '../store/app.reducer';
import { getAppAuthors } from '../store/app.selectors';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.scss']
})
export class AuthorsListComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  authors$ = this.store.select(getAppAuthors);

  ngOnInit(): void {
    this.store.dispatch(new AppLoadAuthors());
  }

}
