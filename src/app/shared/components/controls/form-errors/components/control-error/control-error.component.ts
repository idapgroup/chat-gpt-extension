import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';

import {CustomFormError} from '../../form-errors';

@Component({
  selector: 'app-control-error',
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlErrorComponent {
  displayedError: CustomFormError | null = null;
  hide = true;

  @Input() set error(value: CustomFormError | null) {
    if (!value) {
      this.displayedError = null;
      this.hide = true;
      this.cdr.detectChanges();
      return;
    }
    if (value.key !== (this.displayedError && this.displayedError.key)) {
      this.displayedError = value;
      this.hide = !value;
      this.cdr.detectChanges();
    }
  }

  constructor(private cdr: ChangeDetectorRef) {
  }

}
