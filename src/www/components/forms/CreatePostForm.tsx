import { editorJs } from '../../../../scripts/custom/editor';

import { CreatePostResponse } from '../../pages/Content';

type Props = {
  initialData?: {
    title: string;
    blocks: any[];
  };
};

const CreatePostForm = ({
  initialData = {
    blocks: [],
    title: '',
  },
}: Props) => {
  return (
    <>
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
                swap: 'outerHTML',
                indicator: '#create-post-from-loader',
              })
            }); 
        `}
        hx-on--before-swap='
         const res = event.detail.xhr.response;
         const parser = new DOMParser();
         const doc = parser.parseFromString(res, "text/html");
         const outerDiv = doc.querySelector("div");
         const isError = outerDiv.classList.contains("text-red-600")
         if (!isError) {
           this.reset();
           editor.clear();
         }
        '
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
          >
            {initialData.title}
          </textarea>
        </div>

        <div class='h-full'>
          <label for='editorjs' class='pb-1.5 text-lg font-semibold text-blue-500'>
            Write Content
          </label>
          <div id='editorjs' class='mt-4 min-h-[480px] pl-3' />
        </div>

        <CreatePostResponse />

        <div class='flex items-center gap-2'>
          <button
            type='button'
            class='mx-auto inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-center text-sm font-medium text-teal-500 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700'
          >
            Save as Draft
          </button>
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
        </div>
      </form>

      {editorJs()}
    </>
  );
};

export default CreatePostForm;
