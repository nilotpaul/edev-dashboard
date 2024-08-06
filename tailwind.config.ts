import { Config } from 'tailwindcss';

export default {
  content: ['./src/www/**/*.{html,js,jsx,ts,tsx,md,mdx}', 'node_modules/preline/dist/*.js'],
  darkMode: 'class',
  theme: {},
  plugins: [require('preline/plugin'), require('@tailwindcss/forms')],
} satisfies Config;
