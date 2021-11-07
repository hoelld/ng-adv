import { Action } from '@ngrx/store';

export enum AppActionTypes {
  AppToggleCredits = '[App] Toggle Credits',
}

export class AppToggleCredits implements Action {
  readonly type = AppActionTypes.AppToggleCredits;
}

export type AppActions = AppToggleCredits;
