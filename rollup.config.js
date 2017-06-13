import babel from 'rollup-plugin-babel';
import filesize from 'rollup-plugin-filesize';
import cleanup from 'rollup-plugin-cleanup';

// NPM injects the name from `package.json` to this env var
const pkgName = process.env.npm_package_name;

export default {
  entry: `src/index.js`,
  targets: [
    {
      dest: 'include-media-redux.js',
      sourceMap: 'include-media-redux.js.map',
      format: 'umd'
    }
  ],
  amd: {
    id: pkgName,
  },
  moduleName: pkgName,
  plugins: [
    babel({
      exclude: './node_modules/**',
      moduleIds: true,
      babelrc: false,
      presets: [
        [ 'es2015', { 'modules': false } ],
        'stage-0',
        'react',
      ],
      plugins: [
        'external-helpers',
      ],
    }),

    cleanup({
      comments: ['some', 'jsdoc']
    }),

    filesize()
  ]
};
