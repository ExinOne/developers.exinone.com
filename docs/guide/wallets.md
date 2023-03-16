# 钱包 API

## 钱包余额查询


<APIEndpoint method="GET" url="/wallet/asset" />


**暂只支持获取 EPC 钱包的余额，方便知道 EPC 资产余额，不足时充值，交易时可以使用 EPC 抵扣。**

Headers: 

| 参数 | 类型 | 描述 |
| -- | -- | -- |
| Authorization | string | Bearer token

Params: 

| 参数 | 类型 | 描述 |
| -- | -- | -- |
| assetUuid | string | 资产UUID
| wallet | string | 钱包，暂只支持查询 EPC 钱包,参数为：epc


响应：

````json
{
    "code": "0",
    "success": true,
    "message": "",
    "data": {
        "type": "asset",
        "assetId": "44adc71b-0c37-3b42-aa19-fe2d59dae5fd",
        "chainId": "43d61dcd-e413-450d-80b8-101d5e903357",
        "feeAssetId": "43d61dcd-e413-450d-80b8-101d5e903357",
        "symbol": "EPC",
        "name": "ExinOne Point Card",
        "iconUrl": "https://mixin-images.zeromesh.net/HMXlpSt6KF9i-jp_ZQix9wFcMD27DrYox5kDrju6KkjvlQjQPZ2zimKKFYBJwecRTw5YAaMt4fpHXd1W0mwIxQ=s128",
        "balance": "0",
        "depositEntries": [
            {
                "destination": "0x83040BBe458d531c3bB973cda80C67c1Ee4Ac619",
                "tag": "",
                "properties": null
            }
        ],
        "destination": "0x83040BBe458d531c3bB973cda80C67c1Ee4Ac619",
        "tag": "",
        "priceBtc": "0",
        "priceUsd": "0",
        "changeBtc": "0",
        "changeUsd": "0",
        "assetKey": "0x9e6d2d6c76d97feb729d2d71dc541358565d1947",
        "precision": 18,
        "mixinId": "0cb4a900dfcef4d3387143e7bceb28be254ff64b872a58c7aba41e48f95d68df",
        "reserve": "0",
        "confirmations": 36,
        "capitalization": 0,
        "liquidity": "0"
    },
    "timestampMs": 1678852960556
}
````

