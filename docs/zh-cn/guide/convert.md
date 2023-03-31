# 闪兑 API

ExinOne 的闪兑功能允许在两个币之间互相转换。聚合多个平台，选择更优的交易路径。

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

## 闪兑订单查询

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

## 转账 Memo 规范


每个字段用 `#` 隔开，并以 BASE64 编码：

`NAMESPACE|ACTION|FIELD1`

| 行为 | NAMESPACE | ACTION | FIELD1 |
| ---- | ---- | ---- | ---- | 
| 闪兑交易 | EX | CO | 目标资产UUID |


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

::: tip
- 如果需要使用 EPC 抵扣 Exin 服务费，则首次使用需要通过 [授权登录](./authentication#授权登录) 接口注册用户。
- 授权登录后通过 [用户详情](./users#用户详情) 接口可以获得 EPC 钱包地址 `data.epcUuid`，可以向该地址转入 EPC 在交易时抵扣服务费。
- 通过 [钱包余额查询](./wallets#钱包余额查询) 接口可以获取 EPC 余额。  
:::

