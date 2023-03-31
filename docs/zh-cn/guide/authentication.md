# API 授权


ExinOne 部分的 API 需要进行身份验证。你需要使用 ExinOne 颁发的 token 来调用它们。

上面一步 [生成密钥](./getting-started) 中生成了 `keystore.json` 文件。此文件里的信息，将用来调用 Mixin 的 API 来获取 Mixin 颁发的 `Mixin Token`。

ExinOne 将使用该 `Mixin Token` 获取信息并注册用户，之后返回一个 `Bearer Token` 作为 ExinOne API 的请求令牌。

接下来演示怎么操作。

## 生成 Mixin Token


以 PHP 为例，使用 [mixin-sdk-php](https://github.com/ExinOne/mixin-sdk-php) ，你可以使用以下代码来生成访问令牌：

```php [PHP]
MixinSDK::network()
    ->setReturnAccessToken(true)
    ->setAud('61103d28-3ac2-44a2-ae34-bd956070dab1')
    ->accessTokenGetInfo('');
```


签名实现参考 Mixin 开发者文档  [Signing](https://developers.mixin.one/docs/api/guide#signing)，签署端点 `GET https://api.mixin.one/me`，JWT Payload 增加一个参数：

JWT Payload:

| 参数 | 类型 | 描述 |
| -- | -- | -- |
| aud | string | 必须是 ExinOne 机器人 client_id，`61103d28-3ac2-44a2-ae34-bd956070dab1` |


使用上面获取的「Mixin Token」，开始下一步的授权登录。

## 授权登录

<APIEndpoint method="POST" url="/mixin/me" />

### Body: 

| 参数 | 类型 | 描述 |
| -- | -- | -- |
| token | string | 必须，上步获取到的「Mixin Token」


### 响应：

````json
{
    "code": "0",
    "success": true,
    "message": "",
    "data": {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpcxxxxxx",
        "tokenType": "Bearer",
        "expiresIn": 86400
    },
    "timestampMs": 1678874885032
}
````

上面 `data.token` 即是 ExinOne 颁发的 Token，你可以用它来调用 ExinOne API。