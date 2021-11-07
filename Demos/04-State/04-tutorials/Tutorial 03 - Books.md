State Management using NgRx
---------------------------

In this tutorial we develop a very simple books list.

- In difference to skills list we will use ngrx Entity Adapter to manage the list


# Preparation for Lazy Loaded Feature Module with ngrx Entity Adapter

Add Books module

```
ng g module books --route books --module app.module.ts 
``` 

Add Books Data to db.json & create a books.model.ts:

```json
"books": [
  { "id": "111", "name": "rxjs - Best in Observables", "completed": true },
  { "id": "222", "name": "ngrx - The wonders of State", "completed": false }
]
```


Open "home/home.component.html" and add a link to skills

```html
  <div *ngIf="menuVisible$ | async">
    . . .
    <a [routerLink]="['/books']" >
        Show Books
    </a>
  </div>
```

Add books model in books/model/book.model.ts

```typescript
export interface Book {
    id:number,
    name:string,
    completed:boolean
}
```

Add book service in books/model/books.service.ts

```
ng g s books/model/books --skip-tests
```

initial code:

```typescript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root'  // if only used in lazy loaded module means the service is also lazy loaded.
})
export class BooksService {

  constructor(private httpClient: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.httpClient
      .get<Book[]>(environment.apiUrl + "books")
      .pipe(tap(data => console.log("data from api", data)));
  }

  addBook(book:Book): Observable<Book> {
    return this.httpClient
      .post<Book>(environment.apiUrl + "books", book).pipe(
        tap(data => console.log("addBook data from api", data))
        );   
  }
}
```


Install ngrx Entity if not already done

```
> npm install @ngrx/entity --save
```

# Add reducer with creator

```
> ng g r books/store/books --skip-tests --group=false --api=true --creators=true  --module books
CREATE src/app/books/store/books.reducer.ts (231 bytes)
```

Then add the state by using Entity Adapter
A function for Identity field is needed if it is not id
A function for Sorting key is optional

Our State should look like this:

```typescript
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Book } from '../model/book.model'

// To have a Identity key other than "id" there must be a selectId function
// it is the case here - but to show how it works
export function selectBookId(book:Book) {
  return book.id 
}

// To have a default sorting by name - define a sort function
export function sortBookByName(bookA:Book, bookB:Book) {
  return bookA.name.localeCompare(bookB.name)
}

// Use the functions in the Adapter Initialization
export const booksAdapter: EntityAdapter<Book> = createEntityAdapter<Book>({
  selectId: selectBookId,
  sortComparer: sortBookByName,
})

// ----------------------------------------

export const booksFeatureKey = 'books';

export interface BooksState extends EntityState<Book> {
  // define additional fields needed in state
  booksLoadFailure: boolean;
  booksIsLoading:boolean;
}

export const initialState: BooksState = booksAdapter.getInitialState({
  // set the additional fields
  booksLoadFailure: false,
  booksIsLoading:false,
})


export const reducer = createReducer(
  initialState,
);
```

# Add Actions with creator - same as ever

```
> ng g a books/store/books --api=true --creators=true --skipTests    
CREATE src/app/books/store/books.actions.ts (338 bytes)
```

correct the trailing s in Bookss

Other needed actions can be created using the ngrx-create-action-props code snippets.
complete code:

```typescript
import { createAction, props } from '@ngrx/store';
import { Book } from '../model/book.model';

export const loadBooks = createAction('[Books] Load Books');

export const loadBooksSuccess = createAction(
  '[Books] Load Books Success',
  props<{ data: Book }>()
);

export const loadBooksFailure = createAction(
  '[Books] Load Books Failure',
  props<{ error: Error }>()
);

// Additional Actions
export const addBook = createAction('[Books] Add', props<{ book: Book }>());

export const addBookSuccess = createAction(
  '[Books] Add Success',
  props<{ book: Book }>()
);

export const addBookFailure = createAction(
  '[Books] Add Failure',
  props<{ error: Error }>()
);
```


# Books Effect - same as ever:

Creating Effects modify the books.module! 
It must be saved before this step.

```
> ng g ef books/store/books --skipTests --group=false --module=books --creators=true --api=true --root=false
CREATE src/app/skills/store/skills.effects.ts (195 bytes)
UPDATE src/app/skills/skills.module.ts (889 bytes)
```

Add the Skills Service to the constructor.
Add needed Imports and import Skills Actions as SkillsActions

> Note: To implement the Effect you could use the `ngrx-effect` Snippet

```typescript
import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Book } from '../model/book.model';
import { BooksService } from '../model/books.service';
import * as BooksActions from './books.actions';

@Injectable()
export class BooksEffects {
  constructor(private actions$: Actions, private service: BooksService) {}

  // @Effect()
  // decorator not needed if using createEffect
  // function createEffect is type safe and the effect has to return an Observable<Action>

  loadSkills$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksActions.loadBooks),
      switchMap((action) => {
        return this.service.getBooks().pipe(
          map((books: Book[]) => BooksActions.loadBooksSuccess({ books })),
          catchError((error: Error) =>
            of(BooksActions.loadBooksFailure({ error }))
          )
        );
      })
    );
  });

  addBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksActions.addBook),
      switchMap(({book}) => {
        return this.service.addBook(book).pipe(
          map((skill: Book) => BooksActions.addBookSuccess({ book })),
          catchError((error: Error) =>
            of(BooksActions.addBookFailure({ error }))
          )
        );
      })
    );
  });
}
```

# Books Selector - not the same...

Create a file "src/app/books/store/books.selectors.ts"

Use predefined selectors and rename it by deconstruction 

```typescript
import { booksAdapter, booksFeatureKey, BooksState } from './books.reducer';

export const selectBooksState = createFeatureSelector<BooksState>(booksFeatureKey)

export const {
    selectAll:getBooks,
    selectTotal:getBooksCount,
    selectEntities:getBooksDict,
    selectIds: getBooksIds
} = booksAdapter.getSelectors(selectBooksState)
```

# Extend Books Reducer using adapter

```typescript
. . .

import * as BooksActions from './books.actions';

. . .

export const reducer = createReducer(
  initialState,
  on(
    BooksActions.loadBooks, 
    BooksActions.addBook, (state) => ({
    ...state,
    booksIsLoading: true,
  })),
  on(BooksActions.loadBooksSuccess, (state, { books }) =>
    booksAdapter.setAll(books, state)
  ),
  on(BooksActions.addBookSuccess, (state, { book }) =>
    booksAdapter.addOne(book, state)
  )
);

```

# Books Facade

add new file to store/books-facade.service.ts

```
> ng g s books/store/books-facade --skipTests   
CREATE src/app/books/store/books-facade.service.ts (140 bytes)
```

```typescript
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from '../model/book.model';
import { addBook, loadBooks } from './books.actions';
import { BooksState } from './books.reducer';
import { getBooks } from './books.selectors';

@Injectable({
  providedIn: 'root'
})
export class BooksFacadeService {

  constructor(private store:Store<BooksState>) { }

  initBooks():void {
    this.store.dispatch(loadBooks())
  }

  getBooks():Observable<Book[]> {
    return this.store.select(getBooks)
  }

  addBook(book:Book):void {
    this.store.dispatch(addBook({book}))
  }
}

```


# Books List UI

```
> ng add @angular/material
```

add material to books.module.ts

```typescript
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';

. . .

@NgModule({
  declarations: [BooksComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,

    MatCardModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatIconModule,

    . . .
```

on errors reset npm modules
 
```
npm ci 
```

## Implement List

Open file src/app/books/books.component.ts

```typescript
import { Component, OnInit } from '@angular/core';
import { Book } from './model/book.model';
import { BooksFacadeService } from './store/books-facade.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  constructor(private booksFacade:BooksFacadeService) { }

  view$ = this.booksFacade.getBooks();
  
  ngOnInit(): void {
    this.booksFacade.initBooks()
  }

  addItem():void {
    const newBook: Book = { id:null, name:'New Book Name', completed:false}
    this.booksFacade.addBook(newBook)
  }

}
```

Open file src/app/books/books.component.html

```html
<mat-toolbar color="primary">
  <mat-toolbar-row fxLayoutAlign="space-between center">
    <div>SPA Books</div>
    <div fxLayoutGap="10px">
        <button mat-raised-button (click)="addItem()">Add</button>
    </div>
  </mat-toolbar-row>
</mat-toolbar>

<mat-card>
  <mat-card-content fxLayout="column">
    <ng-container *ngFor="let book of view$ | async" class="item">
        <div fxLayout="row" fxLayoutAlign="space-between center" fxFlexFill class="row">
            <div fxFlex="3 1 auto" style="padding-left: 2rem">{{ book?.name }}</div>
         </div>
    </ng-container>
  </mat-card-content>
</mat-card>
```