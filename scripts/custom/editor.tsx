import { html, raw } from 'hono/html';
import { env } from '../../src/validations/env';

export const editorJs = (
  blocks: any = {
    blocks: [{ type: 'paragraph', data: { text: 'para' } }],
  }
) =>
  html`<script>
    const editor = new EditorJS({
      holder: 'editorjs',
      placeholder: 'Write content here...',
      inlineToolbar: true,
      data: ${raw(JSON.stringify(blocks))},

      onReady: () => {
        new Undo({ editor });
      },

      tools: {
        header: {
          class: Header,
          config: {
            placeholder: 'Write a heading',
            levels: [1, 2, 3, 4],
            defaultLevel: 2,
          },
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: 'Quote caption',
          },
        },
        image: {
          class: SimpleImage,
          class: SimpleImage,
          inlineToolbar: ['link'],
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered',
          },
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: '/api/v1/fetchUrl',
            headers: {
              Authorization: 'Bearer ${env.TOKEN_SECRET}',
            },
          },
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              instagram: true,
              twitter: true,
              codepen: true,
            },
          },
        },
        warning: {
          class: Warning,
          config: {
            titlePlaceholder: 'Title',
            messagePlaceholder: 'Message',
          },
        },
        code: {
          class: CodeTool,
          placeholder: 'Paste your code here...',
        },
        inlineCode: {
          inlineToolbar: true,
          class: InlineCode,
        },
      },
    });

    if (editor.isReady) {
      console.log('Editor loaded successfully');
      // editor.configuration.data = { blocks: [{ type: 'paragraph', data: { text: 'para' } }] };
    } else {
      console.error('Failed to load the editor');

      // Do some logic here if needed in UI.
    }
  </script>`;
