---
title: 'Migrate a daemon to v1'
sidebar_position: 4
---

If you are already running a _v0_ liquidity provider, you can bump its version to the newest _v1_ by using the brand new service called `tdex-migration`. This service requires the unlocking password and helps you translating the data stored in the old daemon's datadir to the format required by the newest version _v1_ and by the Ocean wallet.

You can either use the released binary, or you can build it yourself by cloning the official tdex-daemon repository and run `make build-migration` - you'll find it in the _build/_ folder -. 
Instead, if you serve your daemon as a dockerized solution, you can just pull the latest official image with `docker pull ghcr.io/tdex-network/tdexd:latest` and use the `tdex-migration` binary packed together with `tdexd` (daemon) and `tdex` (cli).

The service can be configured by the mean of the fowllowing flags:

* `--password` (required) the daemon's password used to unlock the storage for reading all the data that is going to be translated
* `--v0-datadir` (optional) the path of the _v0_ daemons' datadir to be migrated. Defaults to `~/.tdex-daemon` for Linux and `~/Library/Application\ Support/Tdex-daemon` for MacOS
* `--v1-datadir` (optional) the path of the _v1_ daemon's datadir as result of the migration. Defaults to `~/.tdex-daemon` for Linux and `~/Library/Application\ Support/Tdex-daemon` for MacOS in order to overwrite the old datadir
* `--ocean-datadir` (optional) the path of the Ocean wallet's datadir as result of the migration. Defaults to `~/.oceand` for Linux and `~/Library/Application\ Support/Oceand` for MacOS
* `--no-backup` (optional) skip creating a `.tar.gz` compressed archive of the old datadir, included in the new one otherwise. When disabling the backup, the old datadir is just deleted and forever lost. Defaults to `false`

## Migrate standalone daemon

Move the `tdex-migration` binary to your _PATH_ (eg. `/usr/local/bin`), then start the migration with:

```bash
# Start migration with default configuration 
$ tdex-migration --password password

# Start migration with default configuration and no backup of the old datadir
$ tdex-migration --password password --no-backup

# Start migration with custom source folder and default targets
$ tdex-migration --password password --v0-datadir path/to/datadir

# Start migration with default source folder and custom targets
$ tdex-migration --password password --v1-datadir path/to/datadir --ocean-datadir path/to/ocean-datadir
```

Once the migration is complete, you should first start the Ocean wallet and then the daemon as shown [here](getting_started/run_standalone.md) - don't forget to change the path for their datadirs with `export OCEAN_DATADIR=path/to/wallet/datadir` and `export TDEX_DATADIR=/path/to/daemon/datadir` if you don't use the defaults.

Keep in mind that you must run your ocean wallet configured with `OCEAN_DB_TYPE=badger` when you migrate your daemon. You can't select a different storage unless you choose to move to a brand new wallet, or restore the same one by loosing the whole trading history though.

## Migrate dockerized daemon

Once you pulled down the latest daemon's docker images, take care of making a backup of your daemon's datadir manually, then you can run the migration by overriding its entrypoint with:

```bash
$ docker run --rm --entrypoint 'tdex-migration' \
  --volume /path/to/datadir:/home/tdex/.tdex-daemon \
  ghcr.io/tdex-network/tdexd:latest \
  --password password \
  --ocean-datadir /home/tdex/.tdex-daemon/oceand \
  --no-backup
```

With this command your provider's datadir will be overwritten and will also include the datadir of the Ocean wallet.
The backup of the datadir is intentionally skipped because that operation might cause problems with the migration depending on the machine on which docker is installed. To prevent any problem in advance, we strongly suggest you to manually backup the _v0_ datadir and skip this step.

Once the migration is complete, you should move the ocean datadir out of the daemon's one, then start the wallet and the daemon as hown [here](getting_started/run_docker.md).

Keep in mind that you must run your ocean wallet configured with `OCEAN_DB_TYPE=badger` when you migrate your daemon. You can't select a different storage unless you choose to move to a brand new wallet, or restore the same one by loosing the whole trading history though.

Wonderful! You just bumped your provider to the latest version and you can now see a lot of new cool stuff, like the new commands for managing the [_fee account_](fee_account.md) or the [_markets_](market_account.md), or even how to handle the newly introduced [_price feeds_](feeder.md) or the changes made to the [webhooks](webhooks.md). You can surf the documentation to know more of every features of the new _v1_ provider!