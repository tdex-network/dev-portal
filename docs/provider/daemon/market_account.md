---
title: 'Market Account'
sidebar_position: 6
---

A market from the Ocean wallet's POV is just one of the many HD accounts that can be created, like the fee one or the fragmenters.

Meanwhile, from the provider's POV a market is a collection of the following metadata:
* base and quote asset pair, and their precisions - for example LBTC/USDT both with precision 8
* fees - percentage and fixed fees set for the base and/or quote asset
* tradable - whether the market is open or closed to public trading
* strategy - whether AMM or with price provided by a price feed
* price - only for markets without AMM strategy
  
These are all the properties you can define for every market you create, some of them are also customizable during their lifetime. Here you'll learn how to manage your markets.

## Create a market

```bash
$ tdex market create \
  --base-asset 144c654344aa716d6f3abcc1ca90e5641e4e2a7f633bc09fe3baf64585819a49 \
  --quote-asset f3d1ec678811398cd2ae277cbe3849c6f6dbd72c74bc542f7c4b11ff0e820958 \
  --base-asset-precision 8 --quote-asset-precision 8 \
  --name lbtc_usdt \
  --percentage-base-fee 200 --percentage-quote-fee 100 \
  --fixed-base-fee 700 --fixed-quote-fee 1000000 \
  --strategy BALANCED
```

When you create a market you can pretty much define all its properties with some exceptions: once a market is created, you can't change its base or quote asset, nor its name.

If you don't provide a name, one will be assigned automatically as the hash of the asset pair. You can't create a market with an existing asset pair or name.

Here below you can learn how to fully manage your markets, but before digging into the other commands, let's configure the CLI so that it refers to the one we have just created:

```bash
$ tdex config set base_asset 144c654344aa716d6f3abcc1ca90e5641e4e2a7f633bc09fe3baf64585819a49
$ tdex config set quote_asset f3d1ec678811398cd2ae277cbe3849c6f6dbd72c74bc542f7c4b11ff0e820958
```

All the commands that follow require both `base_asset` and `quote_asset` to be set in your CLI's config file. If you have created multiple markets and you need to switch between them, it's enough to change base and/or quote asset with the `tdex config set` command.

## Deposit funds

Just like any other account, let's derive some new addresses to deposit base/quote asset funds to the market:

```bash
$ tdex market deposit --num-of-addresses 2
```

Here we generated 2 addresses, one for receiving LBTCs, the other for USDTs to prevent address reuse. Once the funds are sent, you'll have to wait for them to be confirmed, in the meanwhile you can setup your market with the commands below.

## List all derived addresses

You can see the list of all the derived addresses so far with:

```bash
$ tdex market addresses
```

## Get market info

You can take a look at your market configuration with:

```bash
$ tdex market info
```

This commands shows you also the current balance, and the price (if not AMM strategy), so this is the one that lets you know if the funds are eventually confirmed during the deposit phase.

## Change the percentage fees

You can change the percentage fees that your market takes from every trade. You can set a different fee on the base and the quote assets. It is expressed in _basis_point_ and can assume values in the range `[0, 9999]` which means from 0.00% (no fees) up to 99.99%: 

```bash
# Update fees for both assets
$ tdex market percentagefee --base-fee 500 --quote-fee 400

# Update fees for base asset only
$ tdex market percentagefee --base-fee 500

# Update fees for quote asset only
$ tdex market percentagefee --quote-fee 400
```

## Change the fixed fees

Similarly, you can change the fixed fees, ie. a specific amount defined on base and/or quote assets taken from trades. This value is expressed in satoshis and must be equal or greater than `0`:

```bash
# Update fees for both assets, 700sats on LBTC and 0.01$ on USDT
$ tdex market fixedfee --base-fee 700 --quote-fee 1000000

# Update fees for base asset only
$ tdex market fixedfee --base-fee 700

# Update fees for quote asset only
$ tdex market fixedfee --quote-fee 1000000
```

## Change the strategy

You can change the market strategy, that affects the way the way the price and previews are calculated.

The provider supports 2 strategies:

* _balanced_ - AMM strategy that calculates prices and previews by applying the constant-product formula. With this strategy, price and previews depend on the base and quote asset balances.
* _pluggable_ - not AMM strategy. This strategy requires you to manually provide a price for your market like showed in the following section. In this case, you might want to [setup a feeder](feeder.md) to feed your market with prices provided by an external exchange like for example bitfinex or kraken.

```bash
# Update strategy to balanced AMM
$ tdex market strategy --balanced

# Update strategy to pluggable
$ tdex market strategy --pluggable
```

## Change the price

Only if you set up a _pluggable_ strategy for your market, you can manually set its price with:

```bash
$ tdex market price --base-price 0.00003334 --quote-price 30000
```

## Open a market

Once you're good with your market configuration and the funds are confirmed, you can open your market so traders can start trading on it:

```bash
$ tdex market open
```

## Get trading report

You can get a report of the trading activity of your market in a certain time period. This reports includes info like the trading volume and the total amount earned (collected fees).

```bash
# Get report for a predefined period
# Check all available predefined periods with tdex market report --help
$ tdex market report --last-day

# Get report for a custom period.
# Dates must be expressed in RFC3339 format 
$ tdex market report --start "2023-01-02T00:00:00Z" --end "2023-01-30T23:59:00Z"
```

## Close a market

Sometimes you may need to put your market on pause - not allow any trade against it - becuase for example you want to change the market strategy or update the fees, or even because you want to deposit or withdraw funds from it. You can do that with:

```bash
$ tdex market close
```

## Withdraw funds

You can withdraw funds from your market to some receiver(s) with:

```bash
# Withdraw 500k sats of LBTC and 50$
$ tdex market withdraw \
  --password password \
  --receivers '[{"asset": "144c654344aa716d6f3abcc1ca90e5641e4e2a7f633bc09fe3baf64585819a49", "amount": 500000, "address": "tex1qr34j6jpqfkct6a2qtu77jn4fqsnxgc2hstk6wq"}, {"asset": "f3d1ec678811398cd2ae277cbe3849c6f6dbd72c74bc542f7c4b11ff0e820958", "amount": 5000000000 , "address": "vjTyPZRBt2WVo8nnFrkQSp4x6xRHt5DVmdtvNaHbMaierD41uz7fk4Jr9V9vgsPHD74WA61Ne67popRQ"}]'
```

## Drop a market

You can even decide to drop your market. This requires you to withdraw all funds from it in advance:

```bash
$ tdex market drop
```

Awesome! You've learned how to manage your markets. You learned almost everything if you went so far, but you still may don't know that you can [setup webhooks](webhooks.md) to be always aware of what's happening with your provider. Or that you can now [setup a price feed](feeder.md) for your market!

Your market is now ready for trading. It is finally time to [announce your provider to the public](../registry.md) so that traders can start trading against it!