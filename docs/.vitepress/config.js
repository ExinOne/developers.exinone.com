export default {
  title: 'ExinOne Developers',
  description: 'Just playing around with Pando',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '入门',
          items: [
            { text: '开始', link: '/guide/getting-started' },
            { text: '认证', link: '/guide/authentication' },
          ]
        },
        {
          text: 'API',
          items: [
            { text: '用户', link: '/guide/users' },
            { text: '钱包', link: '/guide/wallets' },
            { text: '闪兑', link: '/guide/convert' },
          ]
        },
      ],
    }
  }
}