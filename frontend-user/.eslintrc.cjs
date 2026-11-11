module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  ignorePatterns: ['dist/', 'node_modules/'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react-refresh'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-refresh/only-export-components': 'off',
  },
};
