import { createAction, props } from '@ngrx/store';
import { Skill } from '../model/skill.model';

export const loadSkills = createAction(
  '[Skills] Load Skills'
);

export const loadSkillsSuccess = createAction(
  '[Skills] Load Skills Success',
  props<{ skills: Skill[] }>()
);

export const loadSkillsFailure = createAction(
  '[Skills] Load Skills Failure',
  props<{ error: Error }>()
);

export const addSkill = createAction('[Skills] Add', props<{ skill: Skill }>());

export const addSkillSuccess = createAction(
  '[Skills] Add Skills Success',
  props<{ skill: Skill }>()
);

export const addSkillFailure = createAction(
  '[Skills] Add Skills Failure',
  props<{ error: Error }>()
);
