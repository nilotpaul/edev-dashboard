import { PropsWithChildren } from 'hono/jsx';
import Brand from './Brand';
import { cn } from '../../utils';
import { getSession } from './context/SessionContext';
import { Session } from '../../validations/user.validation';

const LeftMenu = ({ children, ...props }: PropsWithChildren & { class?: string }) => {
  const session = getSession() as Session;

  return (
    <>
      <div class={cn('py-16 text-center lg:w-64', props.class)}>
        {children ? (
          <div
            class='absolute left-6 top-6'
            aria-haspopup='dialog'
            aria-expanded='false'
            aria-controls='hs-offcanvas-example'
            aria-label='Toggle navigation'
            data-hs-overlay='#hs-offcanvas-example'
          >
            {children}
          </div>
        ) : (
          <button
            type='button'
            class='inline-flex items-center justify-center gap-x-2 rounded-lg border border-gray-800 bg-gray-800 px-3 py-2 text-start align-middle text-sm font-medium text-white shadow-sm hover:bg-gray-950 focus:bg-gray-900 focus:outline-none dark:bg-white dark:text-neutral-800 dark:hover:bg-neutral-200 dark:focus:bg-neutral-200'
            aria-haspopup='dialog'
            aria-expanded='false'
            aria-controls='hs-offcanvas-example'
            aria-label='Toggle navigation'
            data-hs-overlay='#hs-offcanvas-example'
          >
            Open
          </button>
        )}
      </div>

      <div
        id='hs-offcanvas-example'
        class='hs-overlay fixed bottom-0 start-0 top-0 z-[60] hidden w-64 -translate-x-full transform overflow-y-auto border-e border-gray-200 bg-white pb-10 pt-7 transition-all duration-300 [--auto-close:lg] hs-overlay-open:translate-x-0 dark:border-neutral-700 dark:bg-neutral-800 lg:bottom-0 lg:end-auto lg:block lg:translate-x-0 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:w-2'
        role='dialog'
        tabindex={-1}
        aria-label='Sidebar'
      >
        <div class='px-6'>
          <Brand />
        </div>
        <nav
          class='hs-accordion-group flex w-full flex-col flex-wrap p-6'
          data-hs-accordion-always-open
        >
          <ul class='h-full space-y-1.5'>
            {session.role === 'superuser' && (
              <li>
                <a
                  class='flex items-center gap-x-3.5 rounded-lg bg-gray-100 px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:bg-neutral-700 dark:text-white'
                  href='/users'
                  hx-boost='true'
                >
                  <svg
                    class='size-4'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  >
                    <path d='m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
                    <polyline points='9 22 9 12 15 12 15 22' />
                  </svg>
                  Users
                </a>
              </li>
            )}

            <li>
              <a
                class='flex items-center gap-x-3.5 rounded-lg bg-gray-100 px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:bg-neutral-700 dark:text-white'
                href='/content'
                // Don't use boost here as doing this wont load any required scripts.
                // hx-boost='true'
              >
                <svg
                  class='size-4'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                >
                  <path d='m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
                  <polyline points='9 22 9 12 15 12 15 22' />
                </svg>
                Content
              </a>
            </li>
            <li>
              <a
                class='flex items-center gap-x-3.5 rounded-lg bg-gray-100 px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:bg-neutral-700 dark:text-white'
                href='/posts'
                hx-boost='true'
              >
                <svg
                  class='size-4'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                >
                  <path d='m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
                  <polyline points='9 22 9 12 15 12 15 22' />
                </svg>
                Posts
              </a>
            </li>

            <li class='pt-6'>
              <button
                hx-post='/api/v1/user/logout'
                hx-swap='none'
                type='button'
                class='inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700'
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default LeftMenu;
