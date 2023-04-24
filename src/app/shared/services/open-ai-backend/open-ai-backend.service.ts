import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {environment} from '../../../../environments/environment';
import {ChatMessage, ChatRequestPayload} from '../../models/open-ai-chat';
import {ParsePayload, ParseResponseDto} from '../../models/parsing';
import {parseOpenAIStream} from '../../utils/parse-open-ai-stream';

@Injectable({
  providedIn: 'root',
})
export class OpenAiBackendService {

  private readonly apiUrl = `${environment.apiUrl}/api`;
  private readonly httpClient = inject(HttpClient);

  parse(payload: ParsePayload): Observable<ParseResponseDto> {
    return this.httpClient.post<ParseResponseDto>(`${this.apiUrl}/parse`, payload)
  }

  sendQuestion ({question, history, id}: ChatRequestPayload, signal: AbortSignal): Observable<ChatMessage> {
    const role = 'apiMessage';
    return new Observable((observer) => {
      const body = JSON.stringify({
        question,
        history,
        id,
      });
      fetch(`${this.apiUrl}/chat`, {
        body,
        signal,
        method: 'POST',
      }).then((res) => {
        if (!res.ok) {
          res.json().then(data => {
            const error = data?.message || `${data.status} ${data.statusText}`;
            observer.error(error);
            observer.complete();
          })
          return;
        }
        observer.next({role, content: ''});
        parseOpenAIStream(res, role, observer)
      }).catch(err => {
        const error = err?.message || `${err.status} ${err.statusText}`;
        observer.error(error);
        observer.complete();
      })
    })
  }
}
