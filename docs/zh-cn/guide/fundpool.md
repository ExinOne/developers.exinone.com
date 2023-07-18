# 交易账户相关 API

ExinOne 的交易账户功能允许用户在 ExinOne 上进行资产交易,存入资产至交易账户可以获得资产分，资产分可用于借贷。
增加资产分的其他方式有：

- ExinPool 共建节点，包括锁仓和排队部分；
- 存入资产至交易账户；
- 活期宝理财

## 存入资产

向 ExinOne 机器人转账需要存入的资产,携带特定的 memo。

### 转账 Memo 规范

每个字段用 `#` 隔开，并以 BASE64 编码：
EX#FP_DEPOSIT
`NAMESPACE|ACTION`

| 行为   | NAMESPACE | ACTION     |
|------|-----------|------------|
| 存入资产 | EX        | FP_DEPOSIT |

对以下内容：

```
EX#FP_DEPOSIT
```

进行 BASE64 将得到：

```
RVgjRlBfREVQT1NJVA==
```

## 汇总信息

<APIEndpoint method="GET" url="/fund_pool" />

Headers:

| 参数            | 类型     | 描述           |
|---------------|--------|--------------|
| Authorization | string | Bearer token |

响应：

```json
{
  "code": 0,
  "success": true,
  "message": "",
  "data": {
    "lists": [
      {
        "parentAssetId": 4,
        "parentAssetSymbol": "USDT",
        "parentAssetCreditRate": "0.90",
        // 资产分比例 （资产分 = 资产分比例 * 资产价值）
        "priceUsdt": 1,
        "defaultAssetUuid": "4d8c508b-91c5-375b-92b0-ee702ed2dac5",
        // 资产分 UUID
        "balance": "21.25194099",
        // 资产余额
        "canReceive": true,
        // 是否可以接收资产
        "balanceUsdt": 21.25
      },
      {
        "parentAssetId": 49,
        "parentAssetSymbol": "TUSD",
        "parentAssetCreditRate": "0.90",
        "priceUsdt": 1,
        "defaultAssetUuid": "84d50321-50a5-330d-8d93-a64e8660371a",
        "balance": "1.9987995",
        "canReceive": true,
        "balanceUsdt": 2
      },
      {
        "parentAssetId": 695,
        "parentAssetSymbol": "DEGO",
        "parentAssetCreditRate": "0.07",
        "priceUsdt": 1.541,
        "defaultAssetUuid": "73bb1653-fd1e-3616-8de2-214b14f9ccea",
        "balance": "7.39259258",
        "canReceive": true,
        "balanceUsdt": 11.39
      }
      // ......
    ],
    "totalBalanceUsdt": 150.12,
    "totalBalanceBtc": 0.00439358
  },
  "timestampMs": 1689731689306
}
```

## 资产余额

<APIEndpoint method="GET" url="/fund_pool/asset" />

Headers:

| 参数            | 类型     | 描述           |
|---------------|--------|--------------|
| Authorization | string | Bearer token |

Params:

| 参数        | 类型     | 描述     |
|-----------|--------|--------|
| assetUuid | string | 资产UUID |

响应：

```json
{
  "code": 0,
  "success": true,
  "message": "",
  "data": {
    "balance": "21.25194099",
    "parentAssetId": 4,
    "parentAssetSymbol": "USDT",
    "defaultAssetUuid": "4d8c508b-91c5-375b-92b0-ee702ed2dac5"
  },
  "timestampMs": 1689733713978
}
```

## 提现

提现需要进行 EPC 鉴权操作，通过 EPC 鉴权后，用户可以进行提现操作。

### 获取 followId

通过该接口可获得 `followId`，该 `followId` 用于提现操作。

<APIEndpoint method="POST" url="/epc_authentication/transfer" />

Headers:

| 参数            | 类型     | 描述           |
|---------------|--------|--------------|
| Authorization | string | Bearer token |

Body:

| 参数             | 类型     | 描述                                 |
|----------------|--------|------------------------------------|
| type           | string | withdraw                           |
| payWallet      | string | fundpool                           |
| payAssetUuid   | string | 提现的资产                              |
| payAssetAmount | string | 提现资产的数量                            |
| receiveWallet  | string | mixin                              |
| traceId        | string | 可选，填入后该笔提现将以此trace_id转账，注意不能是已使用过的 |

响应：

```json
{
  "code": 0,
  "success": true,
  "message": "",
  "data": {
    "followId": "ce9a577e-50de-4a65-ab8a-5383f1a6e78d"
  }
}
```

### EPC 鉴权

向 ExinOne 机器人转账任意数量的 EPC,携带特定的 memo。

#### 转账 Memo 规范

每个字段用 `#` 隔开，并以 BASE64 编码：

`NAMESPACE|ACTION|FIELD1`

| 行为    | NAMESPACE | ACTION         | FIELD1          |
|-------|-----------|----------------|-----------------|
| EPC鉴权 | EX        | EPC_AUTH_TRANS | 上步获取到的 followId |

对以下内容：

```
EX#EPC_AUTH_TRANS#ce9a577e-50de-4a65-ab8a-5383f1a6e78d
```

进行 BASE64 将得到:

```
RVgjRVBDX0FVVEhfVFJBTlMjY2U5YTU3N2UtNTBkZS00YTY1LWFiOGEtNTM4M2YxYTZlNzhk
```

### 结果

- 提现成功

ExinOne 会携带特定 memo 转对应资产到钱包,memo 为 BASE64 JSON 字符串，JSON 对象格式如下：

````json
{
  "source": "FP",
  "type": "withdraw"
}
````

- 鉴权失败

ExinOne 会携带特定 memo 退回 EPC,memo 为 BASE64 JSON 字符串，JSON 对象格式如下：

````json
{
  "S": "EPC_AUTH_TRANS_RF",
  "O": "$trace_id"
  // EPC 鉴权时转账的 trace_id
}
````

## 还借贷

还借贷和提现操作一样，只不过获取 `followId` 时，参数有变化

Body:

| 参数             | 类型     | 描述                    |
|----------------|--------|-----------------------|
| type           | string | loan_repayment        |
| payWallet      | string | fundpool              |
| payAssetUuid   | string | 需还的资产                 |
| payAssetAmount | string | 需还资产的数量               |
| applyTraceId   | string | 需还的借贷订单的 applyTraceId |

响应：

```json
{
  "code": 0,
  "success": true,
  "message": "",
  "data": {
    "followId": "ce9a577e-50de-4a65-ab8a-5383f1a6e78d"
  }
}
```

然后进行 EPC 鉴权操作
