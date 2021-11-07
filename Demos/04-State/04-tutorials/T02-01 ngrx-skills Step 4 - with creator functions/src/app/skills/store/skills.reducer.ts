import { createReducer, on } from '@ngrx/store';
import { Skill } from '../model/skill.model';
import { addSkillSuccess, loadSkillsSuccess } from './skills.actions';

export const skillsFeatureKey = 'skills'

export interface SkillsFeatureState {
    skills: Skill[];
}

export const initialState: SkillsFeatureState = {  
    skills:[],
};

export const skillsFeatureReducer = createReducer(
    initialState,
    on(loadSkillsSuccess, (state, { skills }) => ({
        ...state,
        skills,
    })),
    on(addSkillSuccess, (state, { skill }) => ({
    ...state,
    skills: [...state.skills, skill],
    }))
); 

  