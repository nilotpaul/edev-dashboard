import { html } from 'hono/html';

export const getInitialThemeScript = () => html`
  <script>
    (function () {
      const storedTheme = localStorage.getItem('theme');
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = storedTheme || (prefersDarkScheme ? 'dark' : 'light');
      if (!storedTheme) {
        localStorage.setItem('theme', theme);
      }
      document.documentElement.className = theme;
    })();
  </script>
`;
