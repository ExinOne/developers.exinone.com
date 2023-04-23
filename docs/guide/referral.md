# Referral Commission API

This document contains APIs related to referral commissions. You can obtain the referral identifier through the [User Details](./users#UserDetails) interface. The referral identifier is `data.ref`, with the default being `m.(Mixin ID)`. Some users may have sub-accounts created by bots, without a `Mixin ID`, and will return other identifiers. To receive a commission during transactions, simply include the referral identifier in the memo.

## Register for Referral Commission

For those who do not want to register as ExinOne users but still wish to receive referral commissions, you can actively register your referral information. It's a simple process - just transfer 0.00000001 EPC to the ExinOne bot, with the memo set to `RVgjUkVGX1JFRw==`.

### Transfer Memo Specification

Separate each field with `#` and encode using BASE64:

`NAMESPACE|ACTION`

| Behavior | NAMESPACE | ACTION  |
| ---- | ---- | ---- | 
| Register for Referral Commission | EX | REF_REG  |

For the following content:

```
EX#REF_REG
```

Encode it using BASE64 to get:

```
RVgjUkVGX1JFRw==
```

Once registration is successful, you will receive an EPC transfer from ExinOne. After decoding the BASE64 content of the memo, you will obtain a JSON object with the following content:
````json
{
    "t":"REF_REG",
    "f": "xx-xxx-xxx", // trace_id
    "ref":"m.xxxxx", // Referral identifier
}
````

## Referral Commission Statistics

<APIEndpoint method="GET" url="/referral_statistics/me" />

This interface returns data related to referral commissions.

### Headers: 

| Parameter | Type | Description |
| -- | -- | -- |
| Authorization | string | Bearer token


### Response:

```json
{
    "code": "0",
    "success": true,
    "message": "",
    "data": {
        "percentage": "0.1", // Commission rate
        "ref": "m.3740051", // Referral identifier
        "usdtAmountTotal": "0", // Total USDT amount obtained through commissions
        "epcAmountTotal": "0.195", // Total EPC amount obtained through commissions
        "count": 1 // Total number of commission transactions
    },
    "timestampMs": 1682058015939
}
```
