const { override, addWebpackAlias, fixBabelImports } = require('customize-cra')
const path = require('path')
const paths = require('react-scripts/config/paths')
paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist')

module.export = override(
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src')
  }),
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css'
  })
)
