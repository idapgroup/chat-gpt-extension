import {InjectionToken} from '@angular/core';

type ControlTheme = 'default'

interface FormControlConfig {
  theme: ControlTheme;
  additionalClasses: string[];
}

export const FORM_CONTROL_CONFIG = new InjectionToken('FormControlConfig', {
  factory: (): FormControlConfig => DEFAULT_CONTROL_CONFIG,
});

export const DEFAULT_CONTROL_CONFIG: FormControlConfig = {
  theme: 'default',
  additionalClasses: [],
};
