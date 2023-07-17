# Instant Exchange API

ExinOne's Instant Exchange feature allows for the conversion of assets between two different cryptocurrencies. It aggregates multiple platforms and chooses the optimal trading path.

## Assets

<APIEndpoint method="GET" url="/convert/assets" />

Response:

```json
{
    "code": "0",
    "success": true,
    "message": "",
    "data": [
        {
            "mixinId": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
            "mixinChainId": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
            "symbol": "BTC",
            "name": "Bitcoin"
        },
        {
            "mixinId": "43d61dcd-e413-450d-80b8-101d5e903357",
            "mixinChainId": "43d61dcd-e413-450d-80b8-101d5e903357",
            "symbol": "ETH",
            "name": "Ether"
        },
        {
            "mixinId": "f5ef6b5d-cc5a-3d90-b2c0-a2fd386e7a3c",
            "mixinChainId": "43d61dcd-e413-450d-80b8-101d5e903357",
            "symbol": "BOX",
            "name": "BOX Token"
        },
        {
            "mixinId": "c94ac88f-4671-3976-b60a-09064f1811e8",
            "mixinChainId": "43d61dcd-e413-450d-80b8-101d5e903357",
            "symbol": "XIN",
            "name": "Mixin"
        },
        {
            "mixinId": "4d8c508b-91c5-375b-92b0-ee702ed2dac5",
            "mixinChainId": "43d61dcd-e413-450d-80b8-101d5e903357",
            "symbol": "USDT",
            "name": "Tether USD"
        }
    ],
    "timestampMs": 1680604080799
}
```


## Instant Exchange Estimation

<APIEndpoint method="GET" url="/convert/estimate/amount" />

Params:

| Parameter        | Type   | Description          |
| ---------------- | ------ | -------------------- |
| payAssetUuid     | string | Payment asset UUID   |
| payAssetAmount   | string | Payment asset amount |
| receiveAssetUuid | string | Buying asset UUID    |
| withRange        | int    | 0, 1                 |

Response:

````json
{
    "code": "0",
    "success": true,
    "message": "",
    "data": {
        "calcSum": "0.00048558", // Estimated amount to be received
        "calcPrice": "0.000040465",
        "isAllowEpc": true, // Can EPC be used to offset service fees?
        "fee": "0.0020", // Exin Fee rate
        "isReverse": false,
        "routePayAssetAmount": "0.00048558",
        "routeExchangeMax": "0.01535905",
        "isDelay": false,
        "delayReleaseTime": "0",
        "receiveAssetPriceUsdt": "24742.03187251",
        "payAssetPriceUsdt": "1",
        "isTradeAvailable": true, // Is trading allowed?
        "route": {
            "asset": [
                {
                    "id": 7,
                    "mixinId": "4d8c508b-91c5-375b-92b0-ee702ed2dac5",
                    "mixinChainId": "43d61dcd-e413-450d-80b8-101d5e903357",
                    "name": "Tether USD",
                    "symbol": "USDT",
                    "iconUrl": "https://mixin-images.zeromesh.net/ndNBEpObYs7450U08oAOMnSEPzN66SL8Mh-f2pPWBDeWaKbXTPUIdrZph7yj8Z93Rl8uZ16m7Qjz-E-9JFKSsJ-F=s128"
                },
                {
                    "id": 12,
                    "mixinId": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
                    "mixinChainId": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
                    "name": "Bitcoin",
                    "symbol": "BTC",
                    "iconUrl": "https://mixin-images.zeromesh.net/HvYGJsV5TGeZ-X9Ek3FEQohQZ3fE9LBEBGcOcn4c4BNHovP4fW4YB97Dg5LcXoQ1hUjMEgjbl1DPlKg1TW7kK6XP=s128"
                }
            ],
            "exchange": [
                {
                    "id": 2,
                    "name": "币安",
                    "en": "Binance",
                    "cn": "币安",
                    "favicon": "/images/logos/binance-favicon-32.ico",
                    "logo_32": "/images/logos/binance-logo.png"
                }
            ]
        },
        "range": {
            "min": "0.11",
            "max": "15",
            "withOutDelayMax": "15"
        }
    },
    "timestampMs": 1678852223931
}
````

## Query Order

<APIEndpoint method="GET" url="/convert/order/detail" />

Params:

| Parameter  | Type   | Description                       |
| ---------- | ------ | --------------------------------- |
| payTraceId | string | trace_id generated during payment |

Response:

````json
{
    "code": "0",
    "success": true,
    "message": "",
    "data": {
        "id": 10781,
        "source": "snapshot",
        "payAssetUuid": "4d8c508b-91c5-375b-92b0-ee702ed2dac5",
        "payAssetSymbol": "USDT",
        "payAmount": "1.00000000",
        "payTraceId": "57666165-a156-44a2-bf8a-fd7f2b0840bb",
        "receiveAssetUuid": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
        "receiveAssetSymbol": "BTC",
        "receiveAmount": "0.00004039",
        "estimateReceiveAmount": null,
        "feeAmount": "0.19938594",
        "feeAssetUuid": "44adc71b-0c37-3b42-aa19-fe2d59dae5fd",
        "feeAssetSymbol": "EPC",
        "orderStatus": "done",
        "refundStatus": "no",
        "payWalletUuid": "524e2f84-8756-40bb-886e-c92ce1b2e25a",
        "payWalletType": "mixin",
        "receiveWalletUuid": "524e2f84-8756-40bb-886e-c92ce1b2e25a",
        "receiveWalletType": null,
        "createdAt": 1678861870,
        "updatedAt": 1678861880
    },
    "timestampMs": 1678934766624
}
````

## Instant Exchange Order List

<APIEndpoint method="GET" url="/convert/order/lists" />

Headers:

| Parameter     | Type   | Description  |
| ------------- | ------ | ------------ |
| Authorization | string | Bearer token |

Params:

| Parameter | Type | Description |
| -- | -- | -- |
| page | int | Optional, page number |
| limit | int | Optional, items per page |
| dateStart | timestamp | Optional, start timestamp |
| dateEnd | timestamp | Optional, end timestamp |

::: tip
Successful transaction orderStatus:done refundStatus:no

Failed transaction orderStatus:done refundStatus:done
:::

Response:

````json
{
    "code": "0",
    "success": true,
    "message": "",
    "data": [
        {
            "id": 8240936,
            "source": "snapshot",
            "payAssetUuid": "4d8c508b-91c5-375b-92b0-ee702ed2dac5",
            "payAssetSymbol": "USDT",
            "payAmount": "20.00000000",
            "payTraceId": "60f4da0c-5b8b-e008-37b3-7657710fb4b5",
            "receiveTraceId": "4ac32aee-2310-4cca-aab0-85f7aa733701",
            "receiveAssetUuid": "dcde18b9-f015-326f-b8b1-5b820a060e44",
            "receiveAssetSymbol": "SHIB",
            "receiveAmount": "2200661.52149944",
            "estimateReceiveAmount": "2200670.32418074",
            "feeAmount": "4.00520397",
            "feeAssetUuid": "44adc71b-0c37-3b42-aa19-fe2d59dae5fd",
            "feeAssetSymbol": "EPC",
            "orderStatus": "done",
            "refundStatus": "no",
            "payWalletUuid": "53fda963-ed6e-417e-bd22-ab16711f8b0d",
            "payWalletType": "mixin",
            "receiveWalletUuid": "53fda963-ed6e-417e-bd22-ab16711f8b0d",
            "receiveWalletType": "mixin",
            "createdAt": 1683514948,
            "updatedAt": 1683514952
        },
        {
            "id": 8240789,
            "source": "snapshot",
            "payAssetUuid": "4d8c508b-91c5-375b-92b0-ee702ed2dac5",
            "payAssetSymbol": "USDT",
            "payAmount": "40.00000000",
            "payTraceId": "805ec0d9-7b2c-7488-3c72-ea6afdd77202",
            "receiveTraceId": "e1f76b5a-039b-4fec-ad69-8fd65ace948a",
            "receiveAssetUuid": "dcde18b9-f015-326f-b8b1-5b820a060e44",
            "receiveAssetSymbol": "SHIB",
            "receiveAmount": "4406181.01545253",
            "estimateReceiveAmount": "4401340.64836149",
            "feeAmount": "8.01924945",
            "feeAssetUuid": "44adc71b-0c37-3b42-aa19-fe2d59dae5fd",
            "feeAssetSymbol": "EPC",
            "orderStatus": "done",
            "refundStatus": "no",
            "payWalletUuid": "53fda963-ed6e-417e-bd22-ab16711f8b0d",
            "payWalletType": "mixin",
            "receiveWalletUuid": "53fda963-ed6e-417e-bd22-ab16711f8b0d",
            "receiveWalletType": "mixin",
            "createdAt": 1683514842,
            "updatedAt": 1683514846
        }
    ],
    "meta": {
        "total": 350,
        "count": 2,
        "perPage": 2,
        "currentPage": 1,
        "nextLink": "https://app.eiduwejdk.com/api/v2/convert/order/lists?page=2"
    },
    "timestampMs": 1683598283002
}
````

## Transfer Memo Specification

Separate each field with `#` and encode with BASE64:

```
NAMESPACE|ACTION|FIELD1|FIELD2
```

| Action   | NAMESPACE | ACTION | FIELD1 | FIELD2 |
| -------- | ---- | ------ | ----------------- | ------ |
| Convert Order | EX | CO | Target Asset UUID | Referral identifier is optional and can be left out if not needed |

::: tip 
Please note that currently, transfers that do not comply with the specifications (cannot be decoded correctly, are not separated by #, have incorrect NAMESPACE or ACTION, etc.) will not be automatically refunded. 
:::

::: warning 
For the initial integration, it is recommended to conduct small-scale testing. 
:::

For example, to exchange BTC with a Instant Exchange transaction:

For the following content:

```
EX#CO#c6d0c728-2624-429b-8e0d-d9d19b6592fa
```

Encode with BASE64 to get:

```
RVgjQ08jYzZkMGM3MjgtMjYyNC00MjliLThlMGQtZDlkMTliNjU5MmZh
```

Include the referral identifier:

```
EX#CO#c6d0c728-2624-429b-8e0d-d9d19b6592fa#m.3740051
```

Encode with BASE64 to get:

```
RVgjQ08jYzZkMGM3MjgtMjYyNC00MjliLThlMGQtZDlkMTliNjU5MmZhI20uMzc0MDA1MQ==
```

::: tip
- If you need to use EPC to deduct Exin service fees, you must register the user through the [Authorization Login](./authentication#authorization-login) interface for the first time.
- After authorization login, you can obtain the EPC wallet address `data.epcUuid` through the [User Details](./users#user-details) interface, and you can transfer EPC to this address to offset the service fees during transactions. The referral identifier is `data.ref`.
- You can check the EPC balance through the [Wallet Balance Inquiry](./wallets#wallet-balance-inquiry) interface.
:::