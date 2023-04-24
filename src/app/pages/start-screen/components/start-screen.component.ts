import {CommonModule} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {ChangeDetectorRef, Component, inject, OnDestroy} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {BehaviorSubject, Observable, take, takeUntil, withLatestFrom} from 'rxjs';

import {DestroySubscription} from '../../../shared/classes/destroy-subscription';
import {ChatHistoryComponent} from '../../../shared/components/chat-history/chat-history.component';
import {ParseFormComponent} from '../../../shared/components/parse-form/parse-form.component';
import {StoredChat} from '../../../shared/models/open-ai-chat';
import {ParseFormData} from '../../../shared/models/parse-form';
import {StartScreenService} from '../services/start-screen.service';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [CommonModule, RouterLink, ParseFormComponent, ChatHistoryComponent],
  providers: [StartScreenService],
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent extends DestroySubscription implements OnDestroy {

  userHistory$: Observable<StoredChat[] | null>;

  loading$ = new BehaviorSubject(false);

  error: HttpErrorResponse | null = null;
  private readonly startScreenService = inject(StartScreenService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly router = inject(Router);

  constructor() {
    super();
    this.userHistory$ = this.startScreenService.getLastHistory(5)
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.loading$.complete()
  }

  onParseUrl(form: ParseFormData) {
    this.loading$.next(true)
    this.startScreenService.parse(form).pipe(
      withLatestFrom(this.userHistory$),
      take(1),
      takeUntil(this.destroyStream$),
    ).subscribe({
      next: ([data, history]) => {
        this.startScreenService.addToHistory(data, history);
        this.router.navigate(['/chat', data.storeId])
      },
      error: (err) => {
        this.loading$.next(false)
        this.error = err;
        this.cdr.detectChanges();
      },
      complete: () => {
        this.loading$.next(false)
      },
    })
  }

}
