import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/fumadocs-ui/dist/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        'neutral-50': '#fafafa',
        'neutral-100': '#f5f5f5',
        'neutral-200': '#e7e7e7',
        'neutral-300': '#d1d1d1',
        'neutral-400': '#b0b0b0',
        'neutral-500': '#888888',
        'neutral-600': '#666666',
        'neutral-700': '#424242',
        'neutral-800': '#212121',
        'neutral-900': '#121212',
      },
    },
  },
  plugins: [],
};

export default config;
