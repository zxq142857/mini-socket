import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import cleanup from "rollup-plugin-cleanup";
import typescript from "rollup-plugin-typescript2";
import path from "path";

export default {
  input: "src/index.ts",
  output: [
    {
      name: "mini-socket",
      file: path.resolve(__dirname, "dist/mini-sockit.umd.js"),
      format: "umd",
      sourcemap: false,
    },
    {
      name: "mini-socket",
      file: path.resolve(__dirname, "dist/mini-sockit.js"),
      format: "esm",
      sourcemap: false,
    }
  ],
  plugins: [
    typescript({
      tsconfig: path.resolve(__dirname, "tsconfig.json"),
      compilerOptions: {
        declaration: false, // 输出时去除类型文件
      },
    }),
    babel({
      extensions: [".js", ".ts"],
      exclude: "node_modules/**",
      babelHelpers: "bundled",
    }),
    cleanup(),
    terser(),
  ],
};
