import type { Configuration } from 'webpack';

const config: Configuration = {
  entry: {background: {import: 'src/background.ts', runtime: false, filename: 'background.js'}},
}

module.exports = config ;
