module.exports = {
  env: {
    browser: true,
    es2021: true,
    jasmine: true,
    'codeceptjs/codeceptjs': true,
  },
  plugins: [
    'jasmine',
    'codeceptjs',
  ],
  extends: [
    'standard',
    'plugin:jasmine/recommended',
    'plugin:codeceptjs/recommended',
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    semi: ['error', 'always'],
    'codeceptjs/no-pause-in-scenario': 'off',
  },
};
