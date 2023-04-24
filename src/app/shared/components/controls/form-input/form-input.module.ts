import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {FormInputComponent} from './components/form-input/form-input.component';

import {FormControlWrapperComponent} from '../form-control-wrapper';
import {FormErrorsModule} from '../form-errors';

@NgModule({
  declarations: [FormInputComponent],
  exports: [FormInputComponent],
  imports: [
    CommonModule,
    FormErrorsModule,
    FormControlWrapperComponent,
  ],
})
export class FormInputModule {

}
