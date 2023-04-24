import {createParser, ParsedEvent, ReconnectInterval as EventSourceReconnectInterval} from 'eventsource-parser'
import {Subscriber} from 'rxjs';

import {streamAsyncIterable} from './stream-async-iterable';

import {ChatMessage, ChatMessageType} from '../models/open-ai-chat';

export const parseOpenAIStream = (rawResponse: Response, role: ChatMessageType, observer: Subscriber<ChatMessage>) => {
  const decoder = new TextDecoder()
  return new ReadableStream({
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    async start(controller) {

      const streamParser = (event: ParsedEvent | EventSourceReconnectInterval) => {
        if ('type' in event && event.type === 'event') {
          const data = event.data
          if (data === '[DONE]') {
            controller.close();
            observer.complete();
            return
          }
          try {
            const json = JSON.parse(data);
            const message: ChatMessage = {
              content: json.data,
              role,
            }
            observer.next(message)
          } catch (e) {
            controller.error(e)
          }
        }
      }

      const parser = createParser(streamParser)
      if (rawResponse.body) {
        for await (const chunk of streamAsyncIterable(rawResponse.body)) {
          parser.feed(decoder.decode(chunk))
        }
      }
    },
  })
}
