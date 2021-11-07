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

