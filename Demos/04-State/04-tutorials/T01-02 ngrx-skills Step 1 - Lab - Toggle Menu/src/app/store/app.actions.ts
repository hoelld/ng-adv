import { Action } from '@ngrx/store';

export enum AppActionTypes {
  AppToggleCredits = '[App] Toggle Credits',
  AppToggleMenu = '[App] Toggle Menu',
}

export class AppToggleCredits implements Action {
  readonly type = AppActionTypes.AppToggleCredits;
}

export class AppToggleMenu implements Action {
  readonly type = AppActionTypes.AppToggleMenu;
}

export type AppActions = AppToggleCredits | AppToggleMenu
