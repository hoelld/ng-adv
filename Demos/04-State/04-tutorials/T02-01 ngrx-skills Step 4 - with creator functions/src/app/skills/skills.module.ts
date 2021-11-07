import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillsRoutingModule } from './skills-routing.module';
import { SkillsComponent } from './skills.component';
import { SkillsListWithRowComponent } from './skills-list-with-row/skills-list-with-row.component';
import { SkillRowComponent } from './skill-row/skill-row.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SkillsEffects } from './store/skills.effects';
import { skillsFeatureKey, skillsFeatureReducer } from './store/skills.reducer';

@NgModule({
  declarations: [
    SkillsComponent,
    SkillsListWithRowComponent,
    SkillRowComponent
  ],
  imports: [
    CommonModule,
    SkillsRoutingModule,
    StoreModule.forFeature(skillsFeatureKey, skillsFeatureReducer),
    EffectsModule.forFeature([SkillsEffects])
  ]
})
export class SkillsModule { }
