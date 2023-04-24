import {CommonModule} from '@angular/common';
import {isDevMode, ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';

import {StorageService} from './classes/storage.service';
import {BrowserStorageService} from './services/browser-storage/browser-storage.service';
import {LocalStorageService} from './services/local-storage/local-storage.service';

const storageServiceFactory = (): StorageService => isDevMode() ? new LocalStorageService() : new BrowserStorageService();
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
})
export class StorageModule {
  constructor(@Optional() @SkipSelf() parentModule: StorageModule) {
    if (parentModule) {
      throw new Error('StorageModule should be imported only in AppModule.');
    }
  }

  static forRoot(): ModuleWithProviders<StorageModule> {
    return {
      ngModule: StorageModule,
      providers: [
        {
          provide: StorageService,
          useFactory: storageServiceFactory,
        },
      ],
    };
  }
}
