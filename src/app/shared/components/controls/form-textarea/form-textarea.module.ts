import {TextFieldModule} from '@angular/cdk/text-field';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {FormTextareaComponent} from './components/form-textarea/form-textarea.component';

import {FormControlWrapperComponent} from '../form-control-wrapper';
import {FormErrorsModule} from '../form-errors';

@NgModule({
  declarations: [
    FormTextareaComponent,
  ],
  imports: [
    CommonModule,
    FormErrorsModule,
    FormControlWrapperComponent,
    TextFieldModule,
  ],
  exports: [
    FormTextareaComponent,
  ],
})
export class FormTextareaModule {
}
