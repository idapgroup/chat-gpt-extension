import {TextFieldModule} from '@angular/cdk/text-field';
import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

import {ChatForm, ChatFormValue} from '../../models/chat-form';
import {ChatConnectState} from '../../models/open-ai-chat';
import {FormTextareaModule} from '../controls/form-textarea';
import {LoaderComponent} from '../loader/loader.component';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextFieldModule, FormTextareaModule, LoaderComponent],
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatFormComponent {

  @Input() connection: ChatConnectState | null = null;
  @Output() send = new EventEmitter<ChatFormValue>();
  @Output() stopGeneration = new EventEmitter<void>();

  form = new FormGroup<ChatForm>({
    message: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.maxLength(1000)]}),
  })

  onSubmit(): void {
    const {invalid, value} = this.form
    if (invalid || this.connection !== 'waiting') {
      return
    }

    this.send.emit(value as ChatFormValue);
    this.form.reset();
    this.form.markAsUntouched();
  }

  onStopGeneration(): void {
    this.stopGeneration.emit()
  }
}
