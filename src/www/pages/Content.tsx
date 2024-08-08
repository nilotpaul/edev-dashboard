import { Session } from '../../validations/user.validation';
import RootLayout from '../layouts/Root';
import { cn } from '../../utils';
import { z } from 'zod';
import { CreatePost } from '../../validations/post.validation';
import CreatePostForm from '../components/forms/CreatePostForm';

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

      <CreatePostForm />
    </RootLayout>
  );
};

export const CreatePostResponse = ({
  success = false,
  error,
}: {
  error?: string | z.ZodError<CreatePost>;
  success?: boolean;
}) => {
  const err = error && typeof error !== 'string' ? error.flatten().fieldErrors : null;

  return (
    <div
      id='create-post-response'
      class={cn('space-y-2 text-sm font-medium text-red-600', {
        'text-green-600': success,
      })}
    >
      {error && !success && typeof error !== 'string' ? (
        <>
          {err?.title && <p class='text-sm font-medium text-red-600'>Title: {err?.title}</p>}
          {err?.content && <p class='text-sm font-medium text-red-600'>Content: {err?.content}</p>}
        </>
      ) : (
        <p class='text-lg font-medium text-red-600'>{error}</p>
      )}

      {success && <p class='text-lg font-medium text-green-600'>Post Created</p>}
    </div>
  );
};

export default Content;
