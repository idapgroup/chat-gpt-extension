import {
  AfterViewInit,
  ChangeDetectorRef,
  ComponentRef,
  Directive,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Output,
  ViewContainerRef,
} from '@angular/core';
import {AbstractControl, NgControl} from '@angular/forms';
import {merge, startWith, Subject, takeUntil} from 'rxjs';

import {extractTouchedChanges} from '../../../../utils/extract-touched-changes';
import {ControlErrorComponent} from '../components/control-error/control-error.component';
import {ControlStatus, CustomFormError, CustomFormErrorArg, CustomFormErrors, FORM_ERRORS} from '../form-errors';

@Directive({
  selector: '[appControlErrors]',
})
export class ControlErrorsDirective implements AfterViewInit, OnDestroy {
  private ref: ComponentRef<ControlErrorComponent> | null = null;
  private readonly destroyStream$ = new Subject<void>();

  @Input() hideErrors = false;

  @Output() status = new EventEmitter<ControlStatus>();

  constructor(
    private readonly vcr: ViewContainerRef,
    @Optional() private readonly control: NgControl,
    @Inject(FORM_ERRORS) private readonly errors: CustomFormErrors,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.checkStatusOrTouchedChanges());
  }

  ngOnDestroy(): void {
    const destroy = this.destroyStream$;
    destroy.next();
    destroy.complete();
    const ref = this.ref;
    if (ref) {
      ref.destroy();
    }
  }

  private checkStatusOrTouchedChanges(): void {
    const control = this.control;
    if (control && control.statusChanges) {
      merge(
        control.statusChanges.pipe(startWith(control.status)),
        extractTouchedChanges(control.control as AbstractControl),
      )
        .pipe(takeUntil(this.destroyStream$))
        .subscribe(() => {
          this.toggleErrorContainer();
          if (control.control) {
            control.control.markAsDirty();
            this.cdr.detectChanges();
          }
        });
    }
  }

  private toggleErrorContainer(): void {
    if (this.hideErrors) {
      return;
    }
    const controlErrors = this.control.errors;
    if (controlErrors && this.control.touched) {
      const firstValue = Object.keys(controlErrors)[0];
      const getError = this.errors[firstValue];
      if (!getError) {
        return;
      }
      const errKey = controlErrors[firstValue] as keyof CustomFormErrorArg;
      const error = getError(errKey);
      this.setError(error);
      this.status.emit('invalid');
    } else if (this.ref) {
      this.setError(null);
      this.status.emit('valid');
    }
  }

  private setError(text: CustomFormError | null): void {
    if (!this.ref) {
      this.ref = this.vcr.createComponent(ControlErrorComponent);
    }
    this.ref.instance.error = text;
  }
}
