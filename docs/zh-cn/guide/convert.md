# 闪兑 API

ExinOne 的闪兑功能允许在两个币之间互相转换。聚合多个平台，选择更优的交易路径。

## 闪兑资产

<APIEndpoint method="GET" url="/convert/assets" />

响应：

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


## 闪兑预估

<APIEndpoint method="GET" url="/convert/estimate/amount" />

Params: 

| 参数 | 类型 | 描述 |
| -- | -- | -- |
| payAssetUuid | string | 支付资产UUID
| payAssetAmount | string | 支付资产数量
| receiveAssetUuid | string | 买入资产UUID
| withRange | int | 0、1


响应：

````json
{
    "code": "0",
    "success": true,
    "message": "",
    "data": {
        "calcSum": "0.00048558", // 预估将获得的数量
        "calcPrice": "0.000040465",
        "isAllowEpc": true, // 是否可以使用 EPC 抵扣服务费
        "fee": "0.0020", // 服务费率
        "isReverse": false,
        "routePayAssetAmount": "0.00048558",
        "routeExchangeMax": "0.01535905",
        "isDelay": false,
        "delayReleaseTime": "0",
        "receiveAssetPriceUsdt": "24742.03187251",
        "payAssetPriceUsdt": "1",
        "isTradeAvailable": true, // 是否可交易
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
        "range": { // 支付资产支持的支付范围
            "min": "0.11",
            "max": "15",
            "withOutDelayMax": "15"
        }
    },
    "timestampMs": 1678852223931
}
````

## 闪兑订单详情

<APIEndpoint method="GET" url="/convert/order/detail" />

Params: 

| 参数 | 类型 | 描述 |
| -- | -- | -- |
| payTraceId | string | 支付时的 trace_id


响应：

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

## 闪兑订单列表

<APIEndpoint method="GET" url="/convert/order/lists" />

Headers: 

| 参数 | 类型 | 描述 |
| -- | -- | -- |
| Authorization | string | Bearer token

Params: 

| 参数 | 类型 | 描述 |
| -- | -- | -- |
| page | int | 可选，页码 |
| limit | int | 可选，每页数量 |
| dateStart | timestamp | 可选，开始时间戳 |
| dateEnd | timestamp | 可选，结束时间戳 |

::: tip
交易成功 orderStatus:done refundStatus:no

交易失败 orderStatus:done refundStatus:done
:::

响应：

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

## 转账 Memo 规范


每个字段用 `#` 隔开，并以 BASE64 编码：

`NAMESPACE#ACTION#FIELD1#FIELD2`

| 行为 | NAMESPACE | ACTION | FIELD1 | FIELD2 |
| ---- | ---- | ---- | ---- | ---- | 
| 闪兑交易 | EX | CO | 目标资产UUID | 返佣标识，可以不传 |


::: tip
请注意，目前对于不符合规范（不能正确解码、未用`#`分隔、NAMESPACE、ACTION 等不正确等）的转账不会自动退币。
:::


::: warning
初次接入时，建议小额测试。
:::

以闪兑交易兑换 BTC 举例：

对以下内容：

```
EX#CO#c6d0c728-2624-429b-8e0d-d9d19b6592fa
```

进行 BASE64 将得到：

```
RVgjQ08jYzZkMGM3MjgtMjYyNC00MjliLThlMGQtZDlkMTliNjU5MmZh
```

携带返佣标识：
```
EX#CO#c6d0c728-2624-429b-8e0d-d9d19b6592fa#m.3740051
```

进行 BASE64 将得到：

```
RVgjQ08jYzZkMGM3MjgtMjYyNC00MjliLThlMGQtZDlkMTliNjU5MmZhI20uMzc0MDA1MQ==
```

::: tip
- 如果需要使用 EPC 抵扣 Exin 服务费，则首次使用需要通过 [授权登录](./authentication#授权登录) 接口注册用户。
- 授权登录后通过 [用户详情](./users#用户详情) 接口可以获得 EPC 钱包地址 `data.epcUuid`，可以向该地址转入 EPC 在交易时抵扣服务费。返佣标识为 `data.ref`。
- 通过 [钱包余额查询](./wallets#钱包余额查询) 接口可以获取 EPC 余额。  
:::

