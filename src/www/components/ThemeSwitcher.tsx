import { html } from 'hono/html';

const ThemeSwitcher = () => {
  return (
    <>
      <button
        type='button'
        id='dark-mode-button'
        class='hs-dark-mode-active:hidden hs-dark-mode block rounded-full font-medium text-gray-800 hover:bg-gray-300 focus:bg-gray-200 focus:outline-none dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800'
        data-hs-theme-click-value='dark'
      >
        <span class='group inline-flex size-9 shrink-0 items-center justify-center'>
          <svg
            class='size-4 shrink-0'
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
            <path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z'></path>
          </svg>
        </span>
      </button>

      <button
        type='button'
        id='light-mode-button'
        class='hs-dark-mode-active:block hs-dark-mode hidden rounded-full font-medium text-gray-800 focus:bg-gray-200 focus:outline-none dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800'
        data-hs-theme-click-value='light'
      >
        <span class='group inline-flex size-9 shrink-0 items-center justify-center'>
          <svg
            class='size-4 shrink-0'
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
            <circle cx='12' cy='12' r='4'></circle>
            <path d='M12 2v2'></path>
            <path d='M12 20v2'></path>
            <path d='m4.93 4.93 1.41 1.41'></path>
            <path d='m17.66 17.66 1.41 1.41'></path>
            <path d='M2 12h2'></path>
            <path d='M20 12h2'></path>
            <path d='m6.34 17.66-1.41 1.41'></path>
            <path d='m19.07 4.93-1.41 1.41'></path>
          </svg>
        </span>
      </button>

      {html`
        <script>
          const darkModeButton = document.getElementById('dark-mode-button');
          const lightModeButton = document.getElementById('light-mode-button');

          const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
          const storedTheme = localStorage.getItem('theme');
          const theme = storedTheme || (prefersDarkScheme ? 'dark' : 'light');

          if (theme === 'dark') {
            darkModeButton.classList.add('hidden');
            lightModeButton.classList.remove('hidden');
          } else {
            darkModeButton.classList.remove('hidden');
            lightModeButton.classList.add('hidden');
          }

          darkModeButton.addEventListener('click', () => {
            document.documentElement.className = 'dark';
            localStorage.setItem('theme', 'dark');
            darkModeButton.classList.add('hidden');
            lightModeButton.classList.remove('hidden');
          });

          lightModeButton.addEventListener('click', () => {
            document.documentElement.className = 'light';
            localStorage.setItem('theme', 'light');
            darkModeButton.classList.remove('hidden');
            lightModeButton.classList.add('hidden');
          });
        </script>
      `}
    </>
  );
};

export default ThemeSwitcher;
