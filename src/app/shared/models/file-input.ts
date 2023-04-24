import {SafeUrl} from '@angular/platform-browser';

export interface UploadedFile {
  path: string | SafeUrl;
  fileName: string;
  file: File | null;
}

export class UploadFileError {
  constructor(public readonly fileName: string, public readonly message: string) {
  }
}
