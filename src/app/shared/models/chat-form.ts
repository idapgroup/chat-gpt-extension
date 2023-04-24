import {FormControl} from '@angular/forms';

import {FormControlsData} from '../utils/utility-types';

export interface ChatForm {
  message: FormControl<string>
}

export type ChatFormValue = FormControlsData<ChatForm>;
