---
title: 'Price feeder'
sidebar_position: 9
---

If you set the _pluggable_ strategy for your market you have to provide its price manually.

This operation can be conveniently automated for those market that don't have a fixed price, but rather that constantly changes depending on external factors, just like the LBTC/USDT one we opened previously in this guide.

The daemon, in fact, supports setting up **price feeds** and here you can learn how to manage them with the CLI. 

Like for the other commands, the target market is sourced from the configuration file, so don't forget to set the base and quote assets in your CLI if you didn't yet:

```bash
$ tdex config set base_asset 144c654344aa716d6f3abcc1ca90e5641e4e2a7f633bc09fe3baf64585819a49
$ tdex config set quote_asset f3d1ec678811398cd2ae277cbe3849c6f6dbd72c74bc542f7c4b11ff0e820958
```

## List the supported price sources

The daemon supports various different so-called "price sources", or public exchanges used as sources for periodically feeding prices taken from them to the your market. You can see the list of all price sources with:

```bash
$ tdex feeder sources
```

## Create a price feed

When you create a new price feed, you have to specify the source from those available and the ticker used by that specific source to refer to your market. This is up to you by looking at the API documentation of the selected _source_.

```bash
$ tdex feeder add --source bitfinex --ticker BTCUSD
```

The daemon returns the id of the price feed. like for example `c5bb454d-cb47-4fef-9459-248741da6a53`.

## Start a price feed

You can start your newly created price feed with:

```bash
$ tdex feeder start --id c5bb454d-cb47-4fef-9459-248741da6a53
```

If something goes wrong here, like for example you set a wrong ticker for your price feed you don't need to worry, you can change source and/or ticker if you need, we'll cover this very soon.

## Stop a price feed

You can stop a feeder with the following command:

```bash
$ tdex feeder stop --id c5bb454d-cb47-4fef-9459-248741da6a53
```

## Get info about a price feed

You can get info about a price feed - its target market, source and ticker - with the command below:

```bash
$ tdex feeder info --id c5bb454d-cb47-4fef-9459-248741da6a53
```

## Update a price feed

You may want to change the source of your price feed, or mzybe you need to fix the ticker because you set a wrong one. For these kind of changes you can use the following command. It requires the price feed to be stopped in advance:

```bash
$ tdex-cli feeder update --id c5bb454d-cb47-4fef-9459-248741da6a53 --source kraken --ticker "XBT/USDT"
```

## List all price feeds

You can list and get info about all your price feeds with:

```bash
$ tdex-cli feeder list
```

## Remove a price feed

If you decided to switch your market to an AMM strategy and you don't need a price feed anymore, you can remove it with:

```bash
$ tdex feeder remove --id c5bb454d-cb47-4fef-9459-248741da6a53
```

This is everything you need to know to manage your price feeds. Your market should now be ready for starting accept trades, let's [announce it to the public](../registry.md)!.