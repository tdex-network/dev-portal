---
title: 'Configure CLI'
sidebar_position: 4
---

Now that your daemon is up and running, you need to configure the `tdex` CLI to communicate with the Operator interface.
By default, you can find the data directory of your CLI at the path `~/.tdex-operator` if using Linux or `~/Library/Application\ Support/Tdex-daemon` if using MacOs instead.

You can change the default path by exporting it into the envirnoment variable `TDEX_OPERATOR_DATADIR`.

Depending on how you started the daemon, you want to initialize your CLI like:

```sh
# By default it looks for the daemon operator gRPC interface on localhost:9000
$ tdex config init
# If the daemon is running on regtest
$ tdex config init --network regtest --explorer_url http://localhost:3001
# or on a remote machine
$ tdex config init --rpcserver example.com:9000
```

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

If, for example, you configured your daemon to authenticate/authorize access to Operator interafce RPCs with macaroons, you must set the path to the `admin.macaroon` and also the one for the TLS certificate `cert.pem` like:

```sh
# To set the path where to find admin.macaroon
$ tdex config set macaroons_path ~/.tdex-daemon/macaroons
# To set the path where to fing cert.pem
$ tdex config set tls_cert_path ~/.tdex-daemon/tls
```

If instead, your dameon's Operator interface is not proteced by this type of authentication/authorization (meaning you exported the env var TDEX_NO_MACAROONS=true at start-up), then you need to run:

```sh
# To not use macaroons auth
$ tdex config set no_macaroons true
```

You're now ready to [deposit some funds](../deposit_funds.md) to open a market.