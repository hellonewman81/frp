const environment = {
  development: {
    isProduction: false,
    assetsPath: `http://${process.env.HOST || 'localhost'}:${+process.env.PORT + 1 || 3001}/dist/`
  },
  production: {
    isProduction: true,
    assetsPath: '/dist/'
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign(
  {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT,
    apiHost: process.env.APIHOST || 'localhost',
    apiPort: process.env.APIPORT,
    app: {
      title: 'Foot Right Podiatry',
      description: 'Foot Right Podiatry',
      head: {
        titleTemplate: '%s | Foot Right Podiatry',
        meta: [
          { name: 'description', content: 'Foot Right Podiatry' },
          { charset: 'utf-8' },
          { property: 'og:site_name', content: 'Foot Right Podiatry' },
          {
            property: 'og:image',
            content: ''
          },
          { property: 'og:locale', content: 'en_AU' },
          { property: 'og:title', content: 'Foot Right Podiatry' },
          {
            property: 'og:description',
            content: 'Foot Right Podiatry'
          },
          { property: 'og:card', content: 'summary' },
          { property: 'og:site', content: '@' },
          { property: 'og:creator', content: '@' },
          { property: 'og:image:width', content: '200' },
          { property: 'og:image:height', content: '200' },
          { property: 'robots', content: 'INDEX, FOLLOW' },
          {
            property: 'google-site-verification',
            content: 'OaySxtYDdqGFmLgV137w-6OpTOp4k1TbRS5HJ6KCG7k'
          }
        ]
        /* , link: [
          { rel: 'canonical', content: '/' },
          { rel: 'publisher', content: 'https://plus.google.com/112055120681563804751' }
        ] */
      }
    }
  },
  environment
);
