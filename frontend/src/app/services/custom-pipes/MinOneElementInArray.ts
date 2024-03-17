import { ValidatorFn, FormArray, AbstractControl } from '@angular/forms';

export function minArrayLength(min: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control) {
      return null;
    }
    const array = control as FormArray;
    return array.length >= min ? null : { minArrayLength: { requiredLength: min, actualLength: array.length } };
  };
}
