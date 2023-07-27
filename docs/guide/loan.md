# Loan API

ExinOne's loan feature allows users to increase asset distribution through asset collateralization and carry out loans
on ExinOne.

## Loan Summary Information

<APIEndpoint method="GET" url="/loan" />

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
    "stopLoan": false,
    // Whether to stop the loan, true means stop
    "availableAmount": "18",
    // Available USDT value
    "minimumLimit": "1",
    // Minimum USDT loan value
    "dailyInterestRate": "0.0004",
    // Daily interest rate
    "dailyOverdueRate": "0.005",
    // Daily overdue interest rate
    "outstanding": "1",
    // Number of loans
    "borrowings": "1.00039984",
    // Total USDT loan amount
    "interest": "0.00040016",
    // Total interest of USDT loan
    "overdue": "0",
    // Total overdue USDT
    "marginRate": "21.0375"
    // Margin rate, less than 1.1 will be liquidated
  },
  "timestampMs": 1689218215520
}
```

## Loanable Amount

<APIEndpoint method="GET" url="/loan/available" />

Headers:

| Parameter     | Type   | Description  |
|---------------|--------|--------------|
| Authorization | string | Bearer token |

Params:

| Parameter | Type   | Description                                                               |
|-----------|--------|---------------------------------------------------------------------------|
| assetUuid | string | UUID of the loan asset                                                    |
| wallet    | string | Optional, the default lending wallet is mixin, optional value is fundpool |

Response:

```json
{
  "code": 0,
  "success": true,
  "message": "",
  "data": {
    "stopLoan": false,
    // Whether to stop the loan, true means stop
    "assetUuid": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
    // Asset UUID
    "assetUsdtPrice": "30180",
    // Asset USDT price
    "assetSymbol": "BTC",
    // Asset symbol
    "availableUsdtAmount": "95",
    // Available USDT value
    "availableAmount": "0.00156383",
    // Available amount of the asset
    "marginRate": "100",
    // Margin rate, less than 1.1 will be liquidated
    "dailyInterestRate": "0",
    // Daily interest rate
    "dailyOverdueRate": "0"
    // Daily overdue interest rate
  },
  "timestampMs": 1689647813510
}
```

## Apply for a Loan

Transfer any amount of EPC to the ExinOne robot and carry a specific memo to apply for a loan.

### Transfer Memo Specification

Each field is separated by `#` and encoded with BASE64:

`NAMESPACE|ACTION|FIELD1|FIELD2|FIELD3|FIELD4`

| Action           | NAMESPACE | ACTION | FIELD1          | FIELD2    | FIELD3      | FIELD4                                                                      |
|------------------|-----------|--------|-----------------|-----------|-------------|-----------------------------------------------------------------------------|
| Apply for a loan | EX        | CB     | Loan asset UUID | Loan term | Loan amount | Wallet for the loan, optional, default is M: mixin wallet. FP: fund account |

::: tip
It is better to specify the trace_id of the transfer for tracking the loan status.
:::

Example of applying for a loan of 0.5 BTC for 3650 days and the loan goes to the Mixin wallet:

The following content:

```
EX#CB#c6d0c728-2624-429b-8e0d-d9d19b6592fa#3650#0.5
```

Will get:

```
RVgjQ0IjYzZkMGM3MjgtMjYyNC00MjliLThlMGQtZDlkMTliNjU5MmZhIzM2NTAjMC41
```

### Result

- Disbursing to Mixin Wallet

ExinOne will transfer the corresponding assets to the disbursement wallet with a specific memo, which is a BASE64 JSON string. The format of the JSON object is as follows:

```json
{
  "S": "LO",
  // The trace_id when applying for the loan
  "O": "$apply_trace_id"
}
```

-  Loan Successful

ExinOne will transfer the EPC with a specific memo. The memo is a BASE64 JSON string, and the JSON object format is as follows:

```json
{
  "S": "LOAN_APPLY_PASS",
  // trace_id of the transfer when applying for a loan
  "O": "$apply_trace_id"
}
```

- Loan failed

ExinOne will return EPC with a specific memo. The memo is a BASE64 JSON string, and the JSON object format is as
follows:

```json
{
  "S": "LO",
  // trace_id of the transfer when applying for a loan
  "O": "$apply_trace_id"
}
```
