import { Action } from '@ngrx/store';
import { Author } from '../model/author';
import { AppActions, AppActionTypes } from './app.actions';

export const appFeatureKey = 'app';

export interface AppState {
  creditsVisible: boolean;
  authors:Author[];
}

export const initialState: AppState = {
  creditsVisible:false,
  authors:[]
};

export function reducer(state = initialState, action: Action): AppState {
  switch (action.type) {
    case AppActionTypes.AppToggleCredits:
      // return { ...state, creditsVisible: !state.creditsVisible}
      return AppToggleCreditsActionImplementation(state, action)
    default:
      return state;
  }
}

function AppToggleCreditsActionImplementation(state:AppState, action: Action): AppState {
  // Business Logic
  return { ...state, creditsVisible: !state.creditsVisible };
}

