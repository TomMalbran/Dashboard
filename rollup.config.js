import fastGlob         from "fast-glob";
import path             from "path";
import svgr             from "@svgr/rollup";
import commonjs         from "@rollup/plugin-commonjs";
import url              from "@rollup/plugin-url";
import resolve          from "@rollup/plugin-node-resolve";
import babel            from "rollup-plugin-babel";
import external         from "rollup-plugin-peer-deps-external";
import cleaner          from "rollup-plugin-cleaner";



export default function makeConfig(commandOptions) {
    const isDist  = commandOptions["config-dist"];
    const plugins = [
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

    const exporter = (src, dst) => {
        const inputs = fastGlob.sync([ `src/${src}` ]).map((filePath) => {
            const fileName = path.basename(filePath);
            return [ fileName.replace(/\.[^/.]+$/, ""), filePath ];
        });
        
        return {
            input  : Object.fromEntries(inputs),
            output : {
                dir    : isDist ? `dist/${dst}` : dst,
                format : "cjs",
            },
            plugins,
        };
    };

    return [
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
                    targets : [ "./dist/", "./Components", "./Core", "./Utils" ],
                }),
                ...plugins,
            ],
        },

        exporter("Components/**/*.js", "Components"),
        exporter("Core/*.js", "Core"),
        exporter("Utils/*.js", "Utils"),
    ];
}
