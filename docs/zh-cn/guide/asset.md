# 资产 API

获取资产相关信息

## 资产关系

<APIEndpoint method="GET" url="/asset/relations" />


响应：

```json
{
  "code": 0,
  "success": true,
  "message": "",
  "data": [
    {
      // 父资产ID
      "parentAssetId": 7,
      // 镜像币信息
      "mirrorAsset": null,
      // 资产列表
      "assets": [
        {
          "id": 7,
          "name": "Tether USD",
          "symbol": "USDT",
          "mixinId": "4d8c508b-91c5-375b-92b0-ee702ed2dac5",
          "mixinChainId": "43d61dcd-e413-450d-80b8-101d5e903357",
          "parentAssetId": 7
        },
        ...
      ]
    },
    {
      "parentAssetId": 11,
      "mirrorAsset": {
        "id": 112,
        "name": "BTC Mirror Token",
        "symbol": "exBTC",
        "mixinId": "71fc5593-bc53-37bf-a94c-cff8e4b29377",
        "mixinChainId": "b7938396-3f94-4e0a-9179-d3440718156f",
        "parentAssetId": 11
      },
      "assets": [
        {
          "id": 12,
          "name": "Bitcoin",
          "symbol": "BTC",
          "mixinId": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
          "mixinChainId": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
          "parentAssetId": 11
        }
      ]
    }
  ],
  "timestampMs": 1691656217264
}
```
