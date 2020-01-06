
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'http://www.lilei.site/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070',height: '5px' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~assets/css/main.css',
    '~assets/css/Markdown.css',
    'mavon-editor/dist/css/index.css'
  ],


  loader:[
    {
        test:/\.less$/,
        loaders:'style-loader!css-loader!less-loader'
    }
 ],



  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/iview',
    '@/plugins/mavon',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
  ],
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    babel:{
        "plugins":[
            ['component',{
                "libraryName":"element-ui",
                "styleLibraryName":"theme-chalk"
            }]
        ]
    },
    extend (config, ctx) {
    }
  }
}
