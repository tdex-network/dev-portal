---
title: 'Overview'
sidebar_position: 1
---

The daemon is that tool enabling a Liquidity provider to execute automated market marking strategies on top of TDEX.

It exposes two HTTP/2 gRPC interfaces, one meant to be public and consumed by traders that fully implements [BOTD #4](https://github.com/tdex-network/tdex-specs/blob/master/04-trade-protocol.md) called **trade interface** (by default on the port **9945**) and another private to be consumed by the liquidity provider for internal management called **operator interface** (by default on the port **9000**). The specs of the operator interface can be found [here](https://github.com/TDex-network/tdex-daemon/blob/master/api-spec/protobuf/operator.proto).

The daemon comes with an embedded Liquid HD wallet and sources blockchain information via a block explorer. At the time of writing, only the [Blockstream fork of Electrs](https://github.com/blockstream/electrs) is supported, sticking with [Blockstream.info APIs](https://blockstream.info/liquid/api/).

The HD wallet is organized in multiple sub accounts, each one with is own purpose:
* **Fee account**: owns only LBTCs funds and is used to pay for Liquid network fees of the trade or withdrawal transactions.
* **Wallet account**: this aims to be a personal wallet that you can use to send/receive your funds. The daemon does not store any data internally for this account.
* **Market account(s)**: each market is associated with a unique account of the HD wallet and owns funds of exactly 2 asset, the asset pair of the market.

## Data directory

The first time you run the daemon, it creates a **data directory** (`~/.tdex-daemon` for linux and `~/Library/Application\ Support/Tdex-daemon` for macOS)  and it is used to persist the wallet and the state in an embedded database.
It's possible to use a different path for the data directory exporting the environment variable `TDEX_DATA_DIR_PATH`. If you use docker you must mount the volume pointing to the different chosen path.

**Be sure to replicate this data directory to keep your markets running in case of hardware failures. You can restore the access of your funds and the markets with your mnemonic seed.**

## Configuration

As briefly introduced, it's possible to configure the daemon with environment variables. The list of all available variables can be found [here](https://pkg.go.dev/github.com/tdex-network/tdex-daemon/config#pkg-constants).