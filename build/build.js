/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const esbuild = require('esbuild');
const postcssPresetEnv = require('postcss-preset-env');
const pxtorem = require('postcss-pxtorem');
const chalk = require('chalk');
const postcssImport = require('postcss-import');
// const stylePlugin = require('esbuild-style-plugin'); // could be re-evaluated if we decide to use post-css in the future
const { sassPlugin } = require('esbuild-sass-plugin');
const { svgTransforms } = require('./tools/svgTransforms');
const { entryPoints } = require('./entryPoints');

const initialBuildStart = process.hrtime();
console.info(chalk.cyanBright('[esbuild] Building...'));

const presetEnvConfig = {
  stage: 0,
};

// eslint-disable-next-line no-unused-vars
const onRebuild = (error, result) => {
  if (error) console.error('watch build failed:', error);
  else console.info(chalk.cyanBright('[esbuild] watch build succeeded'));
  // svgTransforms(); // this slows down hmr not worth the trade off
};

const useWatch = (process.env.USE_WATCH && process.env.USE_WATCH === 'true') || false;

esbuild
  .build({
    entryPoints,
    entryNames: '[name]',
    plugins: [
      sassPlugin({
        postcss: {
          plugins: [postcssImport, pxtorem, postcssPresetEnv(presetEnvConfig)],
        },
      }),
    ],
    bundle: true,
    sourcemap: true,
    outdir: './assets',
    watch: useWatch ? { onRebuild } : false,
  })
  .then(() => {
    svgTransforms();
  });
const initialBuildEnd = process.hrtime(initialBuildStart);
console.info(
  chalk`{cyanBright [esbuild] Execution time:} {magentaBright
    ${initialBuildEnd[0]}s}, {magentaBright ${initialBuildEnd[1] / 1000000}ms}`
);
