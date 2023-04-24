import {UntypedFormGroup} from '@angular/forms';

interface ServerError {
  [key: string]: string;
}

export const serverFormErrors = (errors: ServerError, form: UntypedFormGroup): void => {
  if (!errors) {
    return;
  }
  Object.keys(errors).forEach((key) => {
    const control = form.controls[key];
    if (control) {
      control.setErrors({server: errors[key]});
      control.markAsTouched();
    }
  });
};
