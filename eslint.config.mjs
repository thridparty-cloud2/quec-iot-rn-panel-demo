import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import reactNativePlugin from 'eslint-plugin-react-native'
import prettierPlugin from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'
import globals from 'globals'

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 忽略文件
  {
    ignores: [
      'node_modules/**',
      'lib/**',
      'out/**',
      'android/**',
      'ios/**',
      '.configs/**',
      'scripts/**',
      'metro.config.js',
      'babel.config.js',
      '*.config.js',
      '*.config.mjs',
    ],
  },

  // 基础 JavaScript 推荐配置
  js.configs.recommended,

  // TypeScript 配置
  ...tseslint.configs.recommended,

  // React 配置
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-native': reactNativePlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
        // React Native 全局变量
        __DEV__: 'readonly',
        global: 'readonly',
        fetch: 'readonly',
        FormData: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        setImmediate: 'readonly',
        clearImmediate: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // ============================================
      // Prettier 集成
      // ============================================
      'prettier/prettier': 'warn',

      // ============================================
      // React 规则
      // ============================================
      'react/react-in-jsx-scope': 'off', // React 17+ 不需要
      'react/jsx-key': 'error', // 列表元素需要 key
      'react/jsx-no-duplicate-props': 'error', // 禁止重复 props
      'react/jsx-no-undef': 'error', // JSX 中禁止未定义的变量
      'react/jsx-uses-react': 'off', // React 17+ 不需要
      'react/jsx-uses-vars': 'error', // 标记 JSX 中使用的变量
      'react/prop-types': 'off', // 使用 TypeScript 类型代替
      'react/jsx-curly-spacing': ['error', { when: 'never', children: true }],
      'react/jsx-equals-spacing': 'error',
      'react/jsx-closing-bracket-location': ['warn', 'tag-aligned'],

      // ============================================
      // React Hooks 规则
      // ============================================
      'react-hooks/rules-of-hooks': 'error', // Hooks 调用规则
      'react-hooks/exhaustive-deps': 'off', // 依赖数组检查

      // ============================================
      // React Native 规则
      // ============================================
      'react-native/no-unused-styles': 'warn', // 未使用的样式警告
      'react-native/split-platform-components': 'off',
      'react-native/no-inline-styles': 'off', // 允许内联样式
      'react-native/no-color-literals': 'off',
      'react-native/no-raw-text': 'off',

      // ============================================
      // TypeScript 规则
      // ============================================
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off', // 允许 any 类型
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-require-imports': 'off', // 允许 require
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      "@typescript-eslint/no-unsafe-function-type": "off",

      // ============================================
      // 代码质量规则
      // ============================================
      'no-redeclare': 'error', // 禁止重复声明
      'no-const-assign': 'error', // 禁止修改 const
      'no-cond-assign': 'error', // 禁止条件赋值
      'no-func-assign': 'error', // 禁止重复函数声明
      eqeqeq: ['warn', 'smart'], // 建议使用 ===
      'no-useless-catch': 'off',
      'no-extend-native': [
        'error',
        { exceptions: ['Object', 'Number', 'String'] },
      ],

      // ============================================
      // 代码风格规则（Prettier 处理的这里关闭）
      // ============================================
      semi: 'off', // 由 Prettier 处理
      'no-mixed-spaces-and-tabs': 'error',
      'arrow-spacing': ['error', { before: true, after: true }],
      'comma-spacing': ['error', { before: false, after: true }],
      'space-infix-ops': 'error',
      'newline-per-chained-call': ['error', { ignoreChainWithDepth: 4 }],
      'no-bitwise': 'off', // 允许位运算
    },
  },

  // Prettier 兼容配置
  eslintConfigPrettier,
]
