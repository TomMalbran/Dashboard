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
    const isDist  = true; //commandOptions["config-dist"];
    const targets = isDist ? [ "./dist" ] : [];
    const input   = {};
    const dirs    = {
        Utils      : "Utils/*.js",
        Core       : "Core/*.js",
        Components : "Components/**/*.js",
    };

    Object.entries(dirs).forEach(([ dst, src ]) => {
        fastGlob.sync([ `src/${src}` ]).map((filePath) => {
            const fileName = path.basename(filePath);
            const name     = fileName.replace(/\.[^/.]+$/, "");
            input[`${dst}/${name}`] = filePath;
        });
        if (!isDist) {
            targets.push(isDist ? `./dist/${dst}` : `./${dst}`);
        }
    });
    
    return {
        input,
        output : {
            dir    : isDist ? "dist" : "",
            format : "cjs",
        },
        plugins : [
            cleaner({ targets }),
            external(),
            url(),
            svgr(),
            babel({ exclude : "node_modules/**" }),
            resolve({ preferBuiltins : true }),
            commonjs({
                include      : "node_modules/**",
                namedExports : {
                    "node_modules/react-is/index.js" : [
                        "ForwardRef",
                        "isValidElementType",
                        "isElement",
                    ],
                },
            }),
        ],
    };
}
