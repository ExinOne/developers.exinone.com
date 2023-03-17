# API Authorization

All APIs of ExinOne require authentication. You need to provide a token issued by ExinOne to call them.

In the previous step, [Generate Key](./getting-started), a `keystore.json` file was generated. The information in this file will be used to call Mixin's APIs to obtain the `Mixin Token` issued by Mixin.

ExinOne will use this `Mixin Token` to obtain information and register the user, and then return a `Bearer Token` as the request token for ExinOne API.

Next, let's see how to operate.

## Generate Mixin Token

Taking PHP as an example, using [mixin-sdk-php](https://github.com/ExinOne/mixin-sdk-php), you can use the following code to generate an access token:

```php
MixinSDK::network()
    ->setReturnAccessToken(true)
    ->setAud('61103d28-3ac2-44a2-ae34-bd956070dab1')
    ->accessTokenGetInfo('');
```

The signature implementation refers to the Mixin developer document [Signing](https://developers.mixin.one/docs/api/guide#signing), and the JWT Payload has an additional parameter:

JWT Payload:

| Parameter | Type   | Description                                                  |
| --------- | ------ | ------------------------------------------------------------ |
| aud       | string | Must be the client_id of the ExinOne robot, `61103d28-3ac2-44a2-ae34-bd956070dab1` |

Using the token obtained in the previous step, proceed to the next step of authorization login.

## Authorization Login

<APIEndpoint method="POST" url="/mixin/me" />

### Body:

| Parameter | Type   | Description                                                |
| --------- | ------ | ---------------------------------------------------------- |
| token     | string | Required. The token obtained in the "Generate Token" step. |

### Response:

```json
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
```

The `data.token` above is the Token issued by ExinOne, which you can use to call ExinOne API.