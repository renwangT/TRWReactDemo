import { defineConfig } from 'umi';
const target = 'http://www.baidu.com';
const isProduction = process.env.BUILD_ENV === 'prod';
const outputPath = isProduction ? 'dist-prod' : 'dist-test';
export default defineConfig({
  proxy: {
    '/api': {
      target,
      changeOrigin: true,
      // pathRewrite: {
      //   '^/api/': '',
      // },
    },
  },
  targets: {
    ie: 11,
  },
  outputPath,
  history: { type: 'hash' },
  ignoreMomentLocale: true,
  dynamicImport: {
    // loading: 'antd/lib/spin'
  },
  title: 'tangSystem',
  antd: {
    //compact: true, // 紧凑型布局
  },
  fastRefresh: {},
  hash: true,
  dva: {},
  locale: {
    default: 'zh-CN',
    antd: true,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
  devtool: 'eval-source-map', // 禁用 sourcemap
  // extraBabelPlugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: false }]],
  cssModulesTypescriptLoader: { mode: 'emit' },
  nodeModulesTransform: {
    type: 'none',
  },
  analyze: {
    analyzerMode: 'server',
    analyzerPort: 8888,
    openAnalyzer: true,
    // generate stats file while ANALYZE_DUMP exist
    generateStatsFile: false,
    statsFilename: 'stats.json',
    logLevel: 'info',
    defaultSizes: 'parsed', // stat  // gzip
  },
  define: {
    'process.env.BUILD_ENV': process.env.BUILD_ENV,
  },
});
