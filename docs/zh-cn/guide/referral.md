# 返佣 API

本文档包含返佣相关的 API。您可以在[用户详情](./users#用户详情)接口获取返佣标识。返佣标识为`data.ref`，默认为`m.(Mixin ID)`。部分用户可能是由机器人创建的子账户，没有`Mixin ID`，返回其他标识。在交易时，只需在 memo 中携带返佣标识，即可获得返佣。

## 注册返佣

对于不想注册为 ExinOne 用户，又想获得返佣的用户，可以主动注册返佣信息。操作简单，只需转 0.00000001 EPC 给 ExinOne 机器人，携带 memo 为 `RVgjUkVGX1JFRw==`。

### 转账 Memo 规范

每个字段用 `#` 隔开，并以 BASE64 编码：

`NAMESPACE|ACTION`

| 行为 | NAMESPACE | ACTION  |
| ---- | ---- | ---- | 
| 注册返佣 | EX | REF_REG  |

对以下内容：

```
EX#REF_REG
```

进行 BASE64 编码将得到：

```
RVgjUkVGX1JFRw==
```

注册成功后，您将收到 ExinOne 转账 EPC，memo 内容经 BASE64 解码后得到一个 JSON 对象，内容如下：

````json
{
    "t":"REF_REG",
    "f": "xx-xxx-xxx", // 转账的 trace_id
    "ref":"m.xxxxx", // 返佣标识
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
        // 返佣比例
        "percentage": "0.1",
        // 返佣标识
        "ref": "m.37400517",
        // 返佣获得的 USDT 数量
        "usdtAmountTotal": "0",
        // 返佣获得的 EPC 数量
        "epcAmountTotal": "0.195",
        // 返佣总笔数
        "count": 1
    },
    "timestampMs": 1682058015939
}
````
