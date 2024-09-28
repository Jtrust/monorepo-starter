import path from "path";
// 在node_modules中查找并绑定第三方依赖项
import { nodeResolve } from "@rollup/plugin-node-resolve";
// 打包排除package中peerDependencies
import peerDepsExternal from "rollup-plugin-peer-deps-external";
// 路径别名
import alias from "@rollup/plugin-alias";
// commonjs处理
import commonjs from "@rollup/plugin-commonjs";
// typescript处理
import typescript from "rollup-plugin-typescript2";
// 将json 文件转换为ES6 模块
import json from "@rollup/plugin-json";
// css相关
import postcss from "rollup-plugin-postcss";
import postUrl from "postcss-url";
import less from "less";
// svg处理
import svgr from "@svgr/rollup";
import url from "@rollup/plugin-url";
import copy from "rollup-plugin-copy";
import image from "@rollup/plugin-image";
// rollup babel插件
import babel from "@rollup/plugin-babel";
// 压缩
import terser from "@rollup/plugin-terser";

const isProd = process.env.NODE_ENV === "production";

const processLess = function (context) {
    return new Promise((resolve, reject) => {
        less.render({ file: context }, function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        });

        less.render(context, {}).then(
            function (output) {
                if (output && output.css) {
                    resolve(output.css);
                } else {
                    reject({});
                }
            },
            function (err) {
                reject(err);
            },
        );
    });
};

const baseOutput = {
    preserveModules: true, // 保留每个输入模块在输出目录中都有对应的文件或目录结构
    preserveModulesRoot: "src", // 这个配置项与 preserveModules 结合使用。它指定了保留模块结构时的根目录。在这种情况下，输出的模块结构将以 src 为根目录进行保留。以便于开发和调试
    exports: "named",
    assetFileNames: ({ name }) => {
        try {
            const { ext, dir, base } = path.parse(name);
            return ext === ".css"
                ? path.join(dir, "style", base) // 输出 .css 文件到 style 目录
                : "[name].[ext]"; // 其他文件保持默认结构
        } catch (err) {
            console.error("Error parsing asset file path:", err);
            return "[name].[ext]"; // 解析失败时使用默认文件名规则
        }
    },
};

// 输出配置，分别处理 ESM 和 CJS 格式
const output = ["es", "cjs"].map((format) => ({
    dir: `./${format}`,
    format,
    ...baseOutput,
}));

// 通用插件
const commonPlugins = [
    peerDepsExternal(),
    nodeResolve({
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    commonjs({
        sourceMap: true,
    }),
    typescript({
        tsconfig: path.resolve(process.cwd(), "./tsconfig.build.json"), // 动态获取当前子包的tsconfig路径
        abortOnError: false,
    }),
    babel({
        presets: ["@babel/preset-env"],
        babelHelpers: "bundled",
    }),
    json(),
    url({
        include: ["**/*.gif"],
        limit: Infinity,
        fileName: "[name][extname]",
    }),
    image(),
    svgr({ svgo: false }),
    alias({
        entries: {
            "@": path.resolve(__dirname, "src"),
        },
    }),
    postcss({
        // modules: true,
        extract: false,
        extensions: [".css", ".less"],
        process: processLess,
        plugins: [
            postUrl([
                {
                    filter: "**/*.svg",
                    url: "inline",
                    encodeType: "base64",
                    basePath: path.resolve(__dirname, "src"),
                },
            ]),
        ],
    }),
    copy({
        targets: [
            { src: "src/icons/", dest: "es" },
            { src: "src/assets/", dest: "es" },
        ],
    }),
    terser({
        mangle: isProd
            ? {
                  keep_classnames: false,
                  eval: false,
                  toplevel: true,
                  module: true,
              }
            : false,
    }),
];

export default {
    input: "src/index",
    output: output,
    external(id) {
        return (
            // id in packageJson.peerDependencies
            /lodash/.test(id) || /antd/.test(id) || /ant-design/.test(id)
        );
    },
    plugins: commonPlugins,
};
