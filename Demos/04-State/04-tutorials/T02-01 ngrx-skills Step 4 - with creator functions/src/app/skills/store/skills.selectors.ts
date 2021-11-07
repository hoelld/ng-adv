import { createFeatureSelector, createSelector } from '@ngrx/store';
import { skillsFeatureKey, SkillsFeatureState } from './skills.reducer';

export const getSkillState = createFeatureSelector<SkillsFeatureState>(skillsFeatureKey)

export const getSkills = createSelector(
    getSkillState,
    (state:SkillsFeatureState) => state.skills
)