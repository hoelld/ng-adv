import { Action } from '@ngrx/store';
import { Author } from '../model/author';
import { AppActions, AppActionTypes, AppLoadAuthorsSuccess } from './app.actions';

export const appFeatureKey = 'app';

export interface AppState {
  creditsVisible: boolean;
  menuVisible:boolean;
  authors:Author[];
  authorsLoadFailure: boolean;
}

export const initialState: AppState = {
  creditsVisible:false,
  menuVisible:false,
  authors:[],
  authorsLoadFailure: false,
};

export function reducer(state = initialState, action: Action): AppState {
  switch (action.type) {
    case AppActionTypes.AppToggleCredits:
      // return { ...state, creditsVisible: !state.creditsVisible}
      return AppToggleCreditsActionImplementation(state, action)
    case AppActionTypes.AppToggleMenu:
        // return { ...state, menuVisible: !state.menuVisible}
        return AppToggleMenuActionImplementation(state, action)

    // Authors
    case AppActionTypes.AppLoadAuthorsSuccess:
      return AppLoadAuthorsSuccessImplementation(state, action as AppLoadAuthorsSuccess);

    case AppActionTypes.AppLoadAuthorsFailure:
      return { ...state, authorsLoadFailure: true, authors: [] };
    
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

function AppLoadAuthorsSuccessImplementation(
  state: AppState,
  {authors}:AppLoadAuthorsSuccess
): AppState {
  // Business Logic
  return { ...state, authors, authorsLoadFailure: false,  };
}