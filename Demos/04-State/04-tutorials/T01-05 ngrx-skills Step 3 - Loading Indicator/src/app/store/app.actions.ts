import { Action } from '@ngrx/store';
import { Author } from '../model/author';

export enum AppActionTypes {
  // App State
  AppToggleCredits = '[App] Toggle Credits',
  AppToggleMenu = '[App] Toggle Menu',

  // Authors
  AppLoadAuthors = '[App] LoadAuthors',
  AppLoadAuthorsSuccess = '[App] LoadAuthorsSuccess',
  AppLoadAuthorsFailure = '[App] LoadAuthorsFailure',
}


// App state
export class AppToggleCredits implements Action {
  readonly type = AppActionTypes.AppToggleCredits;
}

export class AppToggleMenu implements Action {
  readonly type = AppActionTypes.AppToggleMenu;
}


// Authors
export class AppLoadAuthors implements Action {
  readonly type = AppActionTypes.AppLoadAuthors;
}

export class AppLoadAuthorsSuccess implements Action {
  readonly type = AppActionTypes.AppLoadAuthorsSuccess;
  constructor(public authors: Author[]) {}
}

export class AppLoadAuthorsFailure implements Action {
  readonly type = AppActionTypes.AppLoadAuthorsFailure;
  constructor(public error: Error) {}
}


// Action Export
export type AppActions = 
    AppToggleCredits 
  | AppToggleMenu 
  | AppLoadAuthors
  | AppLoadAuthorsSuccess
  | AppLoadAuthorsFailure;
