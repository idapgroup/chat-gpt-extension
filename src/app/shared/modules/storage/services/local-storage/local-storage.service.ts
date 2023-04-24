import {Injectable, isDevMode} from '@angular/core';

import {Storage} from '../../models/storage';

@Injectable()
export class LocalStorageService implements Storage{

  private readonly localStorage = window.localStorage;

  getItem<T>(key: string): Promise< T |  null> {
    return new Promise((resolve) => {
      try {
        const item = this.localStorage.getItem(key);
        const value = item ? JSON.parse(item) as T : null;
        resolve(value)
      } catch (error) {
        this.logError(error);
        resolve( null)
      }
    })
  }

  setItem<T>(key: string, value: T): void {
    try {
      this.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      this.logError(error);
    }
  }

  removeItem(key: string): void {
    try {
      this.localStorage.removeItem(key);
    } catch (error) {
      this.logError(error);
    }
  }

  clear(): void {
    try {
      this.localStorage.clear();
    } catch (error) {
      this.logError(error);
    }
  }

  private logError(error: unknown): void {
    if (isDevMode()) {
      console.error(error);
    }
  }

}
