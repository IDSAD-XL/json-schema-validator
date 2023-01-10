module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:sonarjs/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'sonarjs'],
  ignorePatterns: [".eslintrc.js", "webpack.config.js", "/dist/"],
  rules: {
    "no-case-declarations": "0"
  },
  settings: {
    react: {
      version: "detect", // React version. "detect" automatically picks the version you have installed.
    },
  }
}
