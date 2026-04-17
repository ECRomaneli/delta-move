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

const webOutput = {
  path: path.resolve(__dirname, 'dist'),
  library: {
    name: 'DeltaMove',
    type: 'umd',
    export: 'default',
  },
  globalObject: 'this',
  clean: false,
};

// Web (UMD) build - minified
const webMinConfig = {
  mode: 'production',
  devtool,
  entry: './src/main.ts',
  output: { ...webOutput, filename: 'delta-move.min.js' },
  resolve: { extensions: ['.ts', '.js'] },
  module: { rules: [tsRule] },
};

// Web (UMD) build - non-minified
const webDevConfig = {
  mode: 'development',
  devtool,
  entry: './src/main.ts',
  output: { ...webOutput, filename: 'delta-move.js' },
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

module.exports = isDev ? [webDevConfig, npmConfig] : [webMinConfig, webDevConfig, npmConfig];
