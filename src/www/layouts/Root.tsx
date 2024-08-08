import { Child, FC } from 'hono/jsx';
import { getInitialThemeScript } from '../../../scripts/custom/theme';
import { html } from 'hono/html';
import { env } from '../../validations/env';
import LeftMenu from '../components/LeftMenu';
import { SessionContextProvider } from '../components/context/SessionContext';
import { Session } from '../../validations/user.validation';
import Header from '../components/Header';
import { Icons } from '../components/Icons';
import { textareaAutoResize } from '../../../scripts/custom/textarea-auto-size';

type PropsInIndexMode = {
  children?: Child;
  index?: true;
  session: Session;
};

type PropsNotInIndexMode = {
  children?: Child;
  index: false;
  session: Session | null;
};

type Props = PropsInIndexMode | PropsNotInIndexMode;

const RootLayout: FC<Props> = ({ children, index = true, session }) => {
  return (
    <html lang='en'>
      <head>
        <meta charset='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>EDev Dashboard</title>
        <link href='/public/assets/output.css' rel='stylesheet' />

        <script src='https://cdnjs.cloudflare.com/ajax/libs/htmx/2.0.1/htmx.min.js'></script>
        <script src='https://cdn.jsdelivr.net/npm/preline/dist/preline.min.js'></script>
        <script src='https://cdn.jsdelivr.net/npm/autosize@6.0.1/dist/autosize.min.js'></script>

        {getInitialThemeScript()}
        {html`
          <script>
            document.addEventListener('htmx:configRequest', (e) => {
              // Add the token to the request headers
              e.detail.headers['Authorization'] = 'Bearer ${env.TOKEN_SECRET}';
            });
          </script>
        `}
        {html`
          <script>
            document.addEventListener('htmx:beforeSwap', function (e) {
              const status = e.detail.xhr.status;
              const res = JSON.parse(e.detail.xhr.response || '{}');
              console.error(res);
              if (status !== 200) {
                alert(res?.error || 'Some Error happend');
              }
            });
          </script>
        `}
      </head>
      <body class='w-full text-black dark:bg-[#171717] dark:text-white'>
        {index && session ? (
          <SessionContextProvider session={session}>
            <div class='flex gap-8'>
              <LeftMenu class='hidden lg:block' />
              <LeftMenu class='lg:hidden'>
                <Icons.Menu class='h-6 w-6' />
              </LeftMenu>

              <main class='min-h-screen w-full max-w-full px-6 antialiased'>
                <div class='mt-6'>
                  <Header />
                  {children}
                </div>
              </main>
            </div>
          </SessionContextProvider>
        ) : (
          <main class='min-h-screen w-full max-w-full px-6 antialiased'>{children}</main>
        )}
      </body>

      {textareaAutoResize()}
    </html>
  );
};

export default RootLayout;
