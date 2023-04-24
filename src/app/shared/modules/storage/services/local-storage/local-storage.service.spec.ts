import {TestBed} from '@angular/core/testing';

import {LocalStorageService} from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  const testKey = 'testKey';
  const testValue = 'testValue';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService],
    });

    let store = { };
    const mockLocalStorage = {
      getItem: (key: string): string => key in store ? store[key] : null,
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clearStorage: () => {
        store = {};
      },
    };

    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clearStorage);

    service = TestBed.get(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set item in localStorage', () => {
    service.setItem(testKey, testValue);
    expect(JSON.parse(localStorage.getItem(testKey))).toBe(testValue);
  });

  it('should get item from localStorage', () => {
    localStorage.setItem(testKey, JSON.stringify(testValue));
    expect(service.getItem(testKey)).toBe(testValue);
  });

  it('should return null if value exists', () => {
    expect(service.getItem(testKey)).toBeNull();
  });

  it('sould remove item from localStorage', () => {
    service.setItem(testKey, testValue);
    expect(JSON.parse(localStorage.getItem(testKey))).toBe(testValue);
    service.removeItem(testValue);
    expect(localStorage.getItem(testValue)).toBeNull();
  });

  it('should clear localStorage', () => {
    service.setItem(testKey, testValue);
    expect(JSON.parse(localStorage.getItem(testKey))).toBe(testValue);
    service.clearStorage();
    expect(localStorage.getItem(testValue)).toBeNull();
  });
});
