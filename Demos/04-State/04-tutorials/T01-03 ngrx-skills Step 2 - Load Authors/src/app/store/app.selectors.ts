import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState, appFeatureKey } from './app.reducer';

export const getAppState = createFeatureSelector<AppState>(appFeatureKey);

export const getAppCreditsVisible = createSelector(
    getAppState,
    (state:AppState)=>state.creditsVisible
)

export const getAppMenuVisible = createSelector(
    getAppState,
    (state:AppState)=>state.menuVisible
)

export const getAppAuthors = createSelector(
    getAppState,
    (state: AppState) => state.authors
  );
