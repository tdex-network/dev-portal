---
title: 'Getting Started'
sidebar_position: 2
---

The TDEX daemon can be executed either as a [Docker container](#run-with-docker) or as a [standalone application](#run-standalone).

## Run with Docker

Pull the official TDEX daemon image from the Github Container registry:

```sh
$ docker pull ghcr.io/tdex-network/tdexd:latest
```

Start the daemon:

```sh
# Run on Liquid network connecting to blockstream.info for sourcing blockchain data
$ docker run -it -d --name tdexd --restart unless-stopped -p 9945:9945 -p 9000:9000 -v `pwd`/tdexd:/.tdex-daemon ghcr.io/tdex-network/tdexd:latest

# Run on Liquid connecting to a local explorer
$ docker run -it -d --name tdexd --restart unless-stopped -p 9945:9945 -p 9000:9000 -v `pwd`/tdexd:/.tdex-daemon -e TDEX_EXPLORER_ENDPOINT="http://127.0.0.1:3001" ghcr.io/tdex-network/tdexd:latest

# Run on Regtest connecting to a local explorer and using regtest LBTC asset hash.
$ docker run -it -d --name tdexd --restart unless-stopped -p 9945:9945 -p 9000:9000 -v `pwd`/tdexd:/.tdex-daemon -e TDEX_NETWORK="regtest" -e TDEX_BASE_ASSET="5ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225" -e TDEX_EXPLORER_ENDPOINT="http://127.0.0.1:3001"  ghcr.io/tdex-network/tdexd:latest

# Run on Liquid and specify USDt as base asset instead of default L-BTC
$ docker run -it -d --name tdexd --restart unless-stopped -p 9945:9945 -p 9000:9000 -v `pwd`/tdexd:/.tdex-daemon -e TDEX_BASE_ASSET="ce091c998b83c78bb71a632313ba3760f1763d9cfcffae02258ffa9865a37bd2" ghcr.io/tdex-network/tdexd:latest
```

This will mount the data directory in a folder called `tdexd` in your current path.

See the [Configuration](overview.md#configuration) section for all available options.

Check the logs:

```sh
$ docker logs tdex
INFO[0000] trader interface is listening on :9945
INFO[0000] operator interface is listening on :9945
```

*Hint*: the tdexd image comes also with the CLI, so you can create an alias to use it like:

```sh
$ alias tdex='docker exec tdexd tdex'
```

Next step is to [configure the operator CLI](#configure-operator-cli).

## Run standalone

In order to run the daemon as a standalone executable you need to:

1. Download the latest [releases](https://github.com/tdex-network/tdex-daemon/releases) of daemon (tdexd) and CLI (tdex) for MacOS or Linux.

2. Move the binaries into a folder in your PATH (eg. `/usr/local/bin`) and rename the daemon as just `tdexd` and the CLI as `tdex`.

3. Give them executable permissions. (eg. `chmod a+x /usr/local/bin/tdexd` and `chmod a+x /usr/local/bin/tdex`)


Now you're ready to start the daemon:

```sh
# Run on Liquid network connecting to blockstream.info for sourcing blockchain data
$ tdexd

# Run on Liquid connecting to a local explorer
$ export TDEX_EXPLORER_ENDPOINT="http://127.0.0.1:3001"
$ tdexd

# Run on Regtest connecting to a local explorer and using regtest LBTC asset hash.
$ export TDEX_NETWORK="regtest"
$ export TDEX_BASE_ASSET="5ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225"
$ export TDEX_EXPLORER_ENDPOINT="http://127.0.0.1:3001"
$ tdexd

# Run on Liquid and specify USDt as base asset instead of default L-BTC
$ export TDEX_BASE_ASSET="ce091c998b83c78bb71a632313ba3760f1763d9cfcffae02258ffa9865a37bd2"
$ tdexd
```

You will find the data directory at the path `~/.tdex-daemon` if using Linux or, instead, `~/Library/Application\ Support/Tdex-daemon` if using a MacOs.

Next step is to [configure the operator CLI](#configure-operator-cli).

## Configure operator CLI

Now that your daemon is up and running, you need to configure the `tdex` CLI to communicate with the Operator interface.

Depending on how you started your daemon, you want to initialize your CLI like:

```sh
# By default it looks for the daemon operator gRPC interface on localhost:9000
$ tdex config init
# If the daemon is running on regtest
$ tdex config init --network regtest --explorer_url http://localhost:3001
# or on a remote machine
$ tdex config init --rpcserver example.com:9000
```

You can always check the current state with the following command

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

If instead, your dameon's Operator interface is not proteced by this type of authentication/authorization, then you need to run:

```sh
# To not use macaroons auth
$ tdex config set no_macaroons true
```