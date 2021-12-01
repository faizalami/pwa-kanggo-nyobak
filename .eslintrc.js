module.exports = {
  env: {
    browser: true,
    es2021: true,
    jasmine: true,
  },
  plugins: [
    'jasmine',
  ],
  extends: [
    'standard',
    'plugin:jasmine/recommended',
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    semi: ['error', 'always'],
  },
};
