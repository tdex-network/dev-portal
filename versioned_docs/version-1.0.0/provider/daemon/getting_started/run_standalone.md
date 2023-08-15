---
title: 'Run Standalone'
sidebar_position: 3
---

In order to run the daemon as a standalone executable you need to:

1. Download the latest [release](https://github.com/vulpemventures/ocean/releases) of the Ocean wallet (_oceand_) for Linux or MacOS.
2. Rename the binary to `oceand`, move it to your _PATH_ (eg. `/usr/local/bin`), and grant executable permissions with `chmod +x /usr/local/bin/oceand` 
3. Download the latest [releases](https://github.com/tdex-network/tdex-daemon/releases) of daemon (_tdexd_) and CLI (_tdex_) for Linux or MacOS.
4. Rename the binaries to `tdexd` and `tdex`, move them to your _PATH_, and grante executable permissions with `chmod +x /usr/local/bin/tdexd` and `chmod +x /usr/local/bin/tdex`.

You're now ready to start the services.

Let's start with the Ocean wallet by running it on testnet network with a filesystem db - for the sake of simplicity.

Note that the command below redirects all logs produced by the service to the file `~/tdex-logs/ocean.logs.txt`, therefore make sure to create the folder `tdex-logs` in your home directory, or change it if you need.

```bash
$ OCEAN_LOG_LEVEL=5 \
  OCEAN_NO_TLS=true \ 
  OCEAN_NO_PROFILER=true \
  OCEAN_ELECTRUM_URL=ssl://blockstream.info:465 \
  OCEAN_NETWORK=testnet \
  OCEAN_UTXO_EXPIRY_DURATION_IN_SECONDS=240 \ 
  OCEAN_DB_TYPE=badger \
  oceand &> ~/tdex-logs/oceand.logs.txt &
```

The default path for the Ocean wallet's datadir is `~/.oceand` for Linux and `~/Library/Application\ Support/Oceand` for MacOS but you can change it by exporting the env var `OCEAN_DATADIR=path/to/datadir` if you need.

You can easily inspect the logs produced by the service at anytime by running `more ~/tdex-logs/oceand.logs.txt`.

Now that the wallet is running, let's start the tdex provider:

```bash
$ TDEX_WALLET_ADDR=localhost:18000 \
  TDEX_LOG_LEVEL=5 \
  TDEX_NO_OPERATOR_TLS=true \
  TDEX_CONNECT_PROTO=http \
  tdexd &> ~/tdex-logs/tdexd.logs.txt &
```

The daemon's datadir path defaults to `~/.tdex-daemon` for Linux and `~/Library/Application\ Support/Tdex-daemon` for MacOS but you can change it by exporting the env var `TDEX_DATADIR=path/to/datadir` if you need.

The commands above, similarly to the one for starting the wallet, redirects all logs to a file so you can conveniently check the logs of the service at anytime with `more ~/tdex-logs/tdexd.logs.txt`.

If you followed the tutorial until this point, you've successfully started your proivider!

What's next? You can get some insights about [the daemon's configuration](configure_daemon.md), or you can take a look at how to [configure the CLI](configure_cli.md) to setup your markets, deposit and withdraw funds and even more cool stuff.

:::tip
Think about configuring your host so that it keeps these service always up&running with the help of `systemd` or some similar tool.
:::