# 借贷 API

ExinOne 的借贷功能允许用户通过质押资产增加资产分，在 ExinOne 上进行借贷。

## 借贷汇总信息

<APIEndpoint method="GET" url="/loan" />

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
    // 是否停止借贷，true 为停止
    "stopLoan": false,
    // 可借的 USDT 价值
    "availableAmount": "18",
    // 最小的借贷 USDT 价值
    "minimumLimit": "1",
    // 日利率
    "dailyInterestRate": "0.0004",
    // 逾期日利率
    "dailyOverdueRate": "0.005",
    // 借贷笔数
    "outstanding": "1",
    // 借贷 USDT 总额
    "borrowings": "1.00039984",
    // 借贷 USDT 利息总额
    "interest": "0.00040016",
    // 逾期 USDT 总额
    "overdue": "0",
    // 质押率, 小于1.1 会爆仓
    "marginRate": "21.0375"
  },
  "timestampMs": 1689218215520
}
```

## 可借额度

<APIEndpoint method="GET" url="/loan/available" />

Headers:

| 参数            | 类型     | 描述           |
|---------------|--------|--------------|
| Authorization | string | Bearer token |

Params:

| 参数        | 类型     | 描述                            |
|-----------|--------|-------------------------------|
| assetUuid | string | 借贷的资产UUID                     |
| wallet    | string | 可选，放款钱包默认 mixin, 可选值 fundpool |

响应：

```json
{
  "code": 0,
  "success": true,
  "message": "",
  "data": {
    // 是否停止借贷，true 为停止
    "stopLoan": false,
    // 资产 UUID
    "assetUuid": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
    // 资产 USDT 价格
    "assetUsdtPrice": "30180",
    // 资产符号
    "assetSymbol": "BTC",
    // 可借的 USDT 价值
    "availableUsdtAmount": "95",
    // 可借的资产数量
    "availableAmount": "0.00156383",
    // 质押率, 小于1.1 会爆仓
    "marginRate": "100",
    // 日利率
    "dailyInterestRate": "0",
    // 逾期日利率
    "dailyOverdueRate": "0"
  },
  "timestampMs": 1689647813510
}
```

## 申请借贷

向 ExinOne 机器人转账任意数量的 EPC,携带特定的 memo 申请借贷。

### 转账 Memo 规范

每个字段用 `#` 隔开，并以 BASE64 编码：

`NAMESPACE|ACTION|FIELD1|FIELD2|FIELD3|FIELD4`

| 行为   | NAMESPACE | ACTION | FIELD1   | FIELD2 | FIELD3 | FIELD4                          |
|------|-----------|--------|----------|--------|--------|---------------------------------|
| 申请借贷 | EX        | CB     | 借贷资产UUID | 借贷天数   | 借贷金额   | 放款钱包，可选，默认为 M:mixin 钱包。 FP:资金账户 |

:::tip
转账的 trace_id 最好指定，方便追踪借贷状态
:::

以借贷 0.5 BTC，借贷 3650 天，放款到 Mixin 钱包举例：

对以下内容：

```
EX#CB#c6d0c728-2624-429b-8e0d-d9d19b6592fa#3650#0.5
```

进行 BASE64 将得到：

```
RVgjQ0IjYzZkMGM3MjgtMjYyNC00MjliLThlMGQtZDlkMTliNjU5MmZhIzM2NTAjMC41
```

### 结果

- 借贷成功

ExinOne 会携带特定 memo 转对应资产到放款钱包,memo 为 BASE64 JSON 字符串，JSON 对象格式如下：

````json
{
  "S": "LO",
  // 申请借贷时转账的 trace_id
  "O": "$apply_trace_id"
}
````

- 借贷失败

ExinOne 会携带特定 memo 退回 EPC,memo 为 BASE64 JSON 字符串，JSON 对象格式如下：

````json
{
  "S": "LOAN_APPLY_RF",
  // 申请借贷时转账的 trace_id
  "O": "$apply_trace_id"
}
````

## 还借贷

向 ExinOne 机器人转账还款资产,携带特定的 memo 还借贷。

### 转账 Memo 规范

每个字段用 `#` 隔开，并以 BASE64 编码：

`NAMESPACE|ACTION|FIELD1|FIELD2|FIELD3|FIELD4`

| 行为  | NAMESPACE | ACTION | FIELD1            |
|-----|-----------|--------|-------------------|
| 还借贷 | EX        | CR     | 申请借贷时转账的 trace_id |

## 借贷订单详情

<APIEndpoint method="GET" url="/loan/detail" />

Headers:

| 参数            | 类型     | 描述           |
|---------------|--------|--------------|
| Authorization | string | Bearer token |

Params:

| 参数           | 类型     | 描述               |
|--------------|--------|------------------|
| applyTraceId | string | 申请借贷时转账的trace_id |

响应：

````json
{
  "code": 0,
  "success": true,
  "message": "",
  "data": {
    "id": 329,
    "asset": {
      "id": 7,
      "uuid": "4d8c508b-91c5-375b-92b0-ee702ed2dac5",
      "chainUuid": "43d61dcd-e413-450d-80b8-101d5e903357",
      "symbol": "USDT"
      // ......
    },
    // 借贷的金额
    "loanAmount": "2",
    // 实际转账的金额
    "sendAmount": "2",
    // 借贷天数
    "term": 3650,
    // 借贷时间
    "loanDate": 1689177600,
    // 放款钱包
    "wallet": "mixin",
    "reason": null,
    // 借贷状态
    "status": "repaying",
    //  是否已还款
    "hasRepaid": false,
    // 日利息
    "dailyInterestAmount": "0.0004",
    // 逾期日利息
    "dailyOverdueAmount": "0.005",
    // 最后还款时间
    "finalRepaymentDate": 2004537600,
    // 已使用天数
    "useDays": 1,
    // 已还款金额
    "repayAmount": "0.99960016",
    // 剩余借贷本金
    "debtAmount": "1.00039984",
    // 已还利息
    "interestAmount": "0.00039984",
    // 已还逾期金额
    "overdueAmount": "0",
    // 还款时间
    "repayDate": 1689177600,
    // 下次还款时间
    "nextRepaymentDate": 1691856000,
    // 申请借贷时转账的trace_id
    "applyTraceId": "90e58999-29f7-2903-6bf5-93759a573c53",
    "createdAt": 1689217776,
    "updatedAt": 1689218030,
    "appliedAt": 1689217822,
    "loanedAt": 1689217826,
    // 总待还款金额
    "totalPending": "1.0008",
    // 待还款本金
    "borrowingsPending": "1.00039984",
    // 待还款逾期金额
    "overduePending": "0",
    // 待还款利息
    "interestPending": "0.00040016"
  },
  "timestampMs": 1689218703050
}
````

## 借贷订单列表

<APIEndpoint method="GET" url="/loan/list" />

Headers:

| 参数            | 类型     | 描述           |
|---------------|--------|--------------|
| Authorization | string | Bearer token |

Params:

| 参数        | 类型     | 描述                                  |
|-----------|--------|-------------------------------------|
| status    | string | 状态 using：使用中 overdue：逾期 cleared：已结清 |
| dateStart | int    | 开始时间的时间戳，每日开始时间戳                    |
| dateEnd   | int    | 截止时间的时间戳，每日开始时间戳                    |

响应：

````json
{
  "code": "0",
  "success": true,
  "message": "",
  "data": [
    {
      "id": 329,
      "asset": {
        "id": 7,
        "uuid": "4d8c508b-91c5-375b-92b0-ee702ed2dac5",
        "symbol": "USDT"
        // ......
      },
      "loanAmount": "2",
      "sendAmount": "2",
      "debtAmount": "1.00039984",
      "repayAmount": "0.99960016",
      "interestAmount": "0.00039984",
      "overdueAmount": "0",
      "term": 3650,
      "loanDate": 1689177600,
      "wallet": "mixin",
      "reason": null,
      "status": "repaying",
      "hasRepaid": false,
      "applyTraceId": "90e58999-29f7-2903-6bf5-93759a573c53",
      "dailyInterestAmount": "0.0004",
      "dailyOverdueAmount": "0.005",
      "finalRepaymentDate": 2004537600,
      "createdAt": 1689217776,
      "updatedAt": 1689218030,
      "appliedAt": 1689217822,
      "loanedAt": 1689217826
    }
  ],
  "meta": {
    "total": 1,
    "count": 1,
    "perPage": 50,
    "currentPage": 1,
    "nextLink": ""
  },
  "timestampMs": 1689218584397
}
````

## 还款记录列表

<APIEndpoint method="GET" url="/loan/repayment/list" />

Headers:

| 参数            | 类型     | 描述           |
|---------------|--------|--------------|
| Authorization | string | Bearer token |

Params:

| 参数           | 类型     | 描述               |
|--------------|--------|------------------|
| applyTraceId | string | 申请借贷时转账的trace_id |

响应：

````json
{
  "code": "0",
  "success": true,
  "message": "",
  "data": [
    {
      "id": 459,
      "asset": {
        "id": 7,
        "uuid": "4d8c508b-91c5-375b-92b0-ee702ed2dac5",
        "chainUuid": "43d61dcd-e413-450d-80b8-101d5e903357",
        "symbol": "USDT"
        // ......
      },
      "amount": "1.49619459",
      "repayAmount": "1.49559635",
      "interestAmount": "0.00059824",
      "overdueAmount": "0",
      "createdAt": 1688019243,
      "updatedAt": 1688019243
    }
  ],
  "meta": {
    "total": 1,
    "count": 1,
    "perPage": 50,
    "currentPage": 1,
    "nextLink": ""
  },
  "timestampMs": 1689218830824
}
````

## 还款状态

<APIEndpoint method="GET" url="/loan/repayment/status" />

Headers:

| 参数            | 类型     | 描述           |
|---------------|--------|--------------|
| Authorization | string | Bearer token |

Params:

| 参数               | 类型     | 描述             |
|------------------|--------|----------------|
| repaymentTraceId | string | 还款转账的 trace_id |

响应：

````json
{
  "code": 0,
  "success": true,
  "message": "",
  "data": {
    "asset": {
      "id": 7,
      "uuid": "4d8c508b-91c5-375b-92b0-ee702ed2dac5",
      "chainUuid": "43d61dcd-e413-450d-80b8-101d5e903357",
      "symbol": "USDT"
      // ......
    },
    "amount": "1.49619459",
    "time": 1688019243
  },
  "timestampMs": 1689219154399
}
````

