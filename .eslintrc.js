/**
 * ESLint設定ファイル
 * Next.js 15、React 19、TypeScriptに対応
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // TypeScript関連のルール
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    
    // React関連のルール
    'react/react-in-jsx-scope': 'off', // Next.jsでは不要
    'react/prop-types': 'off', // TypeScriptで型チェックするため
    
    // 一般的なルール
    'no-console': 'warn',
    'no-debugger': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    
    // インデントとフォーマット
    'indent': ['error', 2],
    'max-len': ['warn', { code: 80 }],
    
    // 未使用のインポートを削除
    'no-unused-vars': 'off', // TypeScript版を使用
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: [
    'node_modules/',
    '.next/',
    'out/',
    'build/',
    'dist/',
  ],
};
