module.exports = {
  extends: [
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
  ],
  plugins: ["react", "@typescript-eslint", "jest"],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  // globals: {
  //   Atomics: "readonly",
  //   SharedArrayBuffer: "readonly",
  // },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    // ecmaFeatures: {
    //   jsx: true,
    // },
    // ecmaVersion: "es6",
    // sourceType: "module",
    project: "./tsconfig.json",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    "linebreak-style": "off",
    "react/jsx-filename-extension": "off",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-closing-bracket-location": "off",
    "react/jsx-wrap-multilines": "off",
    "react/jsx-props-no-spreading": "off",
    "react/require-default-props": "off",
    "import/no-named-as-default": "off",
    "operator-linebreak": "off",
    "no-multiple-empty-lines": [2, { max: 1, maxEOF: 1 }],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/quotes": [2, "double"],
    "@typescript-eslint/no-unused-vars": "error",
    "arrow-body-style": "error",
    "implicit-arrow-linebreak": "off",
    "function-paren-newline": "off",
    "object-curly-newline": "off",
    "@typescript-eslint/ban-types": "off",
    '@typescript-eslint/indent': "off",
    "@typescript-eslint/comma-dangle": "error",
    "@typescript-eslint/no-unused-expressions": "off"
  },
  overrides: [
    {
      files: ["**/type.d.ts"],
      "rules": {
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-empty-interface": "off"
      }
    }
  ]
};
