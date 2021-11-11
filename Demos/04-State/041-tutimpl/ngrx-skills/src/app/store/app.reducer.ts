import { Action } from '@ngrx/store';
import { Author } from '../model/author';
import { AppActionTypes, AppLoadAuthorsSuccess } from './app.actions';


export const appFeatureKey = 'app';

export interface AppState {
  creditsVisible: boolean;
  menuVisible: boolean;
  authors: Author[];
}

export const initialState: AppState = {
  creditsVisible: false,
  menuVisible: false,
  authors: [],
};

export function AppReducer(state = initialState, action: Action): AppState {
  switch (action.type) {
    case AppActionTypes.AppToggleCredits:
        //return { ...state, creditsVisible: !state.creditsVisible}
        return AppToggleCreditsActionImplementation(state, action);
        break;
      case AppActionTypes.AppToggleMenu:
        return AppToggleMenuActionImplementation(state, action);
        break;
      
        case AppActionTypes.AppLoadAuthorsSuccess:
        return AppLoadAuthorsSuccessImplementation(state, action as AppLoadAuthorsSuccess);
        break;

    default:
      return state;
  }
}

function AppToggleCreditsActionImplementation(state:AppState, action:Action): AppState {
  return { ...state, creditsVisible: !state.creditsVisible};
}

function AppToggleMenuActionImplementation(state:AppState, action:Action): AppState {
  return { ...state, menuVisible: !state.menuVisible};
}

function AppLoadAuthorsSuccessImplementation(state:AppState, {authors}:AppLoadAuthorsSuccess): AppState {
  return { ...state, authors};
}