---
title: 'TDexdconnect'
sidebar_position: 5
---

To connect a service with your daemon, like for example the Operator CLI, you have to first configure it, and generally, this is done by creating a configuration file for the service, or by tweaking some flags or environment variables at its startup.

`tdexdconnect` is a service that aims to facilitate this pairing process and make it full-automatized.  

With this service you can generate a single URL or a QRCode that other clients can parse/scan to automatically connect with your daemon's Operator interface, without requiring to configure things like the address and port where to reach it, or whether to use a TLS certificate and macaroon if the auth is enabled.

By default, `tdexdconnect` looks into the daemon's datadir (`~/.tdex-daemon` in Linux, `~/Library/Application\ Support/Tdex-daemon` in OSX) to find at least a TLS certificate to encode. If the macaroon file is not found it won't be included because it should mean that the daemon hasn't been initialized yet.

The URL generated in this case can be used **ONLY** by the operator CLI. Other applications such as the TDex feeder require also the macaroon to be encoded, therefore make sure to generate the URL with `tdexdconnect` only after the initialization phase has completed for these apps.

You can explicitly set where to find a TLS certificate or a macaroon file with the flags `--tls_cert_path` and `--macaroons_path`. The service will return an error in case the files are not found or the paths are invalid.

If you have disabled the TLS/macaroon auth on your daemon's Operator interface, you can skip the encoding of the certificate and macaroon with the `--insecure` flag.

## Generate connection URL for operator CLI

After you started up your daemon, you can generate a connection URL with:

```bash
$ tdexdconnect --out url
# tdexdconnect://localhost:9000?cert=MIICpzCCAk6gAwIBAgIRAL8OABMF9I4BA7qXQaqXwfIwCgYIKoZIzj0EAwIwQjENMAsGA1UEChMEdGRleDExMC8GA1UEAxMoTUJQZGlQaXJhbGJlcnRvLmhvbWVuZXQudGVsZWNvbWl0YWxpYS5pdDAeFw0yMTEwMDcxNDM2MTFaFw0yMjEwMDgxNDM2MTFaMEIxDTALBgNVBAoTBHRkZXgxMTAvBgNVBAMTKE1CUGRpUGlyYWxiZXJ0by5ob21lbmV0LnRlbGVjb21pdGFsaWEuaXQwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAAQ6ANPEW3WLpgD6ziosN7PdvRWwg7kYR9CrIu3qvZNychEPC9mUsXKpTVIr5B1xAaFVlCktJ97M_EtDxrUYujJOo4IBIzCCAR8wDgYDVR0PAQH_BAQDAgKkMA8GA1UdEwEB_wQFMAMBAf8wHQYDVR0OBBYEFOjOtc87r1eukTrhwXvns90Fmae4MIHcBgNVHREEgdQwgdGCKE1CUGRpUGlyYWxiZXJ0by5ob21lbmV0LnRlbGVjb21pdGFsaWEuaXSCCWxvY2FsaG9zdIIEdW5peIIKdW5peHBhY2tldIcEfwAAAYcQAAAAAAAAAAAAAAAAAAAAAYcQ_oAAAAAAAAAAAAAAAAAAAYcQ_oAAAAAAAAAQCEC_uSHHLIcEwKgB14cQ_oAAAAAAAACcVyn__lDMuocQ_oAAAAAAAADp7kZyxh-R8IcQ_oAAAAAAAABBBISbVTjXoYcQ_oAAAAAAAACu3kj__gARIjAKBggqhkjOPQQDAgNHADBEAiB92avtyxI535y1zgtEUYSoSpve6rU5mPPU5j7MLm16kwIgfZuZma37mh70_8b659p3yO1-BzI8jFwkzIzbaRnFnnQ

# Or generate one with no TLS cert/macaroon if auth is disabled
$ tdexdconnect --out url --insecure
# tdexdconnect://localhost:9000
```

In case you want to configure your local CLI to connect with a remote daemon, within the machine hosting the daemon run:

```bash
$ tdexdconnect --out url --rpcserver "1.2.3.4:9000"
# tdexdconnect://1.2.3.4:9000?cert=MIICpzCCAk6gAwIBAgIRAL8OABMF9I4BA7qXQaqXwfIwCgYIKoZIzj0EAwIwQjENMAsGA1UEChMEdGRleDExMC8GA1UEAxMoTUJQZGlQaXJhbGJlcnRvLmhvbWVuZXQudGVsZWNvbWl0YWxpYS5pdDAeFw0yMTEwMDcxNDM2MTFaFw0yMjEwMDgxNDM2MTFaMEIxDTALBgNVBAoTBHRkZXgxMTAvBgNVBAMTKE1CUGRpUGlyYWxiZXJ0by5ob21lbmV0LnRlbGVjb21pdGFsaWEuaXQwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAAQ6ANPEW3WLpgD6ziosN7PdvRWwg7kYR9CrIu3qvZNychEPC9mUsXKpTVIr5B1xAaFVlCktJ97M_EtDxrUYujJOo4IBIzCCAR8wDgYDVR0PAQH_BAQDAgKkMA8GA1UdEwEB_wQFMAMBAf8wHQYDVR0OBBYEFOjOtc87r1eukTrhwXvns90Fmae4MIHcBgNVHREEgdQwgdGCKE1CUGRpUGlyYWxiZXJ0by5ob21lbmV0LnRlbGVjb21pdGFsaWEuaXSCCWxvY2FsaG9zdIIEdW5peIIKdW5peHBhY2tldIcEfwAAAYcQAAAAAAAAAAAAAAAAAAAAAYcQ_oAAAAAAAAAAAAAAAAAAAYcQ_oAAAAAAAAAQCEC_uSHHLIcEwKgB14cQ_oAAAAAAAACcVyn__lDMuocQ_oAAAAAAAADp7kZyxh-R8IcQ_oAAAAAAAABBBISbVTjXoYcQ_oAAAAAAAACu3kj__gARIjAKBggqhkjOPQQDAgNHADBEAiB92avtyxI535y1zgtEUYSoSpve6rU5mPPU5j7MLm16kwIgfZuZma37mh70_8b659p3yO1-BzI8jFwkzIzbaRnFnnQ
```

Change the IP address  `1.2.3.4` in the example with the public one associated with your remote host and make sure to use the correct port based on the configuration of your daemon (the default for the Operator interface is `9000`).

Now, configure the CLI with:

```bash
$ tdex config connect "tdexdconnect://..."
#
# CLI configured via tdexdconnect URL.
# Check configuration with `tdex config`
```

And this is all you need to do to be ready to [initialize the daemon's wallet](daemon/init_daemon.md).

## Generate connection URL for TDex Feeder

The feeder service makes use of a dedicated macaroon file named `price.macaroon` that can be found in the daemon's datadir **AFTER* it's been initialized.  
This caveat limits its user to have access only to the UpdateMarketPrice RPC of the Operator interface.

To generate a connection URL usable by a feeder service for one of its targets, in the daemon's host run:

```bash
$ tdexdconnect --out url --macaroons_path ~/.tdex-daemon/macaroons/price.macaroon
# tdexdconnect://localhost:9000?cert=MIICpzCCAk6gAwIBAgIRAL8OABMF9I4BA7qXQaqXwfIwCgYIKoZIzj0EAwIwQjENMAsGA1UEChMEdGRleDExMC8GA1UEAxMoTUJQZGlQaXJhbGJlcnRvLmhvbWVuZXQudGVsZWNvbWl0YWxpYS5pdDAeFw0yMTEwMDcxNDM2MTFaFw0yMjEwMDgxNDM2MTFaMEIxDTALBgNVBAoTBHRkZXgxMTAvBgNVBAMTKE1CUGRpUGlyYWxiZXJ0by5ob21lbmV0LnRlbGVjb21pdGFsaWEuaXQwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAAQ6ANPEW3WLpgD6ziosN7PdvRWwg7kYR9CrIu3qvZNychEPC9mUsXKpTVIr5B1xAaFVlCktJ97M_EtDxrUYujJOo4IBIzCCAR8wDgYDVR0PAQH_BAQDAgKkMA8GA1UdEwEB_wQFMAMBAf8wHQYDVR0OBBYEFOjOtc87r1eukTrhwXvns90Fmae4MIHcBgNVHREEgdQwgdGCKE1CUGRpUGlyYWxiZXJ0by5ob21lbmV0LnRlbGVjb21pdGFsaWEuaXSCCWxvY2FsaG9zdIIEdW5peIIKdW5peHBhY2tldIcEfwAAAYcQAAAAAAAAAAAAAAAAAAAAAYcQ_oAAAAAAAAAAAAAAAAAAAYcQ_oAAAAAAAAAQCEC_uSHHLIcEwKgB14cQ_oAAAAAAAACcVyn__lDMuocQ_oAAAAAAAADp7kZyxh-R8IcQ_oAAAAAAAABBBISbVTjXoYcQ_oAAAAAAAACu3kj__gARIjAKBggqhkjOPQQDAgNHADBEAiB92avtyxI535y1zgtEUYSoSpve6rU5mPPU5j7MLm16kwIgfZuZma37mh70_8b659p3yO1-BzI8jFwkzIzbaRnFnnQ&macaroon=AgEFdGRleGQChQEDChAaDhCJUurJJwLVwvzUH-hZEgEwGhUKBm1hcmtldBIEcmVhZBIFd3JpdGUaFwoIb3BlcmF0b3ISBHJlYWQSBXdyaXRlGg4KBXByaWNlEgV3cml0ZRoVCgZ3YWxsZXQSBHJlYWQSBXdyaXRlGhYKB3dlYmhvb2sSBHJlYWQSBXdyaXRlAAAGIHMNd7Gp6l1gYiChAySJ3JmhriJVxW8F7nF2b4aouZXl
```

In the example above the feeder will connect the daemon in localhost, but you can change the daemon's address with the `--rpcserver` flag if you need.

Now you can follow the steps to [start a feeder service](feeder/overview.md).

