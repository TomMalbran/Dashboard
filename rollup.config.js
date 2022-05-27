import fastGlob         from "fast-glob";
import path             from "path";
import svgr             from "@svgr/rollup";
import commonjs         from "@rollup/plugin-commonjs";
import url              from "@rollup/plugin-url";
import resolve          from "@rollup/plugin-node-resolve";
import babel            from "@rollup/plugin-babel";
import external         from "rollup-plugin-peer-deps-external";
import cleaner          from "rollup-plugin-cleaner";
import cleanup          from "rollup-plugin-cleanup";



export default function makeConfig(commandOptions) {
    const isDist  = true; //commandOptions["config-dist"];
    const targets = isDist ? [ "./dist" ] : [];
    const input   = { Dashboard : "src/Dashboard.js" };
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
            targets.push(`./${dst}`);
        }
    });

    return {
        input,
        output : {
            dir     : isDist ? "dist" : "",
            format  : "cjs",
            exports : "auto",
        },
        plugins : [
            cleaner({ targets }),
            external(),
            url(),
            svgr(),
            babel({
                babelHelpers : "bundled",
                exclude      : "node_modules/**",
            }),
            resolve({
                preferBuiltins : true,
            }),
            commonjs({
                include : "node_modules/**",
            }),
            cleanup(),
        ],
    };
}
