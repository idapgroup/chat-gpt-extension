import {CommonModule} from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {MarkdownModule} from 'ngx-markdown';

import {ChatConnectState, ChatMessage} from '../../models/open-ai-chat';
import {ChatMessageComponent} from '../chat-message/chat-message.component';

@Component({
  selector: 'app-chat-panel',
  standalone: true,
  imports: [CommonModule, MarkdownModule, ChatMessageComponent],
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPanelComponent implements OnChanges, AfterViewInit {
  @Input() messages: ChatMessage[] | null = null;
  @Input() connection: ChatConnectState | null = null;

  @ViewChild('container') readonly containerRef: ElementRef<HTMLDivElement> | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if ('messages' in changes && this.messages) {
      this.scrollDown();
    }
  }

  ngAfterViewInit() {
    setTimeout(() => this.scrollDown(), 0);
  }

  private scrollDown(): void {
    const el = this.containerRef?.nativeElement;
    if (!el) {
      return;
    }
    el.scrollTop = el.scrollHeight;
  }
}
