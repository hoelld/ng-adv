import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Skill } from '../model/skill.model';
import { addSkill, loadSkills } from './skills.actions';
import { SkillsFeatureState } from './skills.reducer';
import { getSkills } from './skills.selectors';

@Injectable({
  providedIn: 'root'
})
export class SkillsFacadeService {

  constructor(private store:Store<SkillsFeatureState>) { }

  initSkills():void {
    this.store.dispatch(loadSkills())
  }

  getSkills():Observable<Skill[]> {
    return this.store.select(getSkills)
  }

  addSkill(skill:Skill):void {
    this.store.dispatch(addSkill({skill}))
  }

  // ...
}
