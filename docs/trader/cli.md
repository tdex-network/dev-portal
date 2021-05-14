---
title: 'CLI'
sidebar_position: 4
---

Command line interface for making swaps and trades on TDEX

**⬇️ Install**

* Install with **yarn**

```sh
$ yarn global add tdex-cli
```

* Install with **npm**

```sh
$ npm i -g tdex-cli
```

By default, the `tdex-cli` will use the `~/.tdex-cli` as data directory, current state and private key will be stored in there.

**Custom datadir (optional)**

Configure custom directory for data persistence. You should have write permissions.

```sh
$ export TDEX_CLI_PATH=/absolute/path/to/data/dir
$ tdex-cli help
```

## Commands

### Info

- Show current persisted state

```sh
$ tdex-cli info
```

### Network

- Set the network to work against

> NOTICE With the --explorer flag you can set your own electrum REST server (Blockstream/electrs) for connecting to the blockchain.

```sh
# Mainnet
# This uses blockstream.info as explorer
$ tdex-cli network liquid
# Regtest
# This uses nigiri.network as explorer
$ tdex-cli network regtest
# Custom Esplora
$ tdex-cli network regtest --explorer http://localhost:3001
```

### Wallet

- Create or Restore Wallet

```sh
$ tdex-cli wallet
```

- Generate a new address

```
$ tdex-cli wallet address
```

- Get Wallet Balance

```sh
$ tdex-cli wallet balance
```

- Send from Wallet

```sh
$ tdex-cli wallet send
```

### Provider

- Select and connect to a liquidity provider

```sh
$ tdex-cli connect https://provider.tdex.network:9945
```

From this point, all the commands will work against this selected provider.

### Market

- List all available markets for current provider

```sh
$ tdex-cli market list
```

- Select a market to use for trading

```sh
$ tdex-cli market LBTC-USDt
```

- Get current exchange rate for selected market

```sh
$ tdex-cli market price
```

### Trade

- Start a swap against the selected provider

```sh
$ tdex-cli trade
```

# Advanced: BUY/SELL example on regtest with Nigiri

This example shows how to buy and sell tokens using a tdex daemon running on a [Nigiri](https://github.com/vulpemventures/nigiri) regtest network and `tdex-cli`.

### Run the daemon

1. Clone and build the daemon from [Tdex-network/tdex-daemon](https://github.com/TDex-network/tdex-daemon)

```sh
$ git clone https://github.com/TDex-network/tdex-daemon
$ cd tdex-daemon
$ make build-linux
$ make build-cli-linux
```

2. Launch the tdex daemon

`make run-linux` sets env variables such as the daemon use the default nigiri regtest network.

```sh
$ nigiri start --liquid
$ make run-linux
```

Then let's use the operator CLI to setting up our daemon.

```sh
# init the cli configuration
$ ./build/tdex-linux-amd64 config init
# generate a new mnemonic
$ SEED=$(./build/tdex-linux-amd64 genseed)
# init the provider's wallet
$ ./build/tdex-linux-amd64 init --seed $SEED --password secret
# unlock the wallet using the password
$ ./build/tdex-linux-amd64 unlock --password secret
```
Next, we need to fund the **fee account** of our provider. 

```sh
$ ./build/tdex-linux-amd64 depositfee
# the wallet will return a confidential address, we need to send some LBTC to this one
# here, we use nigiri faucet for example
# /!\ REPLACE by your deposit address /!\
$ nigiri faucet --liquid YOUR_FEE_ACCOUNT_ADDRESS_HERE
```

Well, now let's create a market:

```sh
# first create an empty market
$ ./build/tdex-linux-amd64 depositmarket
# this will return an address, we need to send it some LBTC and some ALTCOIN
# again, let's use nigiri for that
# let's fund the market address with LBTC
# LBTC will be the base asset of the market
$ nigiri faucet --liquid YOUR_MARKET_ADDRESS
# Let's generate a new ALTCOIN and send 100 assets to the market address
# The generated altcoin will be the quote_asset
$ nigiri mint YOUR_MARKET_ADDRESS 100
# /!\ Copy the altcoin asset hash in the clipboard!
```

We need to open the new market, by default a new market is not tradable.

```sh
# Select the market using `config set`
$ ./build/tdex-linux-amd64 config set base_asset 5ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225
$ ./build/tdex-linux-amd64 config set quote_asset ALTCOIN_ASSET_HASH_HERE
# Then make the market tradable
$ ./build/tdex-linux-amd64 open
```

Congrats! The daemon is running and has a tradable market LBTC/ALTCOIN.

### Use `tdex-cli` to trade

Now we will use `tdex-cli`, the CLI for traders.

```sh
# set up network to regtest + config local nigiri explorer
$ tdex-cli network regtest --explorer http://127.0.0.1:3001
# connect to localhost daemon
$ tdex-cli connect localhost:9945
# generate new wallet (or import it from seed) using wallet
$ tdex-cli wallet
# let's generate a new address and fund it
$ tdex-cli wallet address
$ nigiri faucet --liquid TRADER_ADDRESS_HERE
```

Our trader account owns LBTC, thus he can use `trade` to SELL them (and so buy some altcoins!).

```sh
# list the market available
$ tdex-cli market list
# copy the market recently created, it should be something like 'LBTC-6f02'
# then select this market (replace by your market pair!)
$ tdex-cli market LBTC-6f02
# use `trade` and select SELL and follow the instructions
$ tdex-cli trade
```

We have sent 1 LBTC and receive 50.125 ALTCOINs ! Now I BUY some LBTC using my ALTCOINs:

```sh
# Select the BUY option this time!
$ tdex-cli trade
# and follow the instructions, try to buy 1 BTC
```
