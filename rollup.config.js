import svgr             from "@svgr/rollup";
import commonjs         from "@rollup/plugin-commonjs";
import url              from "@rollup/plugin-url";
import resolve          from "@rollup/plugin-node-resolve";
import babel            from "rollup-plugin-babel";
import external         from "rollup-plugin-peer-deps-external";
import cleaner          from "rollup-plugin-cleaner";
import multiInput       from "rollup-plugin-multi-input";

// import copy             from "rollup-plugin-copy"



const plugins = [
    multiInput(),
    external(),
    url(),
    svgr(),
    babel({ exclude : "node_modules/**" }),
    resolve(),
    commonjs({
        include      : "node_modules/**",
        namedExports : {
            "node_modules/react-is/index.js" : [ "ForwardRef", "isValidElementType", "isElement" ],
        },
    }),
];

export default [
    {
        input  : {
            index  : "src/index.js",
        },
        output : {
            dir    : "dist",
            format : "cjs",
        },
        plugins : [
            cleaner({
                targets : [ "./dist/" ],
            }),
            // copy({
            //     targets : [{ src : "package.json", dest : "dist" }],
            // }),
            ...plugins,
        ],
    },
    {
        input  : [ "src/**/*.js" ],
        output : {
            dir    : "dist",
            format : "cjs",
        },
        plugins,
    },
];
