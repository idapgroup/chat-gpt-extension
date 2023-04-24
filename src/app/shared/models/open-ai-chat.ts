export type ChatMessageType = 'apiMessage' | 'userMessage'

export interface Chat {
  history: string,
  messages: ChatMessage[],
}
export interface ChatMessage {
  role: ChatMessageType
  content: string
}

export interface ChatRequestPayload  {
  question: string,

  history: string,
  id: string,
}

export interface StoredChat {
  chat: Chat,
  title: string,
  id: string,
}

export type ChatConnectState = 'waiting' | 'loading' | 'generation';
