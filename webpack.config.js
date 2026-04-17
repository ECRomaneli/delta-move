const path = require('path');

const isDev = process.env.NODE_ENV === 'development';
const devtool = 'source-map';

const tsRule = {
  test: /\.ts$/,
  use: [{
    loader: 'ts-loader',
    options: {
      configFile: path.resolve(__dirname, 'src/tsconfig.json'),
      compilerOptions: {
        declaration: false,
        sourceMap: isDev,
        noEmit: false,
      },
    },
  }],
  exclude: /node_modules/,
};

// Web (UMD) build
const webConfig = {
  mode: isDev ? 'development' : 'production',
  devtool,
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isDev ? 'delta-move.js' : 'delta-move.min.js',
    library: {
      name: 'DeltaMove',
      type: 'umd',
      export: 'default',
    },
    globalObject: 'this',
    clean: false,
  },
  resolve: { extensions: ['.ts', '.js'] },
  module: { rules: [tsRule] },
};

// npm (CommonJS) build
const npmConfig = {
  mode: isDev ? 'development' : 'production',
  devtool,
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    library: { type: 'commonjs2' },
    clean: false,
  },
  resolve: { extensions: ['.ts', '.js'] },
  module: { rules: [tsRule] },
};

module.exports = [webConfig, npmConfig];
