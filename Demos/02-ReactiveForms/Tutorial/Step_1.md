Angular Advanced Tutorial

# Step 1 - create a simnple reactive form

## Overview 

create a simple app with a single reactive form.
It should be able to enter contact data

id
name
email
userrights

userrights is a select field with initialy three values: none, read, write

After finishing the following steps:

![Step_1](./_advtut_images/Step_1.png)

## create new project

```bash
ng new --help

ng new --style scss --prefix adv --skip-tests --routing --strict --verbose advtut  

cd advtut
ng serve
```

Chrome - localhost:4200 öffnen

If not done already - install Angular DevTools 

close console - open visual Studio Code

## Add Bootstrap by cdn

Open src/index.html

add bootstrap cdn 

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Advtut</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">

  
  <link rel="stylesheet" 
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" 
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" 
    crossorigin="anonymous">


</head>
<body>
  <adv-root></adv-root>


  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" 
    integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" 
    crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" 
    integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" 
    crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" 
    integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" 
    crossorigin="anonymous"></script>


</body>
</html>
```


open app.component.html

replace the content

```html
<div class='jumbotron'>
  <h1>Angular Advanced Tutorial</h1>
</div>
```

Open Terminal in Visual Studio Code and start app
See result in browser

## build a menu component

```
ng g c --help
ng g c components/menu --skip-tests --flat -s -t -d
```


```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'adv-menu',
  template: `
    <div class="menu">
      <a href="#" [routerLink]="['/welcome']">Welcome</a> |
      <a href="#" [routerLink]="['/advform']">Adv Form</a> |
      <a href="#" [routerLink]="['/missingLink']">Missing Link</a>
    </div>
  `,
  styles: [
    `
    .menu {
      padding: 1rem;
      padding-top:0rem;
    }
    
    `
  ]
})
export class MenuComponent {
  constructor() { }
}

```


## add the pages

```
ng g c pages/welcome --skip-tests --flat -s -t -d 
ng g c pages/error404 --skip-tests --flat -s -t -d
ng g c pages/advform --skip-tests -d
```

## add the pages to the router


```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvformComponent } from './pages/advform/advform.component';
import { Error404Component } from './pages/error404.component';
import { WelcomeComponent } from './pages/welcome.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'advform', component: AdvformComponent },
  { path: '', redirectTo: 'welcome', pathMatch:'full'},
  { path: '**', component:Error404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

## add the menu and the router outlet to the app component


```html
<div class='jumbotron'>
  <h1>Angular Advanced Tutorial</h1>
</div>
<adv-menu></adv-menu>
<router-outlet></router-outlet>

```

To fit the menu to the jumbotron open global styles.scss

```CSS
.jumbotron {
    margin-bottom:1rem; 
}
```

## Do it yourself: About Page

Build a about page and replace the missing link with a link to it.

## Do it yourself: Welcome Page and 404 page

Make it prettier :-)

## Add reactive Form to App Module

In addition also add htpp client module

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu.component';
import { WelcomeComponent } from './pages/welcome.component';
import { AdvformComponent } from './pages/advform/advform.component';
import { Error404Component } from './pages/error404.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    WelcomeComponent,
    AdvformComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Build the reactive form

advform.component.ts

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'adv-advform',
  templateUrl: './advform.component.html',
  styleUrls: ['./advform.component.scss']
})
export class AdvformComponent implements OnInit {

  advForm: FormGroup;

  constructor(private fb:FormBuilder) { 
    this.advForm = this.buildForm();
  }

  ngOnInit(): void {
  }

  buildForm(): FormGroup {
    return this.fb.group({
      id: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: [
        '',
        [Validators.required,Validators.email],
      ],
      rights: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  get id() {
    return this.advForm.get('id');
  }

  get name() {
    return this.advForm.get('name');
  }

  get email() {
    return this.advForm.get('email');
  }
  
  get rights() {
    return this.advForm.get('rights');
  }

  clearForm(): void {
    this.advForm.reset({
      id: '',
      name: '',
      email: '',
      rights: '',
    });
  }

  onSubmit():void {
    console.log(JSON.stringify(this.advForm.value,null,2))
    this.clearForm()
  }

}
```

advform.component.html

```html
<form (ngSubmit)="onSubmit()" [formGroup]="advForm">
    <h1>Advanced Form</h1>

    <div class="row">
        <div class="form-group form-group-min-width form-group-no-bottom-margin">
            <div class = "col-sm-12">
                <label class="control-label" for="user_id">User Id</label>
                <input id="user_id" type="text" formControlName="id" class="form-control" placeholder="User Id"/>
                <div *ngIf="!(id?.dirty && id?.errors)" class="error col-sm-12">
                    <div>
                        <small class="text-danger">&nbsp;</small>
                    </div>
                </div>
                <div *ngIf="id?.dirty && id?.errors" class="error col-sm-12">
                    <div *ngIf="id?.errors?.required">
                        <small class="text-danger">User Id is required</small>
                    </div>
                    <div *ngIf="id?.errors?.minlength">
                        <small class="text-danger">User Id must be more than 3 letters</small>
                    </div>
                </div>
            </div>
        </div>    
    </div>

    <div class="row">
        <div class="form-group form-group-min-width form-group-no-bottom-margin">
            <div class = "col-sm-12">
                <label class="control-label" for="user_name">User Name</label>
                <input id="user_name" type="text" formControlName="name" class="form-control" placeholder="User Name"/>
                <div *ngIf="!(name?.dirty && name?.errors)" class="error col-sm-12">
                    <div>
                        <small class="text-danger">&nbsp;</small>
                    </div>
                </div>
                <div *ngIf="name?.dirty && name?.errors" class="error col-sm-12">
                    <div *ngIf="name?.errors?.required">
                        <small class="text-danger">User Name is required</small>
                    </div>
                    <div *ngIf="name?.errors?.minlength">
                        <small class="text-danger">User Name must be more than 3 letters</small>
                    </div>
                </div>
            </div>
        </div>    
    </div>

    <div class="row">
        <div class="form-group form-group-min-width form-group-no-bottom-margin">
            <div class = "col-sm-12">
                <label class="control-label" for="user_email">User EMail</label>
                <input id="user_email" type="text" formControlName="email" class="form-control" placeholder="User EMail"/>
                <div *ngIf="!(email?.dirty && email?.errors)" class="error col-sm-12">
                    <div>
                        <small class="text-danger">&nbsp;</small>
                    </div>
                </div>
                <div *ngIf="email?.dirty && email?.errors" class="error col-sm-12">
                    <div *ngIf="email?.errors?.required">
                        <small class="text-danger">User Email is required</small>
                    </div>
                    <div *ngIf="email?.errors?.email">
                        <small class="text-danger">User Email must be valid</small>
                    </div>
                </div>
            </div>
        </div>    
    </div>
    
    <div class="row">
        <div class="form-group form-group-min-width form-group-no-bottom-margin">
            <div class = "col-sm-12">
                <label class="control-label" for="user_rights">User Rights</label>
                <select id="user_rights" formControlName="rights" class="form-control" >
                    <option value="none">None</option>
                    <option value="read">Read</option>
                    <option value="write">Write</option>
                </select>
                <div *ngIf="!(rights?.dirty && rights?.errors)" class="error col-sm-12">
                    <div>
                        <small class="text-danger">&nbsp;</small>
                    </div>
                </div>
                <div *ngIf="rights?.dirty && rights?.errors" class="error col-sm-12">
                    <div *ngIf="rights?.errors?.required">
                        <small class="text-danger">User Rights are required</small>
                    </div>
                </div>
            </div>
        </div>    
    </div>

    <button type="submit" class="btn btn-primary" >Submit</button>
</form>
```

add to global styles.scss

```css
form {
    padding:1rem;
}

.form-group-min-width {
    min-width: 20rem;
}

.form-group-no-bottom-margin {
    margin-bottom: 0rem;
}
```


