const {
  FuseBox,
  WebIndexPlugin,
  CSSPlugin,
  CSSResourcePlugin,
  ImageBase64Plugin,
  QuantumPlugin,
} = require('fuse-box');

const TsTransformInferno = require('ts-transform-inferno').default;
const isProduction = process.env.NODE_ENV === 'production';

const fuse = FuseBox.init({
  useTypescriptCompiler: true,
  hash: true,
  sourceMaps: { project: true, vendor: true, inline: true },
  debug: 'true',
  homeDir: 'src',
  target: 'browser@es6',
  output: 'build/$name.js',
  plugins: [
    WebIndexPlugin({ template: 'src/assets/index.html' }),
    [
      CSSResourcePlugin({
        dist: './build/css-resources',
      }),
      CSSPlugin(),
    ],
    ImageBase64Plugin(),
    isProduction && QuantumPlugin(),
  ],
  transformers: {
    before: [TsTransformInferno()],
  },
});

// run dev server
if (!isProduction) {
  fuse.dev({
    fallback: 'index.html',
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  });
}

const bundle = fuse.bundle('app').instructions(' > app/App.tsx');

if (!isProduction) {
  bundle.hmr().watch();
}

fuse.run();
