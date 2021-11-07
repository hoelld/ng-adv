import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { AppActions, AppActionTypes } from './app.actions';
import { appFeatureKey, AppState, reducer as AppReducer } from './app.reducer';

export interface State {
  [appFeatureKey]:AppState;
}

export const reducers: ActionReducerMap<State, Action> = {
  [appFeatureKey]: AppReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
