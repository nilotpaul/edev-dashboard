import { html } from 'hono/html';

export const textareaAutoResize = () => html`
  <script>
    const textareas = document.querySelectorAll('textarea');
    if (textareas?.length !== 0) autosize(textareas);
  </script>
`;
