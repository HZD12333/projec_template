module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', 'simple-import-sort'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            {
                allowConstantExport: true
            },
        ],
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'semi': [2, 'always'],
        'key-spacing': 1,
        'no-console': 0,
        'no-debugger': 1,
        'no-var': 2,
        'quotes': [1, 'single'], //引号类型 `` '' ''
        'no-alert': 2,
        'no-redeclare': 2, //禁止重复声明变量
        'space-in-parens': 2, // 强制在圆括号内使用一致的空格
        'space-infix-ops': 2, // 要求操作符周围有空格
        'space-unary-ops': 2, // 强制在一元操作符前后使用一致的空格
        'switch-colon-spacing': 2, // 强制在 switch 的冒号左右有空格
        'indent': ['error', 4],
        'no-const-assign': 2, //禁止修改const声明的变量
        'no-dupe-keys': 2, //在创建对象字面量时不允许键重复 {a:1,a:1}
        'no-func-assign': 2, //禁止重复的函数声明  
        'no-mixed-spaces-and-tabs': [2, false], //禁止混用tab和空格
        'no-undef': 1, //不能有未定义的变量
        'prefer-const': 0, //首选const
        'prefer-spread': 0, //首选展开运算
        'use-isnan': 2, //禁止比较时使用NaN，只能用isNaN()
        'id-match': 0, //命名检测
        'array-bracket-spacing': ['error', 'always'],
        'space-before-function-paren': 2,
        'object-curly-spacing': ['error', 'always'],
        // 检查 Hooks 的使用规则
        'react-hooks/rules-of-hooks': 'error',
        // 检查依赖项的声明
        'react-hooks/exhaustive-deps': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-explicit-any': ['off'],
        '@typescript-eslint/type-annotation-spacing': [
            'error',
            {
                'before': false,
                'after': true,
                'overrides': {
                    'arrow': {
                        'before': true,
                        'after': true
                    }
                }
            }
        ],
        'block-spacing': [
            'error',
            'always'
        ],
        'space-before-blocks': 'error',
        'space-before-function-paren': [
            'error', {
                'anonymous': 'always',
                'named': 'never',
                'asyncArrow': 'always'
            }
        ]
    },
}