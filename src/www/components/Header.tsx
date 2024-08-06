import { Session } from '../../validations/user.validation';
import { getSession } from './context/SessionContext';
import ThemeSwitcher from './ThemeSwitcher';
import User from './User';

const Header = () => {
  const session = getSession() as Session;

  return (
    <nav class='my-3 mb-8 flex w-full items-center justify-between gap-3'>
      <div class='ml-auto flex items-center gap-6'>
        <div class='max-w-sm'>
          <label for='input-email-label' class='sr-only'>
            Email
          </label>
          <input
            type='email'
            id='input-email-label'
            class='block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600'
            placeholder='Search...'
          />
        </div>

        <ThemeSwitcher />

        <User {...session} />
      </div>
    </nav>
  );
};

export default Header;
