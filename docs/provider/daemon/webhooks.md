---
title: 'Webhooks'
sidebar_position: 4
---

The daemon supports handling webhooks that can be invoked whenever a certain event occurs during its lifecycle. Following, there's the list of all events a webhook can be registered for:

* [TRADE_SETTLED](#event-payload "trade_settled")
* [ACCOUNT_WITHDRAW](#event-payload "account_withdraw")
* ACCOUNT_LOW_BALANCE (coming soon)

A webhook is defined by an event for which it's registered to, an endpoint that is invoked whenever the event occurs, and optionally a secret used to sign a [JWT token](https://jwt.io/introduction) to authenticate requests.

## Add webhook

A webhook can be added to those handled by the daemon with:

```bash
# To add a secured webhook
$ tdex addwebhook --action TRADE_SETTLED --endpoint http://localhost:8888/endpoint --secret supersecret
# To add a non-secured webhook
$ tdex addwebhook --action TRADE_SETTLED --endpoint http://localhost:8888/endpoint
# hook id: 00000-000-000-0000
```

The daemon in response returns the id of the newly webhook created.

## List webhooks

You can list all the webhooks registered for some specific event with:

```bash
$ tdex listwebhooks --action TRADE_SETTLED
# [
#   {
#     "id": 00000-000-000-0000,
#     "action": "TRADE_SETTLED",
#     "endpoint": "http://localhost:8888/endpoint",
#     "is_secured": true
#   }
# ]
```

A list of webhooks showing their id, event, endpoint and wheter a secret is set is returned.

## Remove webhook

A webhook can be removed by specifing its id with the command:

```bash
$ tdex removewebhook --id 00000-000-000-0000
# removed hook with id: 00000-000-000-0000
```

In response, you get the confirmation os the removal of the webhook

## Event payload

In this section you can find the payload sent by the daemon to a webhook endpoint whenever a certain event occurs. All payloads are represented in JSON format.

As mentioned, the daemon takes care of authenticating its requests by adding a JWT token. The daemon produces a signatures using the HMAC-SHA256 scheme, therefore the same must be used by the web server exposing the endpoint being invoked.

### TRADE_SETTLED

Example:

```json
{
  "txid": "68790873e2e56a86844f367f9c3d64ebadc1c6d61d8cda6df0dff8010139ea95",
  "swap": {
    "amount_p": 1447,
    "asset_p":  "6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d",
    "amount_r": 41790673,
    "asset_r":  "ce091c998b83c78bb71a632313ba3760f1763d9cfcffae02258ffa9865a37bd2"
  },
  "price": {
    "base_price":  0.00003462495088,
    "quote_price": 28880.90739460
  },
  "market": {
    "base_asset":  "6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d",
    "quote_asset": "ce091c998b83c78bb71a632313ba3760f1763d9cfcffae02258ffa9865a37bd2"
  },
  "balance": {
    "base_balance":  57556016,
    "quote_balance": 376940871878
  }
}
```

### ACCOUNT_WITHDRAW

Example:

```json
{
  "market": {
		"base_asset":  "6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d",
		"quote_asset": "ce091c998b83c78bb71a632313ba3760f1763d9cfcffae02258ffa9865a37bd2"
	},
	"amount_withdraw": {
    "base_amount": 10000000,
		"quote_amount": 1000000000000,
	},
	"receiving_address": "lq1qqval07apclpjrlru50x3px9x2606fhy6h2m7km7zhgxjmqf8kxzm36mn7hxypzcuw7nk0mt25a658nzlysvjkkejc4kcuxqsc",
	"txid": "b0ad86c8efcc4eadc74aab471196d7e0773f328ca7bb54dbe4eea1c7cf8c7445",
  "balance": {
    "base_balance": 47556016,
    "quote_balance": 276940871878
  }
}
```

