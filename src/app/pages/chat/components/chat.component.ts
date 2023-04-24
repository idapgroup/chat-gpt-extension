import {CommonModule} from '@angular/common';
import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject, distinctUntilChanged, merge, Observable, shareReplay, Subject, takeUntil} from 'rxjs';

import {DestroySubscription} from '../../../shared/classes/destroy-subscription';
import {ChatFormComponent} from '../../../shared/components/chat-form/chat-form.component';
import {ChatPanelComponent} from '../../../shared/components/chat-panel/chat-panel.component';
import {ChatFormValue} from '../../../shared/models/chat-form';
import {ChatConnectState} from '../../../shared/models/open-ai-chat';
import {ChatService} from '../services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ChatPanelComponent, ChatFormComponent],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ChatService],
})
export class ChatComponent extends DestroySubscription implements OnInit, OnDestroy {

  private connectState$ = new BehaviorSubject<ChatConnectState>('waiting');
  private closeStream$ = new Subject<void>();

  private readonly chatService = inject(ChatService);
  private readonly activatedRoute = inject(ActivatedRoute);

  messages$ = this.chatService.messages$;
  title = '';
  connection$: Observable<ChatConnectState> = this.connectState$.asObservable().pipe(distinctUntilChanged(), shareReplay(1));

  constructor() {
    super();
  }

  ngOnInit() {
    const conversationId = this.getConversationId();
    this.chatService.getHistory(conversationId).pipe(
      takeUntil(this.destroyStream$),
    ).subscribe(res => {
      if (res) {
        this.title = res.title;
        this.chatService.updateMessageStore(res?.chat);
      }
    })

  }

  override ngOnDestroy() {
    super.destroy();
    this.connectState$.complete();
    this.chatService.destroy();
    this.closeStream$.complete();
  }

  onSubmit({message}: ChatFormValue) {
    this.connectState$.next('loading');
    const conversationId = this.getConversationId();
    this.chatService.sendQuestion(message, conversationId)
      .pipe(
        takeUntil(merge(this.destroyStream$, this.closeStream$)),
      ).subscribe({
        next: res => {
          this.connectState$.next('generation');
          this.chatService.updateLastAssistantMessage(res.content)
        },
        error: () => {
          this.connectState$.next('waiting');
        },
        complete: () => {
          this.chatService.updateHistory(conversationId);
          this.connectState$.next('waiting');
          this.closeStream$.next();
        },
      })
  }

  onStopGeneration(): void {
    this.chatService.stopGeneration()
    this.closeStream$.next();
    this.connectState$.next('waiting');
  }

  private getConversationId(): string {
    return this.activatedRoute.snapshot.params['id']
  }
}
