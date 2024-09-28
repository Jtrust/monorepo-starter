module.exports = {
    parser: "@typescript-eslint/parser", // typescript解析器
    extends: [
        "@ecomfe/eslint-config",
        "@ecomfe/eslint-config/import",
        "@ecomfe/eslint-config/react",
        "@ecomfe/eslint-config/typescript",
    ],
    plugins: [
        "@typescript-eslint", // 增加一些typescript语法检查
        "react", // react语法检查
        "react-hooks", // hooks语法检查
    ],
    rules: {
        // 禁止行尾多余的空格
        "no-trailing-spaces": "error",
        // 检查函数括号前的空格
        "space-before-function-paren": ["error", "always"],
        // 强制 JSX 属性之间的空格
        "react/jsx-curly-spacing": ["error", "never"],
        // 确保 JSX 标签之间的空格
        "react/jsx-tag-spacing": ["error", { beforeSelfClosing: "always" }],
        // 键值对之间的空格
        "key-spacing": ["error", { beforeColon: false, afterColon: true }],
        "no-multi-spaces": "error",
        "space-infix-ops": "error",
        indent: ["error", 4, { SwitchCase: 1 }], // 强制4格风格
        "no-unused-vars": "off", // 关掉eslint no-unused-vars默认配置
        "@typescript-eslint/no-unused-vars": [
            "warn",
            {
                vars: "all",
                args: "after-used",
                ignoreRestSiblings: false,
            },
        ], // 使用@typescript-eslint/no-unused-vars配置
        "import/no-unresolved": "off",
        "react/jsx-uses-react": 2, // 屏蔽'React' is defined but never used错误
        "import/order": "off", // 不需要引入顺序验证
        "comma-dangle": ["error", "never"], // 不允许最后多余的逗号
        "@typescript-eslint/consistent-type-definitions": [
            "error",
            "interface",
        ], // 优先使用 interface 而不是 type
        "react-hooks/rules-of-hooks": "error", // 检查Hook的规则
        "react-hooks/exhaustive-deps": "warn", // 检查effect的依赖
        "max-params": ["warn", 8], // 方法最多8个参数
        "react/jsx-no-bind": [
            "warn",
            {
                allowArrowFunctions: true, // 暂且允许箭头函数，来提升代码可读性
            },
        ],
        "react/no-unknown-property": [
            "error",
            {
                ignore: [
                    "css",
                    "webkit-playsinline",
                    "x5-playsinline",
                    "x5-video-player-fullscreen",
                    "x5-video-player-type",
                ],
            },
        ],
        "max-nested-callbacks": ["warn", 4], // 循环最多4层，超过4层警告
        "react/require-default-props": "off", // 组件的非必填属性不要求一定有默认值
        "react/no-find-dom-node": "off", // 暂且允许使用react-dom的findDOMNode方法
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": [
            "error",
            { functions: false, variables: false },
        ], // 注意：方法和变量可以在使用之后定义！为了解决hooks中经常会出现的循环依赖的问题，不过要注意危险
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                "": "never",
                jsx: "never",
                js: "never",
                ts: "never",
                tsx: "never",
            },
        ],
        "@typescript-eslint/no-require-imports": 0,
    },
    parserOptions: {
        project: ["./packages/**/tsconfig.json"],
    },
};
