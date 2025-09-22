import js                   from "@eslint/js";
import globals              from "globals";
import react                from "eslint-plugin-react";
import reactHooks           from "eslint-plugin-react-hooks";
import jsdoc                from "eslint-plugin-jsdoc";
import { defineConfig }     from "eslint/config";


export default defineConfig([
    react.configs.flat.recommended,
    jsdoc.configs["flat/recommended"],
    {
        files : [ "**/*.{js,mjs,cjs,jsx}" ],
        ignores : [ "node_modules/**", "build/**", "public/**" ],
        plugins : { js, react, "react-hooks" : reactHooks, jsdoc },
        extends : [ "js/recommended" ],
        languageOptions : {
            globals : globals.browser,
        },
        settings : {
            react : {
                version : "detect",
            },
        },
        rules : {
            "indent" : [ "error", 4 ],
            "semi" : "error",
            "curly" : "error",
            "eqeqeq" : "error",
            "quotes" : [ "error", "double", { "avoidEscape" : true }],
            "no-caller" : "error",
            "no-extend-native" : "error",
            "no-extra-bind" : "error",
            "no-lone-blocks" : "error",
            "no-loop-func" : "error",
            "no-multi-str" : "error",
            "no-new-func" : "error",
            "no-new-wrappers" : "error",
            "no-new" : "error",
            "no-proto" : "error",
            "no-return-assign" : "error",
            "no-script-url" : "error",
            "no-self-compare" : "error",
            "no-sequences" : "error",
            "no-throw-literal" : "error",
            "no-void" : "error",
            "no-bitwise" : "error",
            "no-var" : "error",
            "prefer-const" : "error",
            "one-var" : [ "error", "never" ],
            "radix" : "error",
            "strict" : "error",
            "no-param-reassign" : [ "error", { "props" : false }],
            "no-unused-vars" : [ "error", { "args" : "none", "ignoreRestSiblings" : true, "caughtErrors" : "none" }],
            "no-unused-expressions" : "error",
            "default-case" : "error",
            "no-case-declarations" : "error",
            "no-else-return" : "error",
            "consistent-return" : "error",
            "dot-notation" : [ "error", { "allowKeywords" : true }],
            "comma-dangle" : [ "error", "always-multiline" ],
            "object-curly-spacing" : [ "error", "always" ],
            "array-bracket-spacing" : [ "error", "always", { "objectsInArrays" : false, "arraysInArrays" : false }],
            "comma-spacing" : [ "error", { "before" : false, "after" : true }],
            "key-spacing" : [ "error", { "beforeColon" : true, "afterColon" : true, "mode" : "minimum" }],
            "arrow-parens" : [ "error", "always" ],
            "no-trailing-spaces" : "error",
            "eol-last" : [ "error", "always" ],
            "no-alert" : "error",
            "no-console" : "error",

            "react/no-unused-state" : "error",
            "react/default-props-match-prop-types" : "error",
            "react/self-closing-comp" : "error",
            "react/style-prop-object" : "error",
            "react/boolean-prop-naming" : "error",
            "react/jsx-pascal-case" : "error",
            "react-hooks/rules-of-hooks" : "error",

            "jsdoc/tag-lines" : "off",
            "jsdoc/reject-function-type" : "off",
            "jsdoc/reject-any-type" : "off",
            "jsdoc/require-property-description" : "off",
            "jsdoc/require-param-description" : "off",
            "jsdoc/require-returns-description" : "off",
        },
    },
]);
