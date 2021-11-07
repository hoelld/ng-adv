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
