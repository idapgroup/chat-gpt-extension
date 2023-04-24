import {Storage} from '../models/storage';

export abstract class StorageService implements Storage {
  abstract getItem: <T>(key: string) => Promise< T |  null>;
  abstract setItem: <T>(key: string, value: T) => void
  abstract removeItem: (key: string) => void
  abstract clear: () => void

}
