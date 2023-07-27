export default {
  title: 'ExinOne Developers',
  description: 'Integrate ExinOne Trading API your projects with ease',
  themeConfig: {
    nav: [
      { text: 'EN', link: '/guide/getting-started' },
      { text: '中文', link: '/zh-cn/guide/getting-started' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Basic',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Authentication', link: '/guide/authentication' },
          ]
        },
        {
          text: 'API',
          items: [
            { text: 'Users', link: '/guide/users' },
            { text: 'Wallets', link: '/guide/wallets' },
            { text: 'Convert', link: '/guide/convert' },
            { text: 'Referral', link: '/guide/referral' },
            { text: 'Trading acct.', link: '/guide/fundpool' },
            { text: 'Loan', link: '/guide/loan' },
          ]
        },
      ],
      '/zh-cn/': [
        {
          text: '入门',
          items: [
            { text: '开始', link: '/zh-cn/guide/getting-started' },
            { text: '认证', link: '/zh-cn/guide/authentication' },
          ]
        },
        {
          text: 'API',
          items: [
            { text: '用户', link: '/zh-cn/guide/users' },
            { text: '钱包', link: '/zh-cn/guide/wallets' },
            { text: '闪兑', link: '/zh-cn/guide/convert' },
            { text: '返佣', link: '/zh-cn/guide/referral' },
            { text: '交易账户', link: '/zh-cn/guide/fundpool' },
            { text: '借贷', link: '/zh-cn/guide/loan' },
          ]
        },
      ],
    }
  }
}
