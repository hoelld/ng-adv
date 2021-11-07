import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import AdvGinBase from 'src/app/components/advGinBase';

@Component({
  selector: 'adv-obs-sample',
  templateUrl: './obs-sample.component.html',
  styles: [
  ]
})
export class ObsSampleComponent implements OnInit {
  fields = ['stream_input']

  outerStream: FormGroup =this.fb.group(
    AdvGinBase.getFormBuilderObject(this.fields)
  )

  innerStream: FormGroup =this.fb.group(
    AdvGinBase.getFormBuilderObject(this.fields)
  )

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.outerStream.valueChanges.pipe(
      
    )
  }

}
