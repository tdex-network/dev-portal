---
title: 'Overview'
sidebar_position: 1
---

[TDEX Feeder](https://github.com/tdex-network/tdex-feeder) is a service useful to feed one or more markets of one or more daemons with prices sourced from an exchange.

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
  "markets": [
    {
      "base_asset": "6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d",
      "quote_asset": "ce091c998b83c78bb71a632313ba3760f1763d9cfcffae02258ffa9865a37bd2",
      "ticker": "XBT/USDT",
      "targets": [
        {
          "macaroons_path": "",
          "tls_cert_path": "",
          "rpc_address": "localhost:9000",
        }
      ]
    }
  ]
}
```

In this example, the service is configured to connect to Kraken exchange.  
It must forward incoming feeds related to the BTC/USDt market every 5 minutes (*interval* time expressed in milliseconds) to a daemon that can be reached at the address `localhost:9000` via insecure connection (configured with macaroons auth/TLS encryption disabled). Take a look [here](getting_started.md#securely-connect-feeder-to-daemon) to see how to connect them via a secure connection

Note that `targets` is defined as a JSON list in order to let the feeder forward incoming price feeds of a single market to multiple daemons if needed.

Similarly, `markets` is also a JSON list therefore it's possible to configure the feeder to ask for feeds related to multiple markets. Each market has its own targets that will be updated periodically.

The latest version of this tool (v0.2.1 at the time of writing) supports only Kraken as price feeder.


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
  "markets": [
    {
      "base_asset": "6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d",
      "quote_asset": "ce091c998b83c78bb71a632313ba3760f1763d9cfcffae02258ffa9865a37bd2",
      "ticker": "XBT/USDT",
      "targets": [
        {
          "tdexdconnect_url": "tdexdconnect://localhost:9000?cert=MIICpzCCAk6gAwIBAgIRAL8OABMF9I4BA7qXQaqXwfIwCgYIKoZIzj0EAwIwQjENMAsGA1UEChMEdGRleDExMC8GA1UEAxMoTUJQZGlQaXJhbGJlcnRvLmhvbWVuZXQudGVsZWNvbWl0YWxpYS5pdDAeFw0yMTEwMDcxNDM2MTFaFw0yMjEwMDgxNDM2MTFaMEIxDTALBgNVBAoTBHRkZXgxMTAvBgNVBAMTKE1CUGRpUGlyYWxiZXJ0by5ob21lbmV0LnRlbGVjb21pdGFsaWEuaXQwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAAQ6ANPEW3WLpgD6ziosN7PdvRWwg7kYR9CrIu3qvZNychEPC9mUsXKpTVIr5B1xAaFVlCktJ97M_EtDxrUYujJOo4IBIzCCAR8wDgYDVR0PAQH_BAQDAgKkMA8GA1UdEwEB_wQFMAMBAf8wHQYDVR0OBBYEFOjOtc87r1eukTrhwXvns90Fmae4MIHcBgNVHREEgdQwgdGCKE1CUGRpUGlyYWxiZXJ0by5ob21lbmV0LnRlbGVjb21pdGFsaWEuaXSCCWxvY2FsaG9zdIIEdW5peIIKdW5peHBhY2tldIcEfwAAAYcQAAAAAAAAAAAAAAAAAAAAAYcQ_oAAAAAAAAAAAAAAAAAAAYcQ_oAAAAAAAAAQCEC_uSHHLIcEwKgB14cQ_oAAAAAAAACcVyn__lDMuocQ_oAAAAAAAADp7kZyxh-R8IcQ_oAAAAAAAABBBISbVTjXoYcQ_oAAAAAAAACu3kj__gARIjAKBggqhkjOPQQDAgNHADBEAiB92avtyxI535y1zgtEUYSoSpve6rU5mPPU5j7MLm16kwIgfZuZma37mh70_8b659p3yO1-BzI8jFwkzIzbaRnFnnQ&macaroon=AgEFdGRleGQChQEDChAaDhCJUurJJwLVwvzUH-hZEgEwGhUKBm1hcmtldBIEcmVhZBIFd3JpdGUaFwoIb3BlcmF0b3ISBHJlYWQSBXdyaXRlGg4KBXByaWNlEgV3cml0ZRoVCgZ3YWxsZXQSBHJlYWQSBXdyaXRlGhYKB3dlYmhvb2sSBHJlYWQSBXdyaXRlAAAGIHMNd7Gp6l1gYiChAySJ3JmhriJVxW8F7nF2b4aouZXl"
        }
      ]
    }
  ]
}
```

In this example, the feeder connects to a daemon in localhost and updates the prices of the LBTC/USDt market every 5 minutes. The TLS certificate and the macaroon to be used for a secure connection are encoded in the URL instead of being presented within files.

## What's next?

Now that you have completed the configuration, it's time to [start your feeder](getting_started.md).