import {defer, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

/**
 * rxjs tap fn for notification only once on stream start emitting
 *
 * @template T - stream data type
 * @param callback - arrow fn with logic
 * @return Observable{T} - stream data type
 */
export const tapOnce = <T>(callback: (arg: T) => void) => (source$: Observable<T>): Observable<T> =>
  defer(() => {
    let counter = 0;
    return source$.pipe(tap((item) => {
      if (counter < 1) {
        callback(item);
        counter++;
      }
    }));
  });
