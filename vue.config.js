/* 设置别名 */
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'views': '@/views',
        'components': '@/components',
        'network': '@/network',
        'common': '@/common',
      }
    }
  }
}