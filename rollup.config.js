const sourcemaps = require('rollup-plugin-sourcemaps');
const typescript = require('rollup-plugin-typescript2');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
// const {uglify} = require('rollup-plugin-uglify');
const pkg = require('./package.json');

const copyright = '/*!\n' + ([
  pkg.name + ' v' + pkg.version + ' (' + pkg.repository.url + ')',
  pkg.description,
  '',
  '@license ' + pkg.license,
  '@author ' + pkg.author,
  '',
].map(line => ` * ${line}`.replace(/\s+$/, '')).join('\n')) + '/';

module.exports = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        name: pkg.name,
        format: 'umd',
        sourcemap: true,
        banner: copyright,
        globals: {
          'react': 'React',
        },
      },
    ],
    external: [
      'react',
    ],
    watch: {
      include: 'src/**',
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({ useTsconfigDeclarationDir: true }),
      // uglify(),
      sourcemaps(),
    ],
  },
];
