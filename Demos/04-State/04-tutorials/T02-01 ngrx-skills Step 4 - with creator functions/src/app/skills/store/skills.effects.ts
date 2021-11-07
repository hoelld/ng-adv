import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Skill } from '../model/skill.model';
import { SkillsService } from '../model/skills.service';
import * as SkillsActions from './skills.actions';

@Injectable()
export class SkillsEffects {
  constructor(private actions$: Actions, private service: SkillsService) {}

  // @Effect()
  // decorator not needed if using createEffect
  // function createEffect is type safe and the effect has to return an Observable<Action>

  loadSkills$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SkillsActions.loadSkills),
      switchMap((action) => {
        return this.service.getSkills().pipe(
          map((skills: Skill[]) => SkillsActions.loadSkillsSuccess({ skills })),
          catchError((error: Error) =>
            of(SkillsActions.loadSkillsFailure({ error }))
          )
        );
      })
    );
  });

  addSkill$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SkillsActions.addSkill),
      switchMap(({skill}) => {
        return this.service.addSkill(skill).pipe(
          map((skill: Skill) => SkillsActions.addSkillSuccess({ skill })),
          catchError((error: Error) =>
            of(SkillsActions.loadSkillsFailure({ error }))
          )
        );
      })
    );
  });

}
