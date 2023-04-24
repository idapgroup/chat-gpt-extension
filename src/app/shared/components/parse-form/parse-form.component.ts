import {CommonModule} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

import {DestroySubscription} from '../../classes/destroy-subscription';
import {ParseForm, ParseFormData} from '../../models/parse-form';
import {HTTP_URL_PATTERN} from '../../static/pattern';
import {FileInputComponent} from '../controls/file-input/file-input.component';
import {serverFormErrors} from '../controls/form-errors/utils/server-form-error';
import {FormInputModule} from '../controls/form-input';
import {LoaderComponent} from '../loader/loader.component';

@Component({
  selector: 'app-parse-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FileInputComponent, FormInputModule, LoaderComponent],
  templateUrl: './parse-form.component.html',
  styleUrls: ['./parse-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParseFormComponent extends DestroySubscription implements OnChanges {

  @Input() loading: boolean | null = false;
  @Input() error: HttpErrorResponse | null = null;
  @Output() send = new EventEmitter<ParseFormData>();

  form = new FormGroup<ParseForm>({
    url: new FormControl(null, {validators: [Validators.required, Validators.pattern(HTTP_URL_PATTERN)]}),
  })

  ngOnChanges(changes: SimpleChanges) {
    const error = this.error;
    if ('error' in changes && error) {
      serverFormErrors(error.error, this.form)
    }
  }

  onSubmit(): void {
    const {invalid, value} = this.form
    if (invalid) {
      return
    }
    this.send.emit(value as ParseFormData);
  }
}
