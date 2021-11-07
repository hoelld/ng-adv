import { Action } from '@ngrx/store';
import { Author } from '../model/author';
import { AppActions, AppActionTypes } from './app.actions';

export const appFeatureKey = 'app';

export interface AppState {
  creditsVisible: boolean;
  menuVisible:boolean;
  authors:Author[];
}

export const initialState: AppState = {
  creditsVisible:false,
  menuVisible:false,
  authors:[]
};

export function reducer(state = initialState, action: Action): AppState {
  switch (action.type) {
    case AppActionTypes.AppToggleCredits:
      // return { ...state, creditsVisible: !state.creditsVisible}
      return AppToggleCreditsActionImplementation(state, action)
    case AppActionTypes.AppToggleMenu:
        // return { ...state, menuVisible: !state.menuVisible}
        return AppToggleMenuActionImplementation(state, action)
    default:
      return state;
  }
}

function AppToggleCreditsActionImplementation(state:AppState, action: Action): AppState {
  // Business Logic
  return { ...state, creditsVisible: !state.creditsVisible };
}

function AppToggleMenuActionImplementation(state:AppState, action: Action): AppState {
  // Business Logic
  return { ...state, menuVisible: !state.menuVisible };
}

