import babel from "rollup-plugin-babel";
export default {
    input: "src/utils/index.js",
    output: {
        file: "libUtils/utils.min.js",
        format: "umd",
        name: 'bundle-name'
    },
    plugins: [
        babel({
            exclude: 'node_modules/**',
        }),
    ]
};