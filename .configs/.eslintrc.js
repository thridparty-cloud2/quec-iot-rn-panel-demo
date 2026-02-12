module.exports = {
    root: true,
    extends: ['eslint:recommended', '@react-native-community'],
    rules: {
        'prettier/prettier': 'warn',
        'react-hooks/exhaustive-deps': 'off',
        'react-native/no-inline-styles': 'off',
        'react/jsx-indent-props': [0, 4], // 验证JSX中的props缩进
        semi: 0,
        // 'newline-per-chained-call': ['error', { ignoreChainWithDepth: 4 }], // 要求方法链中调用有一个换行符
        '@typescript-eslint/no-unused-vars': ['warn'], //未使用变量警告
        'no-redeclare': 2, //禁止重复声明变量
        'no-undef': 2, //不能有未定义的变量
        'react/jsx-key': 2, //在数组或迭代器中验证JSX具有key属性
        'no-cond-assign': 2, //禁止在条件表达式中使用赋值语句
        'no-const-assign': 2, //禁止修改const声明的变量
        'no-func-assign': 2, //禁止重复的函数声明
        'no-bitwise': 0, // 允许使用位运算
        'newline-per-chained-call': ['error', {ignoreChainWithDepth: 4}], // 要求方法链中调用有一个换行符
        'react/jsx-equals-spacing': 2, //在JSX属性中强制或禁止等号周围的空格
        'no-mixed-spaces-and-tabs': 2, //禁止混用tab和空格
        'arrow-spacing': [2, {before: true, after: true}], //箭头函数后面空格
        'comma-spacing': [2, {before: false, after: true}], //禁止在逗号前使用空格，逗号后面添加空格
        'space-infix-ops': 2, //条件句前后空格
        'no-spaced-func': 2, //函数调用时 函数名与()之间不能有空格
        'react/jsx-curly-spacing': [2, {when: 'never', children: true}], //在JSX属性和表达式中加强或禁止大括号内的空格。
        'react/jsx-closing-bracket-location': [1, 'tag-aligned'], //对齐开始标签的 '<' '>'
        'no-extend-native': [
            'error',
            {exceptions: ['Object', 'Number', 'String']},
        ], // 取消在类型原型上添加方法限制
        'no-useless-catch': 'off',
    },
};
