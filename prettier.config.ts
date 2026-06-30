import type { Config } from 'prettier';

const config: Config = {
  tabWidth: 2,
  printWidth: 100,
  endOfLine: 'auto',
  arrowParens: 'always',
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  bracketSameLine: true,
  excludedFiles: ['**/dist/**', '**/build/**', '**/node_modules/**', '**/public/**', '**/.next/**'],
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
