import {Directive, OnDestroy} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Directive()
export class DestroySubscription implements OnDestroy {

  private readonly destroySubject: Subject<void> = new Subject();

  protected get destroyStream$(): Observable<void> {
    return this.destroySubject.asObservable();
  }

  protected destroy(): void {
    const destroy = this.destroySubject;
    if (destroy.closed) {
      return;
    }
    destroy.next();
    destroy.unsubscribe();
  }

  ngOnDestroy(): void {
    this.destroy();
  }
}
