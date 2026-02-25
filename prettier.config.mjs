/** @type {import("prettier").Config} */
export default {
  // 箭头函数参数始终使用括号
  arrowParens: 'avoid',

  // 多行 JSX 中 > 不放在最后一行末尾
  bracketSameLine: false,

  // 对象括号内不加空格 {foo: bar}
  bracketSpacing: false,

  // 使用单引号
  singleQuote: true,

  // 尾逗号（ES5 兼容的地方添加）
  trailingComma: 'all',

  // 空格缩进
  tabWidth: 2,

  // 不使用分号
  semi: false,

  // 每行最大字符数
  printWidth: 100,

  // 使用空格而非 Tab
  useTabs: false,

  // JSX 使用单引号
  jsxSingleQuote: false,

  // 换行符
  endOfLine: 'lf',
}
