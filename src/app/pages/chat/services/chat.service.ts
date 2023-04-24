import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, from, map, Observable} from 'rxjs';

import {CHAT_MESSAGES_MOCK} from '../../../mock/chat.mock';
import {Chat, ChatMessage, StoredChat} from '../../../shared/models/open-ai-chat';
import {StorageService} from '../../../shared/modules/storage/classes/storage.service';
import {OpenAiBackendService} from '../../../shared/services/open-ai-backend/open-ai-backend.service';
import {CHATGPT_START_MESSAGE_TEXT, HISTORY_STORAGE_KEY} from '../../../shared/static/consts';
import {tapOnce} from '../../../shared/utils/tap-once';

@Injectable()
export class ChatService {

  private messageStore$ = new BehaviorSubject<Chat>({
    messages: [{
      role: 'apiMessage',
      content: CHATGPT_START_MESSAGE_TEXT,
    }], history: '',
  });
  private abortController: AbortController | null = null;
  private readonly openAiBackendService = inject(OpenAiBackendService);
  private readonly storageService = inject(StorageService);

  messages$: Observable<ChatMessage[]> = this.messageStore$.asObservable().pipe(map(v => v.messages));

  destroy(): void {
    this.messageStore$.complete();
  }

  sendQuestion(question: string, conversationId: string): Observable<ChatMessage> {
    const {history} = this.messageStore$.value;
    const userMessage: ChatMessage = {role: 'userMessage', content: question};
    this.setMessageToStore(userMessage)
    this.abortController = new AbortController();
    return this.openAiBackendService.sendQuestion({question, history, id: conversationId}, this.abortController.signal)
      .pipe(
        tapOnce(() => {
          this.setMessageToStore({role: 'apiMessage', content: ''})
        }),
      )
  }

  stopGeneration(): void {
    this.abortController?.abort();
  }

  updateHistory(conversationId: string): void {
    const {messages, history} = this.messageStore$.value;
    const lastIndex = messages.map(m =>
      m.role === 'apiMessage').lastIndexOf(true);
    if (lastIndex < 0) {
      return
    }
    const question = messages[lastIndex - 1].content;
    const response = messages[lastIndex].content;
    const updatedChat = {messages, history: history.concat(`U:${question}A:${response}`)};
    this.messageStore$.next(updatedChat);
    this.updateStorageHistory(updatedChat, conversationId)
  }

  getHistory(conversationId: string): Observable<StoredChat | null> {
    return from(this.storageService.getItem<StoredChat[]>(HISTORY_STORAGE_KEY)).pipe(
      map(res => {
        if (conversationId === 'mock') {
          this.messageStore$.next(CHAT_MESSAGES_MOCK);
          return {id: conversationId, title: 'MOCK', chat: CHAT_MESSAGES_MOCK};
        }
        const existChat = res?.find(c => c.id === conversationId);
        return existChat || null
      }),
    )
  }

  updateMessageStore(chat: Chat) {
    this.messageStore$.next(chat);
  }

  private updateStorageHistory(chat: Chat, id: string): void {
    this.storageService.getItem<StoredChat[]>(HISTORY_STORAGE_KEY).then(res => {
      const index = res?.findIndex(c => c.id === id);
      if (res && index !== undefined && index > -1) {
        res.splice(index, 1, {chat, title: res[index].title, id})
        this.storageService.setItem(HISTORY_STORAGE_KEY, res)
        return;
      }
      this.storageService.setItem(HISTORY_STORAGE_KEY, [...res || [], {chat, title: '', id}]);
    })
  }

  setMessageToStore(message: ChatMessage): void {
    const {value: {messages, history}} = this.messageStore$;
    const newValue = [...messages, message]
    this.messageStore$.next({history, messages: newValue});
  }

  updateLastAssistantMessage(message: string): void {
    const {value: {messages, history}} = this.messageStore$;
    const lastIndex = messages.map(m =>
      m.role === 'apiMessage').lastIndexOf(true);
    if (lastIndex < 0) {
      return
    }
    const newValue: ChatMessage = {role: 'apiMessage', content: `${messages[lastIndex].content}${message}`}
    messages.splice(lastIndex, 1, newValue);
    this.messageStore$.next({messages: [...messages], history});
  }
}
