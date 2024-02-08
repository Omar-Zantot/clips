import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class RegisterValidators {
  static match(controlName: string, matchingControlName: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const control = group.get(controlName);
      const matchingcontrol = group.get(matchingControlName);

      if (!control || !matchingcontrol) {
        console.error('Form controls can not be found in the form group.');
        return { controlNotFound: false };
      }

      const error =
        control.value === matchingcontrol.value ? null : { noMatch: true };

      matchingcontrol.setErrors(error);

      return error;
    };
  }
}
