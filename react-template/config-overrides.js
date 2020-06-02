const { override, addWebpackAlias, fixBabelImports } = require('customize-cra')
const path = require('path')

module.export = override(
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src')
  }),
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css'
  })
)
