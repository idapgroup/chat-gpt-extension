import {FormArray, FormControl, FormGroup} from '@angular/forms';

export type FormControlsData<T> = {
  [P in keyof T]:
  T[P] extends FormControl<infer Type> ?
    Type :
    (T[P] extends FormArray<infer FormArrayType> ?
      (FormArrayType extends FormGroup<infer FormGroupType> ?
        Array<Partial<FormControlsData<FormGroupType>>> :
        Array<FormArrayType>) :
      never)
};

export type RequireOnlyOne<T, Keys extends keyof T = keyof T> =
  Pick<T, Exclude<keyof T, Keys>>
  & {
    [K in Keys]-?:
    Required<Pick<T, K>>
    & Partial<Record<Exclude<Keys, K>, undefined>>
  }[Keys]
