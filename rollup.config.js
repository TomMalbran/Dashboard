import svgr             from "@svgr/rollup";
import commonjs         from "@rollup/plugin-commonjs";
import url              from "@rollup/plugin-url";
import resolve          from "@rollup/plugin-node-resolve";
import babel            from "rollup-plugin-babel";
import external         from "rollup-plugin-peer-deps-external";
import postcss          from "rollup-plugin-postcss";
import cleaner          from "rollup-plugin-cleaner";
// import copy             from "rollup-plugin-copy"



const plugins = [
    external(),
    postcss({
        modules    : true,
        extensions : [ "css" ],
    }),
    url(),
    svgr(),
    babel({ exclude : "node_modules/**" }),
    resolve(),
    commonjs({
        include      : "node_modules/**",
        namedExports : {
            "node_modules/react-is/index.js" : [ "isValidElementType" ],
        },
    }),
];

export default [
    {
        input  : {
            index    : "src/index.js",
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

    // Core Functions
    {
        input  : {
            NLS : "src/Core/NLS.js",
        },
        output : {
            dir    : "dist/Core",
            format : "cjs",
        },
        plugins,
    },

    // Components Functions
    {
        input  : {
            Download  : "src/Common/Download.js",
            Icon      : "src/Common/Icon.js",
            Html      : "src/Common/Html.js",
            HyperLink : "src/Common/HyperLink.js",
        },
        output : {
            dir    : "dist/Components",
            format : "cjs",
        },
        plugins,
    },

    // Utils Functions
    {
        input  : {
            ClassList : "src/Utils/ClassList.js",
            Href      : "src/Utils/Href.js",
        },
        output : {
            dir    : "dist/Utils",
            format : "cjs",
        },
        plugins,
    },
];
