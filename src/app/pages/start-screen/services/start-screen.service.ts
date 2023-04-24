import {inject, Injectable} from '@angular/core';
import {from, map, Observable} from 'rxjs';

import {StoredChat} from '../../../shared/models/open-ai-chat';
import {ParseFormData} from '../../../shared/models/parse-form';
import {ParseResponseDto} from '../../../shared/models/parsing';
import {StorageService} from '../../../shared/modules/storage/classes/storage.service';
import {OpenAiBackendService} from '../../../shared/services/open-ai-backend/open-ai-backend.service';
import {CHAT_GPT_INITIAL, HISTORY_STORAGE_KEY} from '../../../shared/static/consts';

@Injectable()
export class StartScreenService {

  private readonly openAiBackendService = inject(OpenAiBackendService);

  private readonly storageService = inject(StorageService);

  parse({url}: ParseFormData): Observable<ParseResponseDto> {
    const payload = {url};
    return this.openAiBackendService.parse(payload)
  }

  addToHistory({title, storeId}: ParseResponseDto, history: StoredChat[] | null): void {
    this.storageService.setItem<StoredChat[]>(HISTORY_STORAGE_KEY, [...history || [], {id: storeId, title, chat: CHAT_GPT_INITIAL}])
  }

  getLastHistory(count: number): Observable<StoredChat[] | null> {
    return  from(this.storageService.getItem<StoredChat[] | null>(HISTORY_STORAGE_KEY))
      .pipe(
        map(res=> res?.length ? res.slice(-count): null),
      )
  }
}
