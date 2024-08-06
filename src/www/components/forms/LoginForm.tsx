import { z } from 'zod';
import { Login } from '../../../validations/user.validation';
import FormFieldError from '../FormError';
import { Icons } from '../Icons';

type Props = {
  error?: z.ZodError<Login> | string;
  successMessage?: string;
};

const LoginForm = ({ error, successMessage }: Props = {}) => {
  const err = error && typeof error !== 'string' ? error.flatten().fieldErrors : null;

  return (
    <form class='space-y-4' hx-post='/api/v1/user/login' hx-target='this'>
      <h1 class='mx-auto w-full pb-2 text-center text-2xl font-bold text-black dark:text-white'>
        Login to EDev Dashboard
      </h1>

      <div class='max-w-sm space-y-3'>
        <div>
          <label for='login-email' class='mb-2 block text-sm font-medium dark:text-white'>
            Email
          </label>
          <div class='relative'>
            <input
              type='email'
              name='email'
              id='login-email'
              aria-describedby='email-error'
              class='peer block w-full rounded-lg border-transparent bg-gray-100 px-4 py-3 ps-11 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-transparent dark:bg-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
              placeholder='Enter email'
            />
            <div class='pointer-events-none absolute inset-y-0 start-0 top-1/2 flex -translate-y-1/2 items-center ps-2 peer-disabled:pointer-events-none peer-disabled:opacity-50'>
              <Icons.Email />
            </div>
          </div>

          <FormFieldError fieldError={err?.email} fieldName='email' />
        </div>

        <div>
          <label for='login-password' class='mb-2 block text-sm font-medium dark:text-white'>
            Password
          </label>

          <div class='relative'>
            <input
              type='password'
              name='password'
              id='login-password'
              aria-describedby='password-error'
              class='peer block w-full rounded-lg border-transparent bg-gray-100 px-4 py-3 ps-11 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-transparent dark:bg-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
              placeholder='Enter password'
            />

            <div class='pointer-events-none absolute inset-y-0 start-0 flex items-center ps-2 peer-disabled:pointer-events-none peer-disabled:opacity-50'>
              <Icons.Key />
            </div>
          </div>
        </div>

        <FormFieldError fieldError={err?.password} fieldName='password' />
      </div>

      <button
        type='submit'
        class='mx-auto inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-gray-800 px-4 py-3 text-center text-sm font-medium text-white hover:bg-gray-900 focus:bg-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-white dark:text-neutral-800'
      >
        Login
      </button>

      {error && typeof error === 'string' ? <p class='text-red-500'>{error}</p> : null}

      {successMessage && <p class='text-green-600'>{successMessage}</p>}
    </form>
  );
};

export default LoginForm;
