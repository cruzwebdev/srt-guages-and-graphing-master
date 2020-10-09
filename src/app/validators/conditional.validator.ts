import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { delay } from 'rxjs/operators';

export function compareValidator(comparisonControl: FormControl, validator: ValidatorFn): ValidatorFn {
  let thisControl: AbstractControl;
  let previousValue: any;

  comparisonControl.valueChanges.pipe(delay(0)).subscribe(value => {
    if (thisControl && value !== previousValue) {
      previousValue = value;
      thisControl.updateValueAndValidity();
    }
  });

  return (control: AbstractControl) => {
    thisControl = control;

    return validator(control);
  };
}
