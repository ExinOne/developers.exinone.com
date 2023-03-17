# Introduction

ExinOne is a one-stop digital asset financial service platform under Exin, the most popular developer in the Mixin ecosystem.

## Register Mixin Network Application

Before you begin, please register as a Mixin developer.

If you don't have Mixin Messenger, please [download](https://mixin.network/messenger) it. Then follow [these steps](https://developers.mixin.one/docs/dapp/getting-started/create-dapp) to register as a developer.

For more information about the Mixin Network, please visit the [Mixin Developer Portal](https://developers.mixin.one/dashboard).

:::info
Each developer account can create 2 applications for free. If you need more, please pay the fee to the portal. 
:::

## Generate Key

On the application page, click the "Ed25519 Session" button to generate a new keystore containing sensitive information such as the PIN of the application, the session ID, the PIN token, and the private key:

```json
{
  "pin":        "123456",
  "client_id":  "eac51982-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "session_id": "cc2ae4e2-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "pin_token":  "YcUaTtLL...ZaNag34",
  "private_key":"tbcUDgb4...2TxNfQi"
}
```

Save it to a file named `keystore.json`.

Note that `client_id` is the unique identifier for your application and you will need it later.

:::warning 
Please note that the above keys and information are generated in the browser and are not saved by the server and the browser. Please store them properly and do not share them with others. These can transfer all your assets. 
:::