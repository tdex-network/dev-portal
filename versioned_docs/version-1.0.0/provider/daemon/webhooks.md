---
title: 'Webhooks'
sidebar_position: 10
---

You can setup webhooks for your provider that are triggered whenever some specific event occurs during its lifecycle. A webhook is defined by the following info:

* `id` - unique identifier assigned by the provider to a webhook when it's created and used to refer to it
* `endpoint` - the endpoint triggered whenever an event occurs. The provider makes a POST request to this endpoint sending info about the occured event as payload message
* `secret` - a secret used to generate the [JWT token](https://jwt.io/introduction) added as header to authenticate the request made by the provider
* `event` - the event for which triggering the webhook

## Add webhook

A webhook can be added to those handled by the daemon with:

```bash
# Add a secured webhook triggered whenever a trade is settled.
# Check tdex webhook --help to see all available events
$ tdex webhook --endpoint http://localhost:8888/endpoint --secret secret --trade-settled-event

# Add a non-secured webhook
$ tdex webhook add --endpoint http://localhost:8888/endpoint --trade-settled-event
```

The provider returns the id of the created webhook like for example `d6c0f4cc-d04f-4fcd-b6ba-45590e4ae099`.

:::tip
If you want to setup a webhook triggered whenever any kind of events is produced by the provider, you can use the `--any-event` flag.
:::

## List webhooks

You can list all webhooks, or fileter them by some specific event with:

```bash
# List all webhooks
$ tdex webhooks

# List all webhooks filtered by events
$ tdex webhooks --trade-settled-event
```

Note that for security reasons you'll know wheter the webhooks are secured or not, but you won't be able to see their secrets eventually.

## Remove webhook

You can remove a webhook by simply providing its id. If you don't remember its id, you can list the webhooks and recognize it by its endpoint.

```bash
$ tdex webhook remove --id d6c0f4cc-d04f-4fcd-b6ba-45590e4ae099
```

## Event payload

The provider can generate several events during its lifetime and you can get notified about them by setting up one or more webhooks. Here you can find the list of all events produced by the provider and the related payload message sent when making the request to a webhook's endpoint

### TRADE_SETTLED

The daemon produces this event whenever a trade on some market has been included in blockchain. The payload message looks like the following example:

```json
{
  "event": "TRADE_SETTLED",
  "market": {
    "base_asset":  "144c654344aa716d6f3abcc1ca90e5641e4e2a7f633bc09fe3baf64585819a49",
    "quote_asset": "f3d1ec678811398cd2ae277cbe3849c6f6dbd72c74bc542f7c4b11ff0e820958"
  },
  "balance": {
    "144c654344aa716d6f3abcc1ca90e5641e4e2a7f633bc09fe3baf64585819a49": {
      "unconfirmed": 0,
      "confirmed": 57556016,
      "locked": 0
    },
    "f3d1ec678811398cd2ae277cbe3849c6f6dbd72c74bc542f7c4b11ff0e820958": {
      "unconfirmed": 0,
      "confirmed": 376940871878,
      "locked": 0
    },
  },
  "price": {
    "base_price":  0.00003462495088,
    "quote_price": 28880.90739460
  },
  "swap": {
    "amount_p": 142701,
    "asset_p":  "144c654344aa716d6f3abcc1ca90e5641e4e2a7f633bc09fe3baf64585819a49",
    "amount_r": 4179067300,
    "asset_r":  "f3d1ec678811398cd2ae277cbe3849c6f6dbd72c74bc542f7c4b11ff0e820958"
  },
  "txid": "68790873e2e56a86844f367f9c3d64ebadc1c6d61d8cda6df0dff8010139ea95",
  "settlement_timestamp": 1673797793,
	"settlement_date": "2023-01-15T15:49:53Z",
	"trading_fees": {
    "asset":  "144c654344aa716d6f3abcc1ca90e5641e4e2a7f633bc09fe3baf64585819a49",
    "amount": 1299,
  }
}
```

### ACCOUNT_DEPOSIT

```json
{
  "event": "ACCOUNT_DEPOSIT",
  "account": {
    "type": "fee",
    "name": "fee_account",
  },
  "balance": {
    "144c654344aa716d6f3abcc1ca90e5641e4e2a7f633bc09fe3baf64585819a49": {
      "unconfirmed": 13000,
      "confirmed": 0,
      "locked": 0
    }
  },
  "txid": "b0ad86c8efcc4eadc74aab471196d7e0773f328ca7bb54dbe4eea1c7cf8c7445",
	"amount_deposited": {
    "144c654344aa716d6f3abcc1ca90e5641e4e2a7f633bc09fe3baf64585819a49": 13000
	},
}
```

The daemon produces this event whenever a deposit transaction to some account gets included in mempool. The payload message looks like the following example:

### ACCOUNT_WITHDRAW

The daemon produces this event whenever a withdrawal transaction from some account gets included in mempool. The payload message looks like the following example:

```json
{
  "event": "ACCOUNT_WITHDRAW",
  "account": {
    "type": "market",
    "base_asset": "144c654344aa716d6f3abcc1ca90e5641e4e2a7f633bc09fe3baf64585819a49",
    "quote_asset": "f3d1ec678811398cd2ae277cbe3849c6f6dbd72c74bc542f7c4b11ff0e820958"
  },
  "balance": {
    "144c654344aa716d6f3abcc1ca90e5641e4e2a7f633bc09fe3baf64585819a49": {
      "unconfirmed": 10000,
      "confirmed": 57456016,
      "locked": 100000
    },
    "f3d1ec678811398cd2ae277cbe3849c6f6dbd72c74bc542f7c4b11ff0e820958": {
      "unconfirmed": 0,
      "confirmed": 376940871878,
      "locked": 0
    },
  },
  "txid": "b0ad86c8efcc4eadc74aab471196d7e0773f328ca7bb54dbe4eea1c7cf8c7445",
	"amount_withdrawn": {
    "144c654344aa716d6f3abcc1ca90e5641e4e2a7f633bc09fe3baf64585819a49": 90000
	},
}
```

### ACCOUNT_LOW_BALANCE

The daemon produces this event whenever the balances of `fee_account` or a market go below under a certain threshold.
This threshold can be configured via envorinment variable for the former - by exporting `TDEX_FEE_ACCOUNT_BALANCE_THRESHOLD`, which by default is set to 5000 sats of LBTC -, while for the latter you configure it when setting the fixed fees, that are reused here as base/quote asset balance threshold.

```json
{
  "event": "ACCOUNT_LOW_BALANCE",
	"account": {
		"type": "fee",
    "name": "fee_account"
	},
	"balance": {
    "144c654344aa716d6f3abcc1ca90e5641e4e2a7f633bc09fe3baf64585819a49": {
      "unconfirmed": 0,
      "confirmed": 4574,
      "locked": 0
    }
  }
}
```