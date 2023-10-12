const react = require('eslint-plugin-react');

module.exports = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          tsx: true,
        },
      },
    },
    rules: {
      'react/button-has-type': 1,
     },
  },
];