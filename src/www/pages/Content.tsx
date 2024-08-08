import { html } from 'hono/html';
import { Session } from '../../validations/user.validation';
import RootLayout from '../layouts/Root';
import { env } from '../../validations/env';
import { cn } from '../../utils';
import { z } from 'zod';
import { CreatePost } from '../../validations/post.validation';

const Content = ({ session }: { session: Session }) => {
  return (
    <RootLayout session={session}>
      <script src='https://cdn.jsdelivr.net/npm/@editorjs/editorjs@latest'></script>
      <script src='https://cdn.jsdelivr.net/npm/@editorjs/header@latest'></script>
      <script src='https://cdn.jsdelivr.net/npm/@editorjs/quote@2.6.0/dist/quote.umd.min.js'></script>
      <script src='https://cdn.jsdelivr.net/npm/@editorjs/simple-image'></script>
      <script src='https://cdn.jsdelivr.net/npm/@editorjs/list@latest'></script>
      <script src='https://cdn.jsdelivr.net/npm/@editorjs/checklist@latest'></script>
      <script src='https://cdn.jsdelivr.net/npm/@editorjs/link@latest'></script>
      <script src='https://cdn.jsdelivr.net/npm/@editorjs/embed@latest'></script>
      <script src='https://cdn.jsdelivr.net/npm/@editorjs/warning@latest'></script>
      <script src='https://cdn.jsdelivr.net/npm/@editorjs/code@latest'></script>
      <script src='https://cdn.jsdelivr.net/npm/@editorjs/inline-code@latest'></script>
      <script src='https://cdn.jsdelivr.net/npm/editorjs-undo'></script>

      <form
        id='create-post-form'
        hx-on-submit={`
          event.preventDefault();
          const formData = new FormData(event.target);
            editor.save().then((v) => {
              formData.append('content', JSON.stringify(v?.blocks || []));
              htmx.ajax('POST', '/api/v1/posts/create', {
                values: formData,
                target: '#create-post-response',
                indicator: '#create-post-from-loader',
              })
            }); 
        `}
        class='prose prose-stone mx-auto flex flex-col justify-between space-y-6 dark:prose-invert'
      >
        <div>
          <label for='textarea-title' class='mb-2 pb-1.5 text-lg font-semibold text-blue-500'>
            Post Title
          </label>
          <textarea
            autofocus
            name='title'
            id='textarea-title'
            class='mt-4 block w-full rounded-lg border-0 px-4 py-3 text-lg font-bold disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500'
            rows={1.5}
            placeholder='Enter post title'
          />
        </div>

        <div class='h-full'>
          <label for='editorjs' class='pb-1.5 text-lg font-semibold text-blue-500'>
            Write Content
          </label>
          <div id='editorjs' class='mt-4 min-h-[480px] pl-3' />
        </div>

        <div id='create-post-response' />

        <button
          type='submit'
          class='mx-auto inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-teal-100 px-4 py-3 text-center text-sm font-medium text-teal-800 hover:bg-teal-200 focus:bg-teal-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-teal-800/30 dark:text-teal-500 dark:hover:bg-teal-800/20 dark:focus:bg-teal-800/20'
        >
          Submit
          <div
            id='create-post-from-loader'
            class='htmx-indicator inline-block size-4 animate-spin rounded-full border-[3px] border-current border-t-transparent text-blue-600 dark:text-blue-500'
            role='status'
            aria-label='loading'
          >
            <span class='sr-only'>Loading...</span>
          </div>
        </button>
      </form>

      {html`
        <script>
          const editor = new EditorJS({
            holder: 'editorjs',
            placeholder: 'Write content here...',
            inlineToolbar: true,
            data: { blocks: [] },

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
          } else {
            console.error('Failed to load the editor');

            // Do some logic here if needed in UI.
          }
        </script>
      `}
    </RootLayout>
  );
};

export const createPostResponse = ({
  successMessage,
  error,
}: {
  error?: string | z.ZodError<CreatePost>;
  successMessage?: string;
}) => {
  const err = error && typeof error !== 'string' ? error.flatten().fieldErrors : null;

  return (
    <div
      class={cn('space-y-2 text-sm font-medium text-red-600', {
        'text-green-600': successMessage,
      })}
    >
      {error && !successMessage && typeof error !== 'string' ? (
        <>
          {err?.title && <p class='text-sm font-medium text-red-600'>Title: {err?.title}</p>}
          {err?.content && <p class='text-sm font-medium text-red-600'>Content: {err?.content}</p>}
        </>
      ) : (
        <p class='text-lg font-medium text-red-600'>{error}</p>
      )}

      {successMessage && <p class='text-lg font-medium text-green-600'>{successMessage}</p>}
    </div>
  );
};

export default Content;
