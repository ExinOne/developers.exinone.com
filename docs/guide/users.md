# User API

This document contains APIs related to users.

## User Details

<APIEndpoint method="GET" url="/users/me" />

We can obtain the user's EPC wallet address through the "User Details" API. When the wallet has enough EPC, it can be used to deduct the service fee that supports EPC deduction for transactions.

### Headers:

| Parameter     | Type   | Description  |
| ------------- | ------ | ------------ |
| Authorization | string | Bearer token |

### Response:

```json
{
    "code": "0",
    "success": true,
    "message": "",
    "data": {
        "uuid": "524e2f84-8756-40bb-886e-c92ce1b2e25a", // mixin client_id
        "epcUuid": "a0655f19-554a-3ff1-98b8-491de27b901f", // epc wallet client_id
        "creditTotal": "0",
        "creditUsed": "0",
        "creditAvailable": "0",
        "creditUpdatedAt": 1677207797,
        "percentage": "0.1", // Commission rate
        "ref": "m.3740051", // Referral identifier
    },
    "timestampMs": 1678853464224
}
```