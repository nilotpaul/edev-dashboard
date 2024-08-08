import { z } from 'zod';
import { CreateUser } from '../../../validations/user.validation';
import FormFieldError from '../FormError';

type Props = {
  error?: z.ZodError<CreateUser> | string;
  successMessage?: string;
};

const CreateUserForm = ({ error, successMessage }: Props) => {
  const err = error && typeof error !== 'string' ? error.flatten().fieldErrors : null;

  return (
    <form
      hx-post='/api/v1/user/create'
      hx-target='this'
      hx-swap='outerHTML'
      hx-indicator='#create-user-form-loader'
      class='mt-6 max-w-md space-y-4'
    >
      <div>
        <label for='create-username' class='mb-2 block text-sm font-medium dark:text-white'>
          Username
        </label>
        <input
          type='username'
          name='username'
          id='create-username'
          aria-describedby='username-error'
          class='peer block w-full rounded-lg border-transparent bg-gray-100 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-transparent dark:bg-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
          placeholder='Enter username'
        />

        <FormFieldError fieldError={err?.username} fieldName='username' />
      </div>

      <div>
        <label for='create-email' class='mb-2 block text-sm font-medium dark:text-white'>
          Email
        </label>
        <input
          type='email'
          name='email'
          id='create-email'
          aria-describedby='email-error'
          class='peer block w-full rounded-lg border-transparent bg-gray-100 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-transparent dark:bg-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
          placeholder='Enter email'
        />

        <FormFieldError fieldError={err?.email} fieldName='email' />
      </div>

      <div>
        <label for='create-password' class='mb-2 block text-sm font-medium dark:text-white'>
          Password
        </label>
        <input
          type='password'
          name='password'
          id='create-Password'
          aria-describedby='password-error'
          class='peer block w-full rounded-lg border-transparent bg-gray-100 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-transparent dark:bg-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
          placeholder='Enter password'
        />

        <FormFieldError fieldError={err?.password} fieldName='password' />
      </div>

      <div>
        <label for='create-type' class='mb-2 block text-sm font-medium dark:text-white'>
          Role
        </label>
        <select
          name='role'
          class='block w-full rounded-lg border-transparent bg-gray-100 px-4 py-3 pe-9 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-transparent dark:bg-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600'
        >
          <option value='superuser'>Superuser</option>
          <option value='admin' selected>
            Admin
          </option>
        </select>

        <FormFieldError fieldError={err?.role} fieldName='role' />
      </div>

      <button
        type='submit'
        class='mx-auto inline-flex w-full items-center justify-center gap-2 gap-x-2 rounded-lg border border-transparent bg-gray-800 px-4 py-3 text-center text-sm font-medium text-white hover:bg-gray-900 focus:bg-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-white dark:text-neutral-800'
      >
        Create User
        <div
          id='create-user-form-loader'
          class='htmx-indicator inline-block size-4 animate-spin rounded-full border-[3px] border-current border-t-transparent text-blue-600 dark:text-blue-500'
          role='status'
          aria-label='loading'
        >
          <span class='sr-only'>Loading...</span>
        </div>
      </button>

      {error && typeof error === 'string' && <p class='text-red-500'>{error}</p>}

      {successMessage && <p class='text-green-600'>{successMessage}</p>}
    </form>
  );
};

export default CreateUserForm;
