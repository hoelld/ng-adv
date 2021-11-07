State Management using NgRx
---------------------------

In this tutorial we develop a very simple skills list.
![skills List App Screenshot](./_images/toggle-credits.png)


- In the first step we use ngrx to toggle the list of authors of the tutorial
- In the second step we add a lazy loaded feature module with own nrgx state to show the skills list

This part of the Tutorial implements the second step

- There are two optional parts:
Tutorial 03 - Books uses Entity Adapter
Tutorial 04 - Videos uses Entity Data

# Preparation for Lazy Loaded Feature Module with NgRx Entity, Facades and Creator Functions

## Add Backend Data

Add Skills Data to db.json
Be aware to restart json server after that change.


```json
"skills": [
  { "id": "123", "name": "rxjs", "completed": true },
  { "id": "456", "name": "ngrx", "completed": false }
]
```

## New Module skills

Add skills module

```
ng g module skills --route skills --module app.module.ts 
``` 

## Extend Menu and set Router Outlet

Open "home/home.component.html" and add a link to skills

```html
  <div *ngIf="menuVisible$ | async">
    Menu:
    <a [routerLink]="['/skills']" >
        Show Skills
    </a>
  </div>
```

Open app.component.html and add router-outlet

```html
<app-home></app-home>
<router-outlet></router-outlet>
```

Add skills components

```
> ng g c skills/skills-list-with-row --skip-tests
> ng g c skills/skill-row --skip-tests
```

Add skill model in skills/model/skill.model.ts

```typescript
export interface Skill {
    id:number,
    name:string,
    completed:boolean
}
```

Add skill service in skills/model/skills.service.ts

```
ng g s skills/model/skills --skip-tests
```

initial code:

```typescript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Skill } from './skill.model';

@Injectable({
  providedIn: 'root'  // if only used in lazy loaded module means the service is also lazy loaded.
})
export class SkillsService {

  constructor(private httpClient: HttpClient) { }

  getSkills(): Observable<Skill[]> {
    return this.httpClient
      .get<Skill[]>(environment.apiUrl + "skills")
      .pipe(tap(data => console.log("data from api", data)));
  }

  addSkill(skill:Skill): Observable<Skill> {
    return this.httpClient
      .post<Skill>(environment.apiUrl + "skills", skill).pipe(
        tap(data => console.log("addSkill data from api", data))
        );   
  }
}
```

Remark about providedIn: 'root'

See further [docs](https://angular.io/guide/providers#providing-a-service)

Or on [dev.to](https://dev.to/nickraphael/angular-s-providedin-root-what-if-two-lazy-modules-provided-the-same-service-166p)

# Build feature Reducer 

We will add the reducer manually.

Create file skills/store/skills.reducer.ts

```typescript 
import { createReducer, on } from '@ngrx/store';
import { Skill } from '../model/skill.model';

export const skillsFeatureKey = 'skills'

export interface SkillsFeatureState {
    skills: Skill[];
}

export const initialState: SkillsFeatureState = {  
    skills:[],
};

export const skillsFeatureReducer = createReducer(
    initialState,

); 
  
```

Add the reducer to the Feature Module.

```typescript
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
  ]
})
export class SkillsModule { }
```


# Add Actions with creator

```
> ng g a skills/store/skills --api=true --creators=true --skip-tests    
? What should be the prefix of the action? load
CREATE src/app/skills/store/skills.actions.ts (347 bytes)
```

correct the trailing s in Skillss and the data payload

```typescript
import { createAction, props } from '@ngrx/store';
import { Skill } from '../model/skill.model';

export const loadSkills = createAction('[Skills] Load Skills');

export const loadSkillsSuccess = createAction(
  '[Skills] Load Skills Success',
  props<{ skills: Skill[] }>()
);

export const loadSkillsFailure = createAction(
  '[Skills] Load Skills Failure',
  props<{ error: Error }>()
);
```

Add further actions manually

```typescript
export const addSkill = createAction('[Skills] Add', props<{ skill: Skill }>());

export const addSkillSuccess = createAction(
  '[Skills] Add Skills Success',
  props<{ skill: Skill }>()
);

export const addSkillFailure = createAction(
  '[Skills] Add Skills Failure',
  props<{ error: Error }>()
);

```

# Add Action to reducer

Open skills/store/skills.reducer.ts

the "on" operator from @ngrx/store replaces the switch

```typescript

import { createReducer, on } from '@ngrx/store';
import { Skill } from '../model/skill.model';
import { addSkillSuccess, loadSkillsSuccess } from './skills.actions';

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


```

REMARK: 
Using createReducer before Ivy with AOT (View Engine AOT) in production mode,
this can cause errors like this: https://angular.io/guide/aot-metadata-errors#function-calls-are-not-supported

Ways around this:
https://medium.com/@emilyxiong/how-to-use-ngrxs-combinereducers-in-aot-10eae758c495
https://ngrx.io/api/store/createReducer - At the end of page



# Skills Effect:

Creating Effects modify the skills.module! 
It must be saved before this step.

```
> ng g ef skills/store/skills --skip-tests --group=false --module=skills --creators=true --api=true --root=false   
? What should be the prefix of the effect? load
CREATE src/app/skills/store/skills.effects.ts (195 bytes)
UPDATE src/app/skills/skills.module.ts (933 bytes)
```

Add the Skills Service to the constructor.
Add needed Imports and import Skills Actions as SkillsActions

> Note: To implement the Effect you could use the `ngrx-effect` Snippet

```typescript
import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
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
```

# Skills Selector

```
> ng g selector skills/store/skills --group=false --skip-tests          
CREATE src/app/skills/store/skills.selectors.ts (70 bytes)
```

Open selector file and implement selector function to get skills

```typescript
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { skillsFeatureKey, SkillsFeatureState } from './skills.reducer';

export const getSkillState = createFeatureSelector<SkillsFeatureState>(skillsFeatureKey)

export const getSkills = createSelector(
    getSkillState,
    (state:SkillsFeatureState) => state.skills
)
```

# Skills Facade

add new file to store/skills-facade.service.ts

```
> ng g s skills/store/skills-facade --skip-tests   
CREATE src/app/skills/store/skills-facade.service.ts (141 bytes)
```


```typescript
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


```

# Skills List UI


## Implement Skill Component

```html
<h1>Skills List</h1>

<app-skills-list-with-row></app-skills-list-with-row>
```

## Implement Skill-Row

File skill-row.component.html


```html
<div class="row">
    <div style="padding-left: 2rem">{{ skill?.name }}</div>
    <div>
        <button onclick="deleteItem(skill)">Delete</button>
        <button onclick="toggleItemCompleted(skill)">Toggle Complete</button>
    </div>
</div>
```

File skill-row.component.scss

```css 
.row {
    display:flex;
    min-width: 20rem;
    justify-content:space-between;
}
```

File skill-row.component.ts

```typescript
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Skill } from '../model/skill.model';

@Component({
  selector: 'app-skill-row',
  templateUrl: './skill-row.component.html',
  styleUrls: ['./skill-row.component.scss'],
})
export class SkillRowComponent implements OnInit {
  @Input() skill: Skill = null as unknown as Skill; // typescript strict nonsense
  @Output() itemDeleted: EventEmitter<Skill> = new EventEmitter();
  @Output() itemCompleted: EventEmitter<Skill> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  deleteItem(item: Skill): void {
    this.itemDeleted.emit(item);
  }

  toggleItemCompleted(item: Skill): void {
    this.itemCompleted.emit(item);
  }
}

```

## Implement Skills-List


skills-list-with-row.html:

```html
<div>SPA Skills</div>
<button (click)="addItem()">Add</button>
<div *ngFor="let sk of skills$ | async" class="item">
    <app-skill-row
       [skill]="sk"
       (itemDeleted)="deleteItem($event)"
       (itemCompleted)="toggleItemComplete($event)"
    ></app-skill-row>
</div>
```

skills-list-with-row.ts

```typescript
import { Component, OnInit } from '@angular/core';
import { Skill } from '../model/skill.model';
import { SkillsFacadeService } from '../store/skills-facade.service';

@Component({
  selector: 'app-skills-list-with-row',
  templateUrl: './skills-list-with-row.component.html',
  styleUrls: ['./skills-list-with-row.component.scss'],
})
export class SkillsListWithRowComponent implements OnInit {
  constructor(private sf: SkillsFacadeService) {}

  skills$ = this.sf.getSkills()
  sk:Skill[]=[]
  
  ngOnInit(): void {
    this.sf.initSkills(); 
  }

  addItem(): void {
    const newItem: Skill = { id: 0, name: 'New Skill', completed: false };
    this.sf.addSkill(newItem);
  }

  deleteItem(item: Skill): void {
    //this.sf.deleteSkill(item);
  }

  toggleItemComplete(item: Skill): void {
    //this.sf.toggleComplete(item);
  }
}
```

# Lab

- Implement Skills CRUD Actions, Effects and extend Reducer
- Implement Error and Loading strategy as discussed.

# Perfect - But....

In implementing the CRUD Actions there is always the same code for searching inside the Skills Array for the correct id for delete, update, ...

Therefore it is a good idea to build the store otherwise:

```json
{
  "skills": {
    "ids": [456,123],
    "entities": {
       "123":{
        "id": "123",
        "name": "rxjs",
        "completed": true
      },
      "456":{
        "id": "456",
        "name": "ngrx",
        "completed": false
      } 
    }
  }
}
```

With this structure it is possible to access the entities very fast by its id,
and the ids list can be sorted as liked.

This is called the Entity State format and it is used inside the ngrx entity Library.