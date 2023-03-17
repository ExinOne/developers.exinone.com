# 介绍

ExinOne 是 Mixin 生态最受欢迎的开发商 Exin 旗下一站式数字资产金融服务平台。

## 注册 Mixin 网络应用

开始之前，请先注册为 Mixin 开发者。

如果您没有 Mixin Messenger，请 [下载](https://mixin.network/messenger) 它。然后按照 [这些步骤](https://developers.mixin.one/docs/dapp/getting-started/create-dapp) 注册为开发者。

有关 Mixin Network 的更多信息，请访问 [Mixin Developer Portal](https://developers.mixin.one/dashboard)。

:::info 
每个开发人员帐户可以免费创建 2 个应用程序。如果您需要更多，请向门户支付费用。 
:::


## 生成密钥

在应用程序页面上，单击『Ed25519会话』按钮以生成一个新的密钥库，其中包含敏感信息，例如应用程序的 PIN、会话 ID、PIN 令牌和私钥：


```json
{
  "pin":        "123456",
  "client_id":  "eac51982-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "session_id": "cc2ae4e2-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "pin_token":  "YcUaTtLL...ZaNag34",
  "private_key":"tbcUDgb4...2TxNfQi"
}
```

将其保存到名为`keystore.json`的文件中。

请注意，`client_id`是您的应用程序的唯一标识符，稍后您将需要它。

:::warning
请注意，上述密钥和信息是在浏览器中生成的，它不会被服务器和浏览器保存，请妥善存储它，并不要与他人共享。这些信息可以转移你的全部资产。 
:::
