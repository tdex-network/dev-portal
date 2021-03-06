---
title: 'Configure CLI'
sidebar_position: 5
---

Now that your daemon is up and running, you have to configure the `tdex` CLI to communicate with the Operator interface depending on its version.

By default, you can find the data directory of your CLI at the path `~/.tdex-operator` if using Linux or `~/Library/Application\ Support/Tdex-daemon` if using MacOs instead.

You can change the default path by exporting it into the envirnoment variable `TDEX_OPERATOR_DATADIR`.

## Configure the CLI

By default, the CLI now creates a new state file its datadir if it doesn't find one whatever command you try to run.

The default configuration of the CLI is:

```
no_macaroons: false
tls_cert_path: /home/user/.tdex-daemon/tls/cert.pem
macaroons_path: /home/user/.tdex-daemon/macaroons/admin.macaroon
network: liquid
explorer_url: https://blockstream.info/liquid/api
rpcserver: localhost:9000
```

to connect to a local daemon whose Operator interface is reachable at address `localhost:9000` with macaroons/TLS auth enabled. Run `tdex config` to see the default configuration.

You can still use `config set` or `config init` in case you want to customize your CLI configuration

If, for example, you're running the CLI on local machine while your daemon is in a remote one, you'll need to specify the path where to find the macaroons file and the TLS cert path like:

```bash
# To set the path where to find admin.macaroon
$ tdex config set macaroons_path path/to/admin.macaroons
# To set the path where to fing cert.pem
$ tdex config set tls_cert_path path/to/cert.pem
```

If instead, your dameon's Operator interface is not proteced by this type of authentication/authorization (meaning you exported the env var TDEX_NO_MACAROONS=true at start-up), then you need to run:

```bash
# To not use macaroons auth
$ tdex config set no_macaroons true
```

You're now ready to [initialize and unlock your daemon's internal HD wallet](../init_daemon.md).

## Configure the CLI with tdexdconnect

If you don't want to manually customize the default configuration of your Operator CLI and you're looking for a way to automatize this process, you can check out how to use _tdexdconnect_ to [configure the CLI](../../tdexdconnect.md#generate-connection-url-for-operator-cli) before initializing your wallet.
