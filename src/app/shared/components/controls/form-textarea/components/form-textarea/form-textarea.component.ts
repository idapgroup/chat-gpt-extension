import {FocusMonitor} from '@angular/cdk/a11y';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  NgZone,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {take} from 'rxjs';

import {ControlStatus} from '../../../form-errors/form-errors';

@Component({
  selector: 'app-form-textarea',
  templateUrl: './form-textarea.component.html',
  styleUrls: ['./form-textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormTextareaComponent),
      multi: true,
    },
  ],
})
export class FormTextareaComponent implements ControlValueAccessor {
  static nextId = 0;
  readonly id = `form-textarea-${FormTextareaComponent.nextId++}`;

  status: ControlStatus = 'valid';

  @Input() value = '';
  @Input() label = '';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() minRows = 1;
  @Input() maxRows = 5;
  @Output() changed = new EventEmitter<string>();
  @Output() submitted = new EventEmitter<void>();

  @ViewChild('textArea', {static: true}) textAreaInput: ElementRef<HTMLTextAreaElement> | null = null;
  @ViewChild('cfcAutosize', {static: true}) contentFCAutosize?: CdkTextareaAutosize;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChangeFn = (_: unknown) => {
  };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouchedFn = () => {
  };

  constructor(
    private readonly renderer: Renderer2,
    private readonly focusMonitor: FocusMonitor,
    private readonly zone: NgZone,
    private readonly cdr: ChangeDetectorRef,
  ) {
  }

  onChangeValue(event: any): void {
    this.value = event.target && event.target.value || '';
    this.onChange();
  }

  onChangeStatus(event: ControlStatus): void {
    if (this.status !== event) {
      this.status = event;
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.detectChanges();
  }

  writeValue(value: string): void {
    if (!value) {
      this.value = '';
      return;
    }
    this.value = value;
  }

  onTouched() {
    this.onTouchedFn();
  }

  onChange() {
    this.onChangeFn(this.value);
    this.changed.emit(this.value);
    this.resizeTextArea();
  }

  handleKeyDown(e: KeyboardEvent) {
    if (e.key !== 'Enter') {
      return;
    }
    e.preventDefault()
    if (e.shiftKey) {
      const message = this.value;
      this.value = message + '\n'
      return;
    }
    this.submitted.emit();
  }

  onContentClick(): void {
    this.textAreaInput?.nativeElement.focus();
  }

  private resizeTextArea() {
    this.zone.onStable.pipe(take(1))
      .subscribe(() => this.contentFCAutosize?.resizeToFitContent(true))
  }
}
