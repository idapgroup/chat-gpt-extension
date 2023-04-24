import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';

import {CHAT_MESSAGES_MOCK} from '../../../mock/chat.mock';
import {StoredChat} from '../../models/open-ai-chat';

@Component({
  selector: 'app-chat-history',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatHistoryComponent {

  @Input() history: StoredChat[] | null = null;

  mockHistory: StoredChat[] = [{id: 'mock', title: 'MOCK TITLE', chat: CHAT_MESSAGES_MOCK}]

}
