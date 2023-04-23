# 用户 API

此文档包含用户相关的 API。

## 用户详情

<APIEndpoint method="GET" url="/users/me" />

我们通过「用户详情」接口可以获取到用户的 EPC 钱包地址，当该钱包有足够的 EPC 时，可以抵扣支持 EPC 抵扣服务费的交易

### Headers: 

| 参数 | 类型 | 描述 |
| -- | -- | -- |
| Authorization | string | Bearer token


### 响应：

````json
{
    "code": "0",
    "success": true,
    "message": "",
    "data": {
        "uuid": "524e2f84-8756-40bb-886e-c92ce1b2e25a", // mixin client_id
        "epcUuid": "a0655f19-554a-3ff1-98b8-491de27b901f", // epc 钱包 client_id
        "creditTotal": "0",
        "creditUsed": "0",
        "creditAvailable": "0",
        "creditUpdatedAt": 1677207797,
        "ref": "m.3740051", // 返佣标识
        "refPercentage": "0.1" // 返佣比例
    },
    "timestampMs": 1678853464224
}
````

## 返佣统计

<APIEndpoint method="GET" url="/referral_statistics/me" />

该接口返回返佣相关数据

### Headers: 

| 参数 | 类型 | 描述 |
| -- | -- | -- |
| Authorization | string | Bearer token


### 响应：

````json
{
    "code": "0",
    "success": true,
    "message": "",
    "data": {
        "percentage": "0.1", // 返佣比例
        "ref": "m.37400517", // 返佣标识
        "usdtAmountTotal": "0", // 返佣获得的 USDT 数量
        "epcAmountTotal": "0.195", // 返佣获得的 EPC 数量
        "count": 1 // 返佣总笔数
    },
    "timestampMs": 1682058015939
}
````
