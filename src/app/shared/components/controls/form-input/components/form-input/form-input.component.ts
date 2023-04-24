import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {ControlStatus} from '../../../form-errors/form-errors';

export type InputType = 'text' | 'number' | 'password' | 'email' | 'tel' | 'url';
export type InputMode = 'text' | 'numeric' | 'decimal' | 'email' | 'tel' | 'url' | 'search';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true,
    },
  ],
})
export class FormInputComponent implements OnChanges, ControlValueAccessor {

  static nextId = 0;
  readonly id = `form-input-${FormInputComponent.nextId++}`;

  value = '';
  status: ControlStatus = 'valid';

  @Input() label = '';
  @Input() hint = '';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() required = false;
  @Input() readonly = false;
  @Input() type: InputType = 'text';
  @Input() inputMode: InputMode = 'text';
  @Input() autocomplete: string | null = null;
  @Output() changed = new EventEmitter<string>();

  @ViewChild('formInput', {static: true}) formInput: ElementRef<HTMLInputElement> | null = null;

  active = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChangeFn = (_: string) => {
  };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouchedFn = () => {
  };

  constructor(
    private readonly renderer: Renderer2,
    private readonly cdr: ChangeDetectorRef,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const typeChanges = changes && changes['type'];
    if (typeChanges) {
      this.setInputValue('type', this.type);
    }
  }

  onChangeStatus(event: ControlStatus): void {
    if (this.status !== event) {
      this.status = event;
    }
  }

  onChangeValue(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
    this.changed.emit(value)
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  onContentClick(): void {
    this.formInput?.nativeElement.focus();
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.detectChanges();
  }

  writeValue(value: string): void {
    this.value = value || '';
    this.setInputValue('value', this.value);
  }

  onBlur(): void {
    this.onTouchedFn();
    this.setActiveState(false);
    this.cdr.detectChanges();
  }

  onFocus(): void {
    this.setActiveState(true);
  }

  onChange(value: string): void {
    this.onChangeFn(value);
  }

  setActiveState(active: boolean): void {
    this.active = active;
  }

  private setInputValue(key: keyof Pick<HTMLInputElement, 'value' | 'type'>, value: string | number): void {
    const input = this.formInput?.nativeElement;
    if (!input) {
      return;
    }
    input[key] = value.toString();
  }
}
