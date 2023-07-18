# Trading acct. API

The Trading acct. of ExinOne allows users to trade assets on ExinOne. Depositing assets into the trade account
can obtain asset points, which can be used for lending. Other ways to increase asset points include:

- Co-building nodes with ExinPool, including locking and queuing parts;
- Deposit assets into the trading account;
- Current wealth management

## Deposit Assets

Transfer the assets to be deposited to the ExinOne robot, with a specific memo.

### Transfer Memo Specification

Each field is separated by `#` and encoded in BASE64:
EX#FP_DEPOSIT
`NAMESPACE|ACTION`

| Action         | NAMESPACE | ACTION     |
|----------------|-----------|------------|
| Deposit Assets | EX        | FP_DEPOSIT |

For the following content:

```
EX#FP_DEPOSIT
```

After BASE64 encoding, you will get:

```
RVgjRlBfREVQT1NJVA==
```

## Summary Information

<APIEndpoint method="GET" url="/fund_pool" />

Headers:

| Parameter     | Type   | Description  |
|---------------|--------|--------------|
| Authorization | string | Bearer token |

Response:

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
        // Asset points ratio (Asset points = Asset points ratio * Asset value)
        "priceUsdt": 1,
        "defaultAssetUuid": "4d8c508b-91c5-375b-92b0-ee702ed2dac5",
        // Asset points UUID
        "balance": "21.25194099",
        // Asset balance
        "canReceive": true,
        // Whether assets can be received
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

## Asset Balance

<APIEndpoint method="GET" url="/fund_pool/asset" />

Headers:

| Parameter     | Type   | Description  |
|---------------|--------|--------------|
| Authorization | string | Bearer token |

Params:

| Parameter | Type   | Description |
|-----------|--------|-------------|
| assetUuid | string | Asset UUID  |

Response:

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

## Withdraw

Withdrawal requires EPC authentication. After EPC authentication, users can withdraw.

### Get followId

You can get `followId` through this interface, which is used for withdrawal operation.

<APIEndpoint method="POST" url="/epc_authentication/transfer" />

Headers:

| Parameter     | Type   | Description  |
|---------------|--------|--------------|
| Authorization | string | Bearer token |

Body:

| Parameter      | Type   | Description                                                                |
|----------------|--------|----------------------------------------------------------------------------|
| type           | string | withdraw                                                                   |
| payWallet      | string | fundpool                                                                   |
| payAssetUuid   | string | Asset to be withdrawn                                                      |
| payAssetAmount | string | Amount of asset to be withdrawn                                            |
| receiveWallet  | string | mixin                                                                      |
| traceId        | string | Optional, if filled in, the withdrawal will be transferred with this trace 

_id, note that it cannot be used before |

Response:

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

### EPC Authentication

Transfer any amount of EPC to the ExinOne robot, with a specific memo.

#### Transfer Memo Specification

Each field is separated by `#` and encoded in BASE64:

`NAMESPACE|ACTION|FIELD1`

| Action             | NAMESPACE | ACTION         | FIELD1                                     |
|--------------------|-----------|----------------|--------------------------------------------|
| EPC Authentication | EX        | EPC_AUTH_TRANS | The followId obtained in the previous step |

For the following content:

```
EX#EPC_AUTH_TRANS#ce9a577e-50de-4a65-ab8a-5383f1a6e78d
```

After BASE64 encoding, you will get:

```
RVgjRVBDX0FVVEhfVFJBTlMjY2U5YTU3N2UtNTBkZS00YTY1LWFiOGEtNTM4M2YxYTZlNzhk
```

### Result

- Withdrawal Successful

ExinOne will transfer the corresponding assets to the wallet with a specific memo, which is a BASE64 JSON string, and
the JSON object format is as follows:

````json
{
  "source": "FP",
  "type": "withdraw"
}
````

- Authentication Failed

ExinOne will return the EPC with a specific memo, which is a BASE64 JSON string, and the JSON object format is as
follows:

````json
{
  "S": "EPC_AUTH_TRANS_RF",
  "O": "$trace_id"
  // The trace_id transferred during EPC authentication
}
````

## Repay Loan

Repaying loans is the same as withdrawal operations, but when getting `followId`, the parameters have changed.

Body:

| Parameter      | Type   | Description                                     |
|----------------|--------|-------------------------------------------------|
| type           | string | loan_repayment                                  |
| payWallet      | string | fundpool                                        |
| payAssetUuid   | string | The asset to be repaid                          |
| payAssetAmount | string | The amount of asset to be repaid                |
| applyTraceId   | string | The applyTraceId of the loan order to be repaid |

Response:

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

Then perform the EPC authentication operation.
