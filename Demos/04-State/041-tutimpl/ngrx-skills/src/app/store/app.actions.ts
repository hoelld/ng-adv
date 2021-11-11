import { Action } from '@ngrx/store';
import { Author } from '../model/author';

export enum AppActionTypes {
  // App State
  AppToggleCredits = '[App] Toggle Credits',
  AppToggleMenu = '[App] Toggle Menu',
  
  // Author stuff
  AppLoadAuthors = '[App] LoadAuthors',
  AppLoadAuthorsSuccess = '[App] LoadAuthorsSuccess',
  AppLoadAuthorsFailure = '[App] LoadAuthorsFailure',
}

export class AppToggleCredits implements Action {
  readonly type = AppActionTypes.AppToggleCredits;
}

export class AppToggleMenu implements Action {
  readonly type = AppActionTypes.AppToggleMenu;
}

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


export type AppActions = AppToggleCredits | AppToggleMenu | AppLoadAuthors | AppLoadAuthorsSuccess | AppLoadAuthorsFailure;
