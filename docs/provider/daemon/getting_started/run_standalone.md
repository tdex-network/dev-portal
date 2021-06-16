---
title: 'Run Standalone'
sidebar_position: 3
---

In order to run the daemon as a standalone executable you need to:

1. Download the latest [releases](https://github.com/tdex-network/tdex-daemon/releases) of daemon (_tdexd_) and CLI (_tdex_) for Linux or MacOS.

2. Move the binaries into a folder in your _PATH_ (eg. `/usr/local/bin`) and rename the daemon as just `tdexd` and the CLI as `tdex`.

3. Give them executable permissions. (eg. `chmod a+x /usr/local/bin/tdexd` and `chmod a+x /usr/local/bin/tdex`)


Now you're ready to start it up:

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

By default, you can find the data directory at the path `~/.tdex-daemon` if using Linux or `~/Library/Application\ Support/Tdex-daemon` if using MacOs instead.

You can change the default path by exporting it into the environment variable `TDEX_DATA_DIR_PATH`. 

Next step is to [configure the operator CLI](configure_cli.md).