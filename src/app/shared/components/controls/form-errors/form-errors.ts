import {InjectionToken} from '@angular/core';

export type ControlStatus = 'valid' | 'invalid';

export class CustomFormError {
  constructor(
    public readonly key: string,
    public readonly value?: string | null,
  ) {
  }
}

export type CustomFormErrorArg = { [key: string]: string | number } | string | number | null;

export type CustomFormErrorFn = (value: keyof CustomFormErrorArg) => CustomFormError;

export interface CustomFormErrors {
  [key: string]: CustomFormErrorFn;
}

export const defaultErrors: CustomFormErrors = {
  required: () => new CustomFormError('This field is required'),
  maxlength: (err: { [key: string]: number }) => new CustomFormError(`Maximum ${err['requiredLength']} characters`),
  minlength: (err: { [key: string]: number }) => new CustomFormError(`Must be at least ${err['requiredLength']} characters`),
  pattern: () => new CustomFormError('Invalid format'),
  server: (message) => new CustomFormError(`${message}`),
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  factory: () => defaultErrors,
});
