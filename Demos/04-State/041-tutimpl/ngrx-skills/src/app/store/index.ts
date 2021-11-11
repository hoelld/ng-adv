import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { appFeatureKey, AppReducer, AppState } from './app.reducer';


export interface State {
  [appFeatureKey]: AppState;
}

export const reducers: ActionReducerMap<State> = {
  [appFeatureKey]: AppReducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
