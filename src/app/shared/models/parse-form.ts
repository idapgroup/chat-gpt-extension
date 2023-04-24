import {FormControl} from '@angular/forms';

import {FormControlsData} from '../utils/utility-types';

export interface ParseForm {
  url: FormControl<string | null>;
}

export type ParseFormData = FormControlsData<ParseForm>
