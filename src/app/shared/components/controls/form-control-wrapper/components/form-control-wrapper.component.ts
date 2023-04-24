import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import {ControlStatus} from '../../form-errors/form-errors';
import {FORM_CONTROL_CONFIG} from '../providers/form-control-config.provider';

@Component({
  selector: 'app-form-control-wrapper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-control-wrapper.component.html',
  styleUrls: ['./form-control-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormControlWrapperComponent {

  @Input() label: string | null = null;
  @Input() description: string | null = null;
  @Input() required = false;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() active = false;
  @Input() status: ControlStatus = 'valid';
  @Output() contentClick = new EventEmitter<void>();

  wrapperStyling: string[] = [];
  readonly formControlConfig = inject(FORM_CONTROL_CONFIG);

  @ViewChild('contentRef', {static: true}) contentRef: ElementRef<HTMLElement> | null = null;

  constructor() {
    this.updateStyling();
  }

  protected updateStyling(): void {
    const settings = this.formControlConfig;
    this.wrapperStyling = [...settings.additionalClasses];
  }

  onContentClick() {
    if (this.disabled) {
      return;
    }
    this.contentClick.emit();
  }
}
