module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:@next/next/recommended',
  ],
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
    indent: [2, 2],
    'eol-last': 'error',
    'space-in-parens': ['warn', 'always'],
    'brace-style': 1,
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'import/extensions': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'no-console': 'off',
    'arrow-body-style': 'off',
    'import/prefer-default-export': 'off',
    semi: ['warn', 'never'],
  },
}
