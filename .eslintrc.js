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
  },
  extends: [
    'eslint:recommended', // Recommended ESLint rules
    'plugin:react/recommended', // React-specific linting rules
    'plugin:prettier/recommended', // Prettier plugin integration
  ],

  plugins: ['react', 'prettier', 'jsx'],
  settings: {
    react: {
      version: 'detect', // Automatically detects the React version
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
};
