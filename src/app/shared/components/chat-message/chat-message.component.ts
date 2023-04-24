import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MarkdownModule, MarkdownService} from 'ngx-markdown';

import {ChatMessage} from '../../models/open-ai-chat';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [CommonModule, MarkdownModule],
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageComponent implements OnChanges {

  @Input() message: ChatMessage | null = null;
  @Input() showBlinkCursor: boolean | null = null;

  isUserMessage = true;

  private markdownService =  inject(MarkdownService);

  ngOnChanges(changes: SimpleChanges) {
    if('message' in changes && this.message){
      this.isUserMessage = this.message.role === 'userMessage';
      this.markdownService.reload();
    }
  }
}
