module.exports = {
    chainWebpack: config => {
        // 发布模式
        config.when(process.env.NODE_ENV === 'production', config => {
            config
                .entry('app') // 默认入口文件
                .clear() // 清除默认入口文件
                .add('./src/main-prod.js') // 设置新的入口文件

            // 配置CDN
            config.set('externals', {
                vue: 'Vue',
                'vue-router': 'VueRouter',
                vuux: 'Vuex',
                axios: 'axios',
                cropperjs: 'cropperjs',
                vant: 'Vant'
            })
            // 首页优化
            config.plugin('html').tap(args => {
                args[0].isProd = true
                return args
            })
        })
        // 开发模式
        config.when(process.env.NODE_ENV === 'development', config => {
            config
                .entry('app') // 默认入口文件
                .clear() // 清除默认入口文件
                .add('./src/main-dev.js') // 设置新的入口文件
            // 首页优化
            config.plugin('html').tap(args => {
                args[0].isProd = false
                return args
            })
        })
    }
}