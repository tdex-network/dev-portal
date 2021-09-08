---
title: 'Configure CLI'
sidebar_position: 5
---

Now that your daemon is up and running, you may need to configure the `tdex` CLI to communicate with the Operator interface depending on its version.

By default, you can find the data directory of your CLI at the path `~/.tdex-operator` if using Linux or `~/Library/Application\ Support/Tdex-daemon` if using MacOs instead.

You can change the default path by exporting it into the envirnoment variable `TDEX_OPERATOR_DATADIR`.

## Daemon prior to v0.5.1

Depending on how you started the daemon, you need to initialize your CLI like:

```sh
# By default it looks for the daemon operator gRPC interface on localhost:9000
$ tdex config init
# If the daemon is running on regtest
$ tdex config init --network=regtest --explorer_url=http://localhost:3001
# or on a remote machine
$ tdex config init --rpcserver=example.com:9000
```

Run `tdex config init --help` to see the list of all supported flags.

You can always check the current state with the following command:

```sh
$ tdex config
# network: regtest
# explorer_url: http://localhost:3001
# rpcserver: localhost:9000
# tls_cert_path:
# no_macaroons: true
# macaroons_path:
```

The entries of the state of the CLI are configurable with:

```sh
# To set the current network
$ tdex config set <state_key> <value>
```

If, for example, you're running the CLI on local machine while your daemon is in a remote one, you'll need to specify the path where to find the macaroons file and the TLS cert path like:

```sh
# To set the path where to find admin.macaroon
$ tdex config set macaroons_path path/to/admin.macaroons
# To set the path where to fing cert.pem
$ tdex config set tls_cert_path path/to/cert.pem
```

If instead, your dameon's Operator interface is not proteced by this type of authentication/authorization (meaning you exported the env var TDEX_NO_MACAROONS=true at start-up), then you need to run:

```sh
# To not use macaroons auth
$ tdex config set no_macaroons true
```

You're now ready to [deposit some funds](../deposit_funds.md) to open a market.

## Daemon v0.5.1 and above

If you're running a daemon of version v0.5.1 or above, the configuration phase has become optional.  
By default, the CLI now creates a new state file its datadir if it doesn't find one whatever command you try to run.

The default configuration of the CLI is for connecting to a local daemon whose Operator interface runs on `localhost:9000` with macaroons/TLS auth and related file paths defaulting to daemon's default datadir.  
Try to run `tdex config` to see the default configuration.

You can still use `config set` or `config init` in case you want to customize your CLI configuration