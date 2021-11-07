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