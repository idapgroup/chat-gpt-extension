import {Injectable} from '@angular/core';
import Browser from 'webextension-polyfill';

import {Storage} from '../../models/storage';

@Injectable()
export class BrowserStorageService implements Storage {

  private readonly storage = Browser.storage.local;

  getItem<T>(key: string): Promise< T |  null> {
    return  this.storage.get(key).then(res => res[key])
  }

  setItem<T>(key: string, value: T): void {
    this.storage.set({[key]: value});
  }

  removeItem(key: string): void {
    this.storage.remove(key);
  }

  clear(): void {
    this.storage.clear()
  }
}
