import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Author } from '../model/author';
import { AuthorsService } from '../model/authors.service';
import { AppActionTypes, AppLoadAuthorsFailure, AppLoadAuthorsSuccess } from './app.actions';



@Injectable()
export class AppEffects {

 

  constructor(private actions$: Actions, private auts: AuthorsService) {}

  @Effect()
  loadAuthor$: Observable<Action> = this.actions$.pipe(
    ofType(AppActionTypes.AppLoadAuthors),
    mergeMap((action) =>
    this.auts.getAuthors().pipe(
      map((authors: Author[]) => new AppLoadAuthorsSuccess(authors)),
      catchError((err) => of(new AppLoadAuthorsFailure(err)))
    ))
  )
}
