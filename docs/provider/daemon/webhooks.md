---
title: 'Webhooks'
sidebar_position: 4
---

The daemon supports handling webhooks that are invoked when some kind of event happens during its lifecycle. The full list of events can be found [here](https://pkg.go.dev/github.com/tdex-network/tdex-daemon@v0.4.0-rc.1/internal/core/application#pkg-constants).

A webhook is defined by an event for which it's registered to, an endpoint that is invoked whenever the event occurs, and optionally a secret used to sign a [JWT token](https://jwt.io/introduction) to authenticate requests.

By using the CLI you can add a webhook with:

```sh
# To add a secured webhook
$ tdex addwebhook --action TRADE_SETTLED --endpoint http://localhost:8888/endpoint --secret supersecret
# To add a non-secured webhook
$ tdex addwebhook --action TRADE_SETTLED --endpoint http://localhost:8888/endpoint
# hook id: 00000-000-000-0000
```

The daemon in response returns the id of the webhook.  
It is important to backup the webhook id because it must be used in case you want to remove the webhook:

```sh
$ tdex removewebhook --id 00000-000-000-0000
# removed hook with id: 00000-000-000-0000
```

You can always list all the webhooks registered for some specific daemon's event with:

```sh
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