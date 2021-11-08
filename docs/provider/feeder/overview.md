---
title: 'Overview'
sidebar_position: 1
---

[TDex Feeder](https://github.com/tdex-network/tdex-feeder) is a service useful to feed one or more markets of one or more daemons with prices sourced from an exchange.

The prices are fed to the daemon by consuming its `UpdateMarketPrice` RPC of the Operator interface.  
The daemon, therefore, requires to be fully initialized and synced in order to receive and store incoming prices.  
On the other side, the feeder must have the proper macaroon and TLS certificate to establish a secure connection with the Operator interface in case it has macaroon/TLS enabled.

## Configuration

### JSON file

The Feeder is configured with a JSON file like the following:

```json
{
  "price_feeder": "kraken",
  "interval": 300000,
  "targets": [
    {
      "macaroons_path": "",
      "tls_cert_path": "",
      "rpc_address": "localhost:9000"
    }
  ]
}
```

By default, each `price_feeder` implementation comes with a list of well-known markets that maps the Liquid asset pair of some market to the ticker used by the exchange.

At the time of writing TDex Feeder supports Kraken, Bitfinex and Coinbase exchanges as `price_feeder`s and they come with the following well-known markets:
* _L-BTC/L-USDt_ (Kraken, Bitfinex, Coinbase)
  * _L-BTC_ asset: `6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d`
  * _L-USDt_ asset: `ce091c998b83c78bb71a632313ba3760f1763d9cfcffae02258ffa9865a37bd2`
* _L-BTC/L-CAD_ (only Kraken)
  * _L-BTC_ asset: `6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d`
  * _L-CAD_ asset: `0e99c1a6da379d1f4151fb9df90449d40d0608f6cb33a5bcbfc8c265f42bab0a`


When started, if there are no well-known markets defined within the config file for the selected price feeder, the one provided by the latter is used and wrote to the configuration file.

For instance, you might see the `config.json` file changing like the example below after starting the service by using Kraken:

```json
{
  "price_feeder": "kraken",
  "interval": 300000,
  "targets": [
    {
      "macaroons_path": "",
      "tls_cert_path": "",
      "rpc_address": "localhost:9000"
    }
  ],
  "markets": {
    "kraken": [
      {
        "base_asset": "6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d",
        "quote_asset": "ce091c998b83c78bb71a632313ba3760f1763d9cfcffae02258ffa9865a37bd2",
        "ticker": "XBT/USDT"
      }
      {
        "base_asset": "6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d",
        "quote_asset": "0e99c1a6da379d1f4151fb9df90449d40d0608f6cb33a5bcbfc8c265f42bab0a",
        "ticker": "XBT/CAD"
      }
    ]
  }
}
```

This makes it easy for you to add other markets in the future, since the list in the file take precedence over the one provided by the price feeder at runtime.  This way, you can eventually add other well-known markets to the list. All you will have to do is to retrieve the hashes of the asset pair and the correct exchange's ticker.

The service, then, establishes a connection with the target daemons (with or without mac/TLS auth enabled depending on their respective configuration) and lists all their markets, **starting feeding ONLY those included in the list of well-known markets**.

In the example above, the Feeder updates the price of the markets of a daemon reachable at _localhost:9000_ every 5 minutes (`interval` is expressed in milliseconds). 

### Environment variables

The feeder supports 2 optional configuration arguments that can be modified via environment variables:

- `FEEDER_CONFIG_PATH` to change the path where to find the JSON file (defaults to `./config.json`).  
  In this case, it's required to define the path, included the name of the JSON file itself - it can be different from the default one.
- `FEEDER_LOG_LEVEL` to increase or decrease the verbosity of the service during its lifetime.

## Connect to target with Tdexdconnect URL

It is possible for the feeder to connect to its target daemons via _tdexdconnect_ URLs instead of explicitly specify the address and the paths to the TLS certificate and macaroon files.

Once you [obtain the connection URL](../../provider/tdexdconnect.md#generate-connection-url-for-tdex-feeder) for this service, you can use it in the config file like:

```json
{
  "price_feeder": "kraken",
  "interval": 300000,
  "targets": [
    {
      "tdexdconnect_url": "tdexdconnect://localhost:9000?cert=MIICpzCCAk6gAwIBAgIRAL8OABMF9I4BA7qXQaqXwfIwCgYIKoZIzj0EAwIwQjENMAsGA1UEChMEdGRleDExMC8GA1UEAxMoTUJQZGlQaXJhbGJlcnRvLmhvbWVuZXQudGVsZWNvbWl0YWxpYS5pdDAeFw0yMTEwMDcxNDM2MTFaFw0yMjEwMDgxNDM2MTFaMEIxDTALBgNVBAoTBHRkZXgxMTAvBgNVBAMTKE1CUGRpUGlyYWxiZXJ0by5ob21lbmV0LnRlbGVjb21pdGFsaWEuaXQwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAAQ6ANPEW3WLpgD6ziosN7PdvRWwg7kYR9CrIu3qvZNychEPC9mUsXKpTVIr5B1xAaFVlCktJ97M_EtDxrUYujJOo4IBIzCCAR8wDgYDVR0PAQH_BAQDAgKkMA8GA1UdEwEB_wQFMAMBAf8wHQYDVR0OBBYEFOjOtc87r1eukTrhwXvns90Fmae4MIHcBgNVHREEgdQwgdGCKE1CUGRpUGlyYWxiZXJ0by5ob21lbmV0LnRlbGVjb21pdGFsaWEuaXSCCWxvY2FsaG9zdIIEdW5peIIKdW5peHBhY2tldIcEfwAAAYcQAAAAAAAAAAAAAAAAAAAAAYcQ_oAAAAAAAAAAAAAAAAAAAYcQ_oAAAAAAAAAQCEC_uSHHLIcEwKgB14cQ_oAAAAAAAACcVyn__lDMuocQ_oAAAAAAAADp7kZyxh-R8IcQ_oAAAAAAAABBBISbVTjXoYcQ_oAAAAAAAACu3kj__gARIjAKBggqhkjOPQQDAgNHADBEAiB92avtyxI535y1zgtEUYSoSpve6rU5mPPU5j7MLm16kwIgfZuZma37mh70_8b659p3yO1-BzI8jFwkzIzbaRnFnnQ&macaroon=AgEFdGRleGQChQEDChAaDhCJUurJJwLVwvzUH-hZEgEwGhUKBm1hcmtldBIEcmVhZBIFd3JpdGUaFwoIb3BlcmF0b3ISBHJlYWQSBXdyaXRlGg4KBXByaWNlEgV3cml0ZRoVCgZ3YWxsZXQSBHJlYWQSBXdyaXRlGhYKB3dlYmhvb2sSBHJlYWQSBXdyaXRlAAAGIHMNd7Gp6l1gYiChAySJ3JmhriJVxW8F7nF2b4aouZXl"
    }
  ]
}
```

In this example, the feeder connects to a daemon in localhost and updates the prices of the _L-BTC/L-USDt_ market every 5 minutes. The TLS certificate and the macaroon to be used for a secure connection are encoded in the URL instead of being presented within files.

## What's next?

Now that you have completed the configuration, it's time to [start your feeder](getting_started.md).