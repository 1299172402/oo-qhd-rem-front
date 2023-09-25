module.exports = {
  extends: ["stylelint-config-prettier", "stylelint-config-standard", "stylelint-config-standard-vue"],
  plugins: ["stylelint-prettier"],
  overrides: [
    {
      "files": ["**/*.html", "**/*.vue"],
      "customSyntax": "postcss-html"
    },
    {
      "files": "**/*.less",
      "customSyntax": "postcss-less"
    }
  ],
  ignoreFiles: ["**/*.js", "**/*.jsx", "**/*.tsx", "**/*.ts", "**/*.json"],
  rules: {
    // 颜色指定大写
    "color-hex-case": "lower",
    // 禁止空块
    "block-no-empty": true,
    // 颜色6位长度
    "color-hex-length": "short",
    // 兼容自定义标签名
    "selector-type-no-unknown": [true, {
      "ignoreTypes": []
    }],
    // 忽略伪类选择器 ::v-deep
    "selector-pseudo-element-no-unknown": [true, {
      "ignorePseudoElements": ["v-deep"]
    }],
    // 禁止低优先级的选择器出现在高优先级的选择器之后。
    "no-descending-specificity": null,
    // 不验证@未知的名字，为了兼容scss的函数
    "at-rule-no-unknown": null,
    // 禁止空注释
    "comment-no-empty": true,
    // 禁止简写属性的冗余值
    "shorthand-property-no-redundant-values": true,
    // 禁止值的浏览器引擎前缀
    "value-no-vendor-prefix": true,
    // property-no-vendor-prefix
    "property-no-vendor-prefix": true,
    // 禁止空第一行
    "no-empty-first-line": true,
    // 命名规范 -
    "selector-class-pattern": null,
    "at-rule-empty-line-before": null,
    "at-rule-no-unknown": null,
    "at-rule-name-case": "lower",// 指定@规则名的大小写
    "length-zero-no-unit": true,  // 禁止零长度的单位（可自动修复）
    "shorthand-property-no-redundant-values": true, // 简写属性
    "number-leading-zero": "always", // 小数不带0
    "declaration-block-no-duplicate-properties": true, // 禁止声明快重复属性
    "no-descending-specificity": true, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器。
    "selector-max-id": 0, // 限制一个选择器中 ID 选择器的数量
    "max-nesting-depth": 6,
    "indentation": [2, {  // 指定缩进  warning 提醒
      "severity": "warning"
    }],
    "no-empty-source": null,
    "import-notation": null,
    "alpha-value-notation": null,
    "color-function-notation": "legacy",
    "font-family-no-missing-generic-family-keyword": null,
    "no-descending-specificity": null,
    "declaration-block-semicolon-space-after": "always-single-line",
    "declaration-colon-space-after": "always",
    "declaration-colon-newline-after": null
  }
};
