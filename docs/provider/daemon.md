---
title: 'Daemon'
sidebar_position: 2
---

Daemon implementation to execute automated market marking strategies on top of TDEX

## Overview

The daemon exposes two HTTP/2 gRPC interfaces, one meant to be public to be consumed by traders that fully implements [BOTD #4](https://github.com/tdex-network/tdex-specs/blob/master/04-trade-protocol.md) called **trader interface** (by default on the port **9945**) and another private to be consumed by the liquidity provider for internal management called **operator interface** by default on the port **9000**).

The daemon has an embedded Liquid wallet and sources blockchain information via a block explorer. At the time of writing the supported explorers are the [Blockstream fork of Electrs](https://github.com/blockstream/electrs), and the Elements node. By default the first is used and the daemon connects to [Blockstream.info](https://blockstream.info/liquid/api/)

<!-- 
### NEW: Elements node as explorer
From version 0.2.0, it is possible to connect the daemon directly to an Elements node instead of sourcing blockchain data from the default Electrs explorer.
You must use the `TDEX_ELEMENTS_RPC_ENDPOINT` env var to set the endpoint for connecting the daemon to the node.  
Currently, only insecure connection (no TLS encryption) is available,  therefore is highly suggested to run both the daemon and the Elements node in a local trusted network.  
Restoring a wallet using this kind of block explorer is not supported yet, thus you MUST create a brand new wallet for the daemon.

It is mandatory to tweak the node's configuration with `server=1` to let it serve daemon's requests during its lifetime. It's highly suggested to also change the `rpcworkqueue` from its default value (`16`) to `128` or `256`, to let the node being able to serve more concurrent requests at the same time (this is something that won't always be necessary in future versions).

You might want to look at [tdex-box](https://github.com/Tdex-network/tdex-box.git), a docker-compose solution for running a daemon in a production environment, which comes with an already configured Elements node along with other services.
 -->
**Operator API**

The API for the operator interface are documented [here](https://github.com/TDex-network/tdex-protobuf/blob/beta/docs/docs.md#operator)

## Data directory

The first time you run the daemon, it creates a **data directory** in `~/.tdex-daemon` and it is used to persist the wallet and the state in an embedded database.
It's possible to use a different path for the data directory exporting the environment variable `TDEX_DATA_DIR_PATH`. If you use docker you must mount the volume pointing to the different chosen path.

**Be sure to replicate this data directory to keep your markets running in case of hardware failures. You can restore the access of your funds and the markets with your mnemonic seed**

## Run

Use one of the following methods to run a TDEX daemon on your machine:

* [Docker](#run-with-docker)
* [Standalone](#run-standalone)

## Run with Docker

#### Pull from Github Packages

```sh
$ docker pull ghcr.io/tdex-network/tdexd:latest
```

#### Start the daemon

```sh
# Run on Liquid network connecting to blockstream.info for sourcing blockchain data
$ docker run -it -d --name tdexd --restart unless-stopped -p 9945:9945 -p 9000:9000 -v `pwd`/tdexd:/.tdex-daemon ghcr.io/tdex-network/tdexd:latest

# Run on Liquid connecting to a local explorer
$ docker run -it -d --name tdexd --restart unless-stopped -p 9945:9945 -p 9000:9000 -v `pwd`/tdexd:/.tdex-daemon -e TDEX_EXPLORER_ENDPOINT="http://127.0.0.1:3001" ghcr.io/tdex-network/tdexd:latest

# Run on Liquid connecting to a local Elements node
$ docker run -it -d --name tdexd --restart unless-stopped -p 9945:9945 -p 9000:9000 -v 'pwd'/tdexd:/.tdexd -e TDEX_ELEMENTS_RPC_ENDPOINT="http://rpcuser:rpcpassword@127.0.0.1:7041" ghcr.io/tdex-network/tdexd:latest

# Run on Regtest connecting to a local explorer and using regtest LBTC asset hash.
$ docker run -it -d --name tdexd --restart unless-stopped -p 9945:9945 -p 9000:9000 -v `pwd`/tdexd:/.tdex-daemon -e TDEX_NETWORK="regtest" -e TDEX_BASE_ASSET="5ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225" -e TDEX_EXPLORER_ENDPOINT="http://127.0.0.1:3001"  ghcr.io/tdex-network/tdexd:latest

# Run on Liquid and specify USDt as base asset instead of default L-BTC
$ docker run -it -d --name tdexd --restart unless-stopped -p 9945:9945 -p 9000:9000 -v `pwd`/tdexd:/.tdex-daemon -e TDEX_BASE_ASSET="ce091c998b83c78bb71a632313ba3760f1763d9cfcffae02258ffa9865a37bd2" ghcr.io/tdex-network/tdexd:latest
```

This will mount the data directory in a folder called `tdexd` in your current path.

See [Enviroment Variables](#environment-variables) for all available options.

### Check the Logs

```sh
$ docker logs tdex
INFO[0000] trader interface is listening on :9945
INFO[0000] operator interface is listening on :9945
```

### Use the operator CLI

```sh
$ alias tdex='docker exec -it tdexd tdex'
```
Now you are ready to [deposit funds](#deposit-funds) to create your first market and start accepting incoming trades.

## Run standalone


#### Install

1. [Download the latest release for MacOS or Linux](https://github.com/tdex-network/tdex-daemon/releases)

2. Move daemon and cli into a folder in your PATH (eg. `/usr/local/bin`) and rename the daemon as `tdexd` and the cli as `tdex`

3. Give executable permissions. (eg. `chmod a+x /usr/local/bin/tdexd` and `chmod a+x /usr/local/bin/tdex`)


#### Run

```sh
# Run on Liquid network connecting to blockstream.info for sourcing blockchain data
$ tdexd

# Run on Liquid connecting to a local explorer
$ export TDEX_EXPLORER_ENDPOINT="http://127.0.0.1:3001"
$ tdexd

# Run on Liquid connecting to a local Elements node
$ export TDEX_ELEMENTS_RPC_ENDPOINT="http://rpcuser:rpcpassword@127.0.0.1:7041"
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
This will mount the data directory in a folder called `.tdex-daemon` in your `$HOME`.

See [Environment Variables](#environment-variables) for all available options.

### Use the operator CLI

```sh
$ tdex --help
```

Now you are ready to [deposit funds](#deposit-funds) to create your first market and start accepting incoming trades.

## Environment variables

The list of available variables can be found [here](https://pkg.go.dev/github.com/tdex-network/tdex-daemon/config)

## Deposit funds

To start a market, you need to deposit two reserves of two **Liquid assets** for the pair (called **Market**) you are providing liquidity for. Each **Market** has a BASE ASSET, which is always the same per daemon, and a QUOTE ASSET.

To determine the spot price you can adopt different strategies, at the moment the supported one are **PLUGGABLE** and **BALANCED**.

The PLUGGABLE strategy expects you to update the price manually, plugging in an external price feed that need to call the `UpdateMarketPrice` rpc method of the operator interface.

The BALANCED strategy (this is the default when you create a market) uses **Automated Market Making** to determine the spot price. The initial ratio of the two amounts you deposit will represent the price of the first trade you accept in.
From that point on, the **automated market making strategy will self regulate the trading price**. It follows the *constant product market-making* formula. Every transaction that occurs on this market will adjust the prices of the market accordingly. It's a basic supply and demand automated market making system.


The following commands will uses the operator cli `tdex` to call the gRPC **operator** interface of `tdexd`. By default running on localhost on port 9000.

* Initialize the local state of the CLI.


```sh
# By default it looks for the daemon operator gRPC interface on localhost:9000
$ tdex config init
# If the daemon is running on regtest
$ tdex config init --network regtest --explorer_url http://localhost:3001
# or on a remote machine
$ tdex config init --rpcserver example.com:9000
```

* You can always check the current state with the following command

```sh
$ tdex config
```

* Create a new mnemonic seed (only the first time)

```sh
$ tdex genseed
```

* Initialize the wallet (only the first time or after a restore from seed)

```sh
$ tdex init --seed <generatedSeed> --password <mypassword>
```

* **OR** import and restore an existing wallet

```sh
$ tdex init --seed <mySeed> --password <mypassword> --restore
```

* Unlock the wallet with chosen password

```sh
$ tdex unlock --password <mypassword>
```

* You can manually deposit funds to the daemon wallet:

  - Get a deposit address from the fee account

  ```
  $ tdex depositfee
  ```

  Now send some L-BTC that will be used to subsidize liquid network fees.

  - Claim the deposits for the fee account

  ```
  $ tdex claimfee --outpoints '[{"hash": <txid>, "index": <vout>}]'
  ```

  v Create a Market and get a new deposit address.

  ```sh
  $ tdex depositmarket
  ```

  Now send some base asset (by default is LBTC) and quote asset of choice in that address, such as USDt or LCAD.

  - Claim the deposits for the market

  ```
  $ tdex config set base_asset <BaseAssetHash>
  $ tdex config set quote_asset <QuoteAssetHash>

  $ tdex claimmarket --outpoints '[{"hash": <txid>, "index": <vout>}, {...}]'
  ```

### NEW: CONCURRENT SWAP REQUESTS

You can make use of the fragmenter tool, an interactive process that let's you send all the funds to a temporary wallet that splits the total amount into smaller fragments, increasing the capabilities of the daemon to serve an higher number of concurrent trade requests:

  * Get a temporary address to send fee account's funds to:

  ```bash
  $ tdex fragmentfee
  ```

   After having generated and showed the temporary wallet's address, the commands waits for you to insert the txid of the funding tx(s).  
   Press _ENTER_ to confirm and continue the process in order to calculate the optimal number of fragments based on the amount detected and send the fragmented deposits to the daemon's fee account.

  NOTICE: If, for any reason, the process fails (like for example you pasted the wrong txid) you can resume it with:
  
  ```bash
  $ tdex fragmentfee --txid <txid1> --txid <txid2> ...
  ```

    The process is smart enough to recognize if any previous one exited before being completed. In that case, it expects you to resume by providing the list of funding txids. If this time everything's allright, the process will complete as described above, otherwise you'll need to repeat the reseume again. Only after a fragmentation process is completed, it is possible to go for anotherone.

  * Get a temporary address to send market's funds to:

  ```bash
  $ tdex fragmentmarket
  # INFO[0000] send funds to address: el1qqf9w40vhwnq0rjejfuv0l4hlhgc6zwdacftra5yd3rakl8s3y0pn3078ul8jh5dhfg7rpceu2xt8wyx92wz9swqsm2p6fcjvq
  # INFO[0000] Enter txid of fund(s) separated by a white space [press ENTER to skip or confirm]:
  ```

    Fund the temporary wallet's address and insert the txid of the funding txs.  
    Press _ENTER_ to confirm and continue the process in order to calculate the optimal number of fragments and to send the fragmented deposits to the daemon's market account.

  NOTICE: If, for any reason, the process fails, the same resume flow described above applies for `fragmentmarket --txid <txid1> ...`.

* You can check the status of the market

```sh
$ tdex listmarket
```


* Optional: You can get a new deposit address for an already created and funded market passing the optional flag

```sh
$ tdex depositmarket --base_asset <BaseAssetHash> --quote_asset <QuoteAssetHash>
```

## Manage markets

* Select the market

```sh
$ tdex config set base_asset <BaseAssetHash>
$ tdex config set quote_asset <QuoteAssetHash>
```

You can always check the current state with the following command

```sh
$ tdex config
```

Now the following commands will be launch against this market.

* Open the market using automated market making

```sh
$ tdex open
```
This makes the selected market available for trading using the BALANCED market strategy

* Close the market

```sh
$ tdex close
```

This makes the selected market NOT available for trading.

* Change market making strategy to pluggable

```sh
$ tdex strategy --pluggable
```

* Update the price

```sh
$ tdex price --base_price=16000 --quote-price=0.001
```
This updates the current market price to be used for future trades.

* Open the market again

```sh
$ tdex open
```
