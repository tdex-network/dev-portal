---
title: 'Overview'
sidebar_position: 1
---

The daemon is that tool enabling a Liquidity provider to execute automated market marking strategies on top of TDEX.

It exposes two HTTP (both v1.1 and v2) interfaces (REST, gRPC), one meant to be public and consumed by traders that fully implements [BOTD #4](https://github.com/tdex-network/tdex-specs/blob/master/04-trade-protocol.md) called **trade interface** (by default on the port **9945**) and another private to be consumed by the liquidity provider for internal management called **operator interface** (by default on the port **9000**). The specs of the operator interface can be found [here](https://github.com/tdex-network/tdex-daemon/blob/v1/api-spec/protobuf/tdex-daemon/v2/operator.proto).

The daemon requires a connection to an [Ocean wallet](https://github.com/vulpemventures/ocean), the Liquid hot wallet that manages keys and utxos for crafting trades, but also deposits and withdrawals transactions and that acts also as a source of blockchain events such as utxos/txs confirmation, etc.

The daemon makes use of multiple accounts created on the Ocean wallet, each one with its own purpose:
* **Fee account**: meant to own only LBTC funds, used to pay for network fees for trade, withdrawal, or deposit transactions.
* **Fee fragmenter account**: meant to own only LBTC funds, used to make a single deposit that is then split into multiple utxos deposited on the fee account. This is convenient for supporting many concurrent transactions at the same time.
* **Market account(s)**: each market is associated with a unique account of the Ocean wallet that owns only funds of base and quote assets.
* **Market framgneter account**: seemingly to the fee fragmenter, this special account can be used to deposit funds that are then split into multiple fragments and sent to the target market account. Depositing market funds via the fragmenter helps increasing the number of concurrent trades supported by the provider.
## Data directory

The first time you run the daemon, it creates a **data directory** (`~/.tdex-daemon` for linux and `~/Library/Application\ Support/Tdex-daemon` for macOS) that might be used to store data like the markets (assets, fees, strategy...) and the transaction history (deposits, trades, withdrawals) depending on the configured db type.

It's possible to use a different path for the data directory by exporting the environment variable `TDEX_DATADIR`. If you use docker you must mount the volume pointing to the different chosen path.

**Be sure to backup this folder to keep your markets running in case of hardware failures. You can always restore the access to your funds and markets with your mnemonic seed, but some data like the whole trading history might be lost forever otherwise.**