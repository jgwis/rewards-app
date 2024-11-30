module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 2021,
    sourceType: 'module',
    presets: ['@babel/preset-react'],
    ecmaFeatures: {
      jsx: true, // Enable JSX parsing
    },
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'eslint:recommended', // Recommended ESLint rules
    'plugin:react/recommended', // React-specific linting rules
    'plugin:prettier/recommended', // Prettier plugin integration
  ],

  plugins: ['react', 'prettier', 'jsx', 'jest'],
  settings: {
    react: {
      version: 'detect', // Automatically detects the React version
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-duplicate-hooks': 'error',
  },
};
