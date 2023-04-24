import {Chat} from '../shared/models/open-ai-chat';

export const CHAT_MESSAGES_MOCK: Chat = {
  'messages': [
    {
      'role': 'apiMessage',
      'content': 'Hi, what would you like to learn about this case?',
    },
    {
      'role': 'userMessage',
      'content': 'что такое грид',
    },
    {
      'role': 'apiMessage',
      'content': 'Грид - это CSS-свойство, которое позволяет создавать сетки для размещения элементов на веб-странице. Гриды включают в себя интуитивный «ASCII-графический» синтаксис, в котором вы можете виртуально «видеть» шаблон в коде, поэтому становится очень легко создавать и изменять сам шаблон. Гриды также являются адаптивными, что означает',
    },
    {
      'role': 'userMessage',
      'content': 'что такое subgrid',
    },
    {
      'role': 'apiMessage',
      'content': 'Subgrid is a nested grid with display: subgrid. It is a special type of grid container that participates in setting the size of the parent grid container. In other words, the content of the subgrid affects the size of the parent grid, allowing the content to be arranged across two grids. It is a value that can be set for the display property in CSS Grid module. However, not all browsers support it yet.',
    },
    {
      'role': 'userMessage',
      'content': 'provide code example',
    },
    {
      'role': 'apiMessage',
      'content': 'example code: ```css\nli {\n  display: grid;\n  grid: subgrid;\n}\n```',
    },
    {
      'role': 'apiMessage',
      'content': `
          In some situations, you might need to re-render markdown after making changes. If you've updated the text this would be done automatically, however if the changes are internal to the library such as rendering options, you will need to inform the \`MarkdownService\` that it needs to update.

    To do so, inject the \`MarkdownService\` and call the \`reload()\` function as shown below.

    \`\`\`typescript
    import &#123; MarkdownService } from 'ngx-markdown';

    constructor(
      private markdownService: MarkdownService,
    ) &#123; }

    update() &#123;
      this.markdownService.reload();
    }
    \`\`\`
    `,
    },
  ],
  'history': 'U:что такое гридA:Грид - это CSS-свойство, которое позволяет создавать сетки для размещения элементов на веб-странице. Гриды включают в себя интуитивный «ASCII-графический» синтаксис, в котором вы можете виртуально «видеть» шаблон в коде, поэтому становится очень легко создавать и изменять сам шаблон. Гриды также являются адаптивными, что означаетU:что такое гридA:Грид - это CSS-свойство, которое позволяет создавать сетки для размещения элементов на веб-странице. Гриды включают в себя интуитивный «ASCII-графический» синтаксис, в котором вы можете виртуально «видеть» шаблон в коде, поэтому становится очень легко создавать и изменять сам шаблон. Гриды также являются адаптивными, что означаетU:что такое subgridA:Subgrid is a nested grid with display: subgrid. It is a special type of grid container that participates in setting the size of the parent grid container. In other words, the content of the subgrid affects the size of the parent grid, allowing the content to be arranged across two grids. It is a value that can be set for the display property in CSS Grid module. However, not all browsers support it yet.U:provide code exampleA:```css\nli {\n  display: grid;\n  grid: subgrid;\n}\n```',
}
