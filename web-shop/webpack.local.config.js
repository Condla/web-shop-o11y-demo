const path = require('path');

module.exports = {
  mode: 'production',
  entry: './js_src/main.js',
  output: {
    filename: '../static/main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
