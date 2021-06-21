// postcss.config.js
module.exports = {
    // 配置要使用的 PostCSS 插件
    plugins: {
        // 配置使用 autoprefixer 插件
        // 作用： 生成浏览器 CSS 样式规则前缀
        // VueCLI 内部已经配置了 autoprefixer 插件
        // 我们又配置了一次，产生了冲突，所以警告
        // 'autoprefixer': {
        //     // 配置要兼容到的环境信息
        //     browsers: ['Android >= 4.0', 'iOS >= 8']
        // },

        // 配置使用 postcss-pxtorem
        // 作用：把 px 转成为 rem
        'postcss-pxtorem': {
            // lib-flexible 的 rem 适配方案：把一行分为 10 份，没分就是十分之一
            //   rootValue 应该设置为设计稿宽度的十分之一
            // 一般设计稿是 750 ，所以，应该设置为 750 / 10 = 75
            // 但是 Vant 建议设置为 37.5，因为 Vant 是基于 375 写的项目
            // 所以必须设置为 37.5 ，唯一的缺点就是，当设计稿为 750 时，尺寸大小都需要除 2
            // 有没有更好的办法？
            // 如果是 Vant 的样式，就按照 37.5 来转换
            // 如果是自己写的样式，就按照 75 来转换
            // rootValue 支持两种类型的参数
            //   nubmer：固定的数值
            //   function：可以动态处理返回
            //             postcss-pxtorem 处理每个 CSS 文件的时候都会来调用这个方法
            //             它会把被处理的 CSS 文件相关的信息通过参数传给给该函数
            rootValue: ({ file }) => {
                return file.indexOf('vant') !== -1 ? 37.5 : 75
            },
            // 配置要转换的 CSS 属性
            // * 表示所有
            propList: ['*'],
            // propList: ['height] 只转换 height 的值
        },
    },
};