import {Chat} from '../models/open-ai-chat';

export const CHATGPT_START_MESSAGE_TEXT = 'Hi, what would you like to learn about this case?';

export const CHAT_GPT_INITIAL: Chat = {messages: [{role: 'apiMessage', content: CHATGPT_START_MESSAGE_TEXT}], history: ''};

export const HISTORY_STORAGE_KEY = 'chat_gpt_history';
export const LAST_ROUTE_STORAGE_KEY = 'chat_gpt_last_route';
