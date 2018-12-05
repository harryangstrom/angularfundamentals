import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appNoSpecialChars]',
  providers: [{provide: NG_VALIDATORS, useExisting: NoSpecialCharsDirective, multi:true}]
})
export class NoSpecialCharsDirective implements Validator{

  constructor() { }
  validate(c: FormControl): ValidationErrors {
    const hasSpecialChars = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/.test(c.value);
    const noSpecialChars = {
      noSpecialChars: true
    };
    return hasSpecialChars ? noSpecialChars : null;
  }

}
