import svgr             from "@svgr/rollup";
import commonjs         from "@rollup/plugin-commonjs";
import url              from "@rollup/plugin-url";
import resolve          from "@rollup/plugin-node-resolve";
import babel            from "rollup-plugin-babel";
import external         from "rollup-plugin-peer-deps-external";
import postcss          from "rollup-plugin-postcss";
import pkg              from "./package.json";


export default {
    input  : {
        // index    : "src/index.js",
        html     : "src/Common/Html.js",
        download : "src/Common/Download.js",
    },
    output : [
        {
            dir       : "cjs",
            format    : "cjs",
        },
        {
            dir       : "esm",
            format    : "esm",
        },
    ],
    plugins : [
        external(),
        postcss({
            modules : true,
        }),
        url(),
        svgr(),
        babel({
            exclude : "node_modules/**",
            plugins : [ "external-helpers" ],
        }),
        resolve(),
        commonjs(),
    ],
};
