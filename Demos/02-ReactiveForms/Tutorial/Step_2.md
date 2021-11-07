Angular Advanced Tutorial

# Step 2 - create a component for the input lines

## Overview 

The input lines are lots and lots of code - this is not easy to maintain if the form is big.
The target of this tutorial is to create a component for the different edit lines of the form.

adv-gin-txt-r-ml - generic input text required minlength
adv-gin-email-r-v - generic input email required valid


After finishing the tutorial it looks the same :-)

## build a component for the first generic input 

```
ng g c components/adv-gin-txt-r-ml --skip-tests --flat -s -t -d
```


```typescript
import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

// Follows Tutorial to write own form controls
// https://blog.angular-university.io/angular-custom-form-controls/

@Component({
  selector: 'adv-adv-gin-txt-r-ml',
  template: `
  <div class="row" [formGroup]="subFormInput">
    <div class="form-group form-group-min-width form-group-no-bottom-margin">
        <div class = "col-sm-12">
            <label class="control-label" for="{{input_id}}">{{label}}</label>
            <input id="{{input_id}}" type="text" formControlName="input" class="form-control" placeholder="{{label}}"/>
            <div *ngIf="!(input?.dirty && input?.errors)" class="error col-sm-12">
                <div>
                    <small class="text-danger">&nbsp;</small>
                </div>
            </div>
            <div *ngIf="input?.dirty && input?.errors" class="error col-sm-12">
                <div *ngIf="input?.errors?.required">
                    <small class="text-danger">{{label}} is required</small>
                </div>
                <div *ngIf="input?.errors?.minlength">
                    <small class="text-danger">{{label}} must be more than 3 letters</small>
                </div>
                <div *ngIf="input?.errors?.email">
                    <small class="text-danger">{{label}} must be valid</small>
                </div>
            </div>
        </div>
    </div>    
  </div>
  `,
  styles: [
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AdvGinTxtRMlComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() =>AdvGinTxtRMlComponent)
    },
  ]
})
export class AdvGinTxtRMlComponent implements ControlValueAccessor, OnDestroy, Validator, OnInit {

  @Input() label:string =  ""
  @Input() emailfield:string = "false"
  
  constructor(private fb:FormBuilder) { }

  input_id:string='input_id';

  subFormInput:FormGroup=this.fb.group({input:[""]});  // Just a default
  
  get input() {
    return this.subFormInput.get('input');
  }

  ngOnInit(): void {
    let id_label = this.label.split(' ').join('_')
    this.input_id = id_label+'_input_id'
    
    if(this.emailfield=="true") {
      this.subFormInput=this.fb.group({input:["",[Validators.required, Validators.email]]});
    } else {
      this.subFormInput = this.fb.group({input:["",[Validators.required, Validators.minLength(3)]]});
    }
  }

  onTouched: Function = () => {};

  onChangeSubs: Subscription[] = [];

  ngOnDestroy(): void {
    this.onChangeSubs.forEach(sub=>sub.unsubscribe())
  }

  registerOnChange(onChange: any) {
    this.onChangeSubs.push(
      this.subFormInput.valueChanges.subscribe(onChange)
    );
  }

  registerOnTouched(onTouched: Function) {
    this.onTouched = onTouched
  }

  setDisabledState(disabled: boolean) {
    disabled ? this.subFormInput.disable() : this.subFormInput.enable()
  }

  writeValue(value: any) {
    value && this.subFormInput.reset(value, {emitEvent:false})
  }

  validate(control: AbstractControl) {
    return this.subFormInput.valid ? null : this.subFormInput.controls["input"].errors
  }

}

```


## use in form


```html
<form (ngSubmit)="onSubmit()" [formGroup]="advForm">
    <h1>Advanced Form</h1>

    <adv-adv-gin-txt-r-ml label="User Id" formControlName="id"></adv-adv-gin-txt-r-ml>
    <adv-adv-gin-txt-r-ml label="User Name" formControlName="name"></adv-adv-gin-txt-r-ml>
    <adv-adv-gin-txt-r-ml label="User Mail" emailfield="true" formControlName="email"></adv-adv-gin-txt-r-ml>

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

    <button type="submit" class="btn btn-primary">Submit</button>
        
</form>
```


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

  ngOnInit(): void { }

  buildForm(): FormGroup {
    return this.fb.group({
      id: [{input:''}],
      name: [{input:''}],
      email: [{input:''}],
      rights: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  
  get rights() {
    return this.advForm.get('rights');
  }

  clearForm(): void {
    this.advForm.reset({
      id:{input:''},
      name:{input:''},
      email:{input:''},
      rights:''
    });
  }

  flattenInputValues(value:any) {
    let result:{[id:string]:string} = {}
    Object.keys(value).forEach(key => {
      let keyValue =value[key]
      result[key] = keyValue['input'] ? keyValue['input'] : keyValue
    });
    return result
  }

  onSubmit():void {
    let result = this.flattenInputValues(this.advForm.value)
    console.log(`adForm: ${JSON.stringify(this.advForm.value,null,2)}`)
    console.log(`result: ${JSON.stringify(result,null,2)}`)
    this.clearForm()
  }

}

```

# Lab:

Build a component for the select

# Solution

## Abstract base class for custom controls

new file advGinBase.ts

```typescript
import { Component, forwardRef, OnDestroy } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({template:''})
export default abstract class AdvGinBase implements ControlValueAccessor, OnDestroy, Validator {

  abstract getForm():FormGroup;
  
  onTouched: Function = () => {};

  onChangeSubs: Subscription[] = [];

  ngOnDestroy(): void {
    this.onChangeSubs.forEach(sub=>sub.unsubscribe())
  }

  registerOnChange(onChange: any) {
    this.onChangeSubs.push(
      this.getForm().valueChanges.subscribe(onChange)
    );
  }

  registerOnTouched(onTouched: Function) {
    this.onTouched = onTouched
  }

  setDisabledState(disabled: boolean) {
    disabled ? this.getForm().disable() : this.getForm().enable()
  }

  writeValue(value: any) {
    value && this.getForm().reset(value, {emitEvent:false})
  }

  validate(control: AbstractControl) {
    return this.getForm().valid ? null : this.getForm().controls["input"].errors
  }


  public static flattenInputValues(value:any) {
    let result:{[id:string]:string} = {}
    Object.keys(value).forEach(key => {
      let keyValue =value[key]
      result[key] = keyValue['input'] ? keyValue['input'] : keyValue
    });
    return result
  }

  public static getFormBuilderObject(fields:string[]) {
    let result:{[key:string]:[{input:string}]} = {}
    fields.forEach(el=>result[el]=[{input:''}])
    return result
  }

  public static getResetObject(fields:string[]) {
    let result:{[key:string]:{input:string}} = {}
    fields.forEach(el=>result[el]={input:''})
    return result
  }

}
```

## Update Component AdvGinTxtRMlComponent

Use abstract base class

```typescript 
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import AdvGinBase from './advGinBase'

// Follows Tutorial to write own form controls
// https://blog.angular-university.io/angular-custom-form-controls/

@Component({
  selector: 'adv-adv-gin-txt-r-ml',
  template: `
  <div class="row" [formGroup]="subFormInput">
    <div class="form-group form-group-min-width form-group-no-bottom-margin">
        <div class = "col-sm-12">
            <label class="control-label" for="{{input_id}}">{{label}}</label>
            <input id="{{input_id}}" type="text" formControlName="input" class="form-control" placeholder="{{label}}"/>
            <div *ngIf="!(input?.dirty && input?.errors)" class="error col-sm-12">
                <div>
                    <small class="text-danger">&nbsp;</small>
                </div>
            </div>
            <div *ngIf="input?.dirty && input?.errors" class="error col-sm-12">
                <div *ngIf="input?.errors?.required">
                    <small class="text-danger">{{label}} is required</small>
                </div>
                <div *ngIf="input?.errors?.minlength">
                    <small class="text-danger">{{label}} must be more than 3 letters</small>
                </div>
                <div *ngIf="input?.errors?.email">
                    <small class="text-danger">{{label}} must be valid</small>
                </div>
            </div>
        </div>
    </div>    
  </div>
  `,
  styles: [
  ],
  
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AdvGinTxtRMlComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() =>AdvGinTxtRMlComponent)
    },
  ]
  
})
export class AdvGinTxtRMlComponent extends AdvGinBase implements OnInit {

  @Input() label:string =  ""
  @Input() emailfield:string = "false"
  
  constructor(private fb:FormBuilder) { super() }

  input_id:string='input_id';

  subFormInput:FormGroup=this.fb.group({input:[""]});  // Just a default

  getForm():FormGroup {
    return this.subFormInput
  }

  get input() {
    return this.subFormInput.get('input');
  }

  ngOnInit(): void {
    let id_label = this.label.split(' ').join('_')
    this.input_id = id_label+'_input_id'
    
    if(this.emailfield=="true") {
      this.subFormInput=this.fb.group({input:["",[Validators.required, Validators.email]]});
    } else {
      this.subFormInput = this.fb.group({input:["",[Validators.required, Validators.minLength(3)]]});
    }
  }

}

```

## New Component for selection

New Component AdvGinSelRComponent - file adv-gin-sel-r.component

```typescript

import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import AdvGinBase from './advGinBase'

// Follows Tutorial to write own form controls
// https://blog.angular-university.io/angular-custom-form-controls/


@Component({
  selector: 'adv-adv-gin-sel-r',
  template: `
  <div class="row" [formGroup]="subFormInput">
    <div class="form-group form-group-min-width form-group-no-bottom-margin">
        <div class = "col-sm-12">
            <label class="control-label" for="{{input_id}}">{{label}}</label>
            <select id="input_id" formControlName="input" class="form-control" >
                <option value="none">None</option>
                <option value="read">Read</option>
                <option value="write">Write</option>
            </select>
            <div *ngIf="!(input?.dirty && input?.errors)" class="error col-sm-12">
                <div>
                    <small class="text-danger">&nbsp;</small>
                </div>
            </div>
            <div *ngIf="input?.dirty && input?.errors" class="error col-sm-12">
                <div *ngIf="input?.errors?.required">
                    <small class="text-danger">{{label}} is required</small>
                </div>
            </div>
        </div>
    </div>    
  </div>
  `,
  styles: [
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AdvGinSelRComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() =>AdvGinSelRComponent)
    },
  ]
})
export class AdvGinSelRComponent extends AdvGinBase implements OnInit {

  @Input() label:string =  ""
  
  constructor(private fb:FormBuilder) { super() }

  input_id:string='input_id';

  subFormInput:FormGroup=this.fb.group({input:["",[Validators.required, ]]});

  getForm():FormGroup {
    return this.subFormInput
  }

  get input() {
    return this.subFormInput.get('input');
  }

  ngOnInit(): void {
    let id_label = this.label.split(' ').join('_')
    this.input_id = id_label+'_input_id'
  }

}

```

## Add to Module - app.module.ts

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
import { AdvGinTxtRMlComponent } from './components/adv-gin-txt-r-ml.component';
import { AdvGinSelRComponent } from './components/adv-gin-sel-r.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    WelcomeComponent,
    AdvformComponent,
    Error404Component,
    AdvGinTxtRMlComponent,
    AdvGinSelRComponent
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

## Usage 

Template HTML 

```html
<form (ngSubmit)="onSubmit()" [formGroup]="advForm">
    <h1>Advanced Form</h1>
    
    <adv-adv-gin-txt-r-ml label="User Id" formControlName="id"></adv-adv-gin-txt-r-ml>
    <adv-adv-gin-txt-r-ml label="User Name" formControlName="name"></adv-adv-gin-txt-r-ml>
    <adv-adv-gin-txt-r-ml label="User Mail" emailfield="true" formControlName="email"></adv-adv-gin-txt-r-ml>
    <adv-adv-gin-sel-r label="User Rights" formControlName="rights" ></adv-adv-gin-sel-r>

    <button type="submit" class="btn btn-primary" [disabled]="advForm.invalid">Submit</button>
        
</form>
```

Typescript Form Component

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import AdvGinBase from '../../components/advGinBase'

@Component({
  selector: 'adv-advform',
  templateUrl: './advform.component.html',
  styleUrls: ['./advform.component.scss']
})
export class AdvformComponent implements OnInit {

  fields = ['id','name','email','rights']

  advForm: FormGroup =this.fb.group(
    AdvGinBase.getFormBuilderObject(this.fields)
  )

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void { }

  onSubmit():void {
    let result = AdvGinBase.flattenInputValues(this.advForm.value)
    console.log(`adForm: ${JSON.stringify(this.advForm.value,null,2)}`)
    console.log(`result: ${JSON.stringify(result,null,2)}`)

    this.advForm.reset( AdvGinBase.getResetObject(this.fields) );
  }

}
```

Since the template is now small and pretty, it can be in the same file as the component.
And if there are no styles it is a small and handy component.

Remove html and scss file and place everything in one

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import AdvGinBase from '../../components/advGinBase'

@Component({
  selector: 'adv-advform',
  template: `
      <form (ngSubmit)="onSubmit()" [formGroup]="advForm">
        <h1>Advanced Form</h1>
        
        <adv-adv-gin-txt-r-ml label="User Id" formControlName="id"></adv-adv-gin-txt-r-ml>
        <adv-adv-gin-txt-r-ml label="User Name" formControlName="name"></adv-adv-gin-txt-r-ml>
        <adv-adv-gin-txt-r-ml label="User Mail" emailfield="true" formControlName="email"></adv-adv-gin-txt-r-ml>
        <adv-adv-gin-sel-r label="User Rights" formControlName="rights" ></adv-adv-gin-sel-r>

        <button type="submit" class="btn btn-primary" [disabled]="advForm.invalid">Submit</button>
            
      </form>
  `
})
export class AdvformComponent implements OnInit {

  fields = ['id','name','email','rights']

  advForm: FormGroup =this.fb.group(
    AdvGinBase.getFormBuilderObject(this.fields)
  )

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void { }

  onSubmit():void {
    let result = AdvGinBase.flattenInputValues(this.advForm.value)
    console.log(`adForm: ${JSON.stringify(this.advForm.value,null,2)}`)
    console.log(`result: ${JSON.stringify(result,null,2)}`)

    this.advForm.reset( AdvGinBase.getResetObject(this.fields) );
  }

}
```



