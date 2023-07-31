---
title: 'Market Fragmenter Account'
sidebar_position: 8
---

The `market_fragmenter_account` is a special account that makes your life easier when it's about depositing funds to a market.

The number of concurrent trades a provider can hanlde on a single market depends on the number of utxos owned by that account (and the `fee_account` as well).

For example, let's say your market is funded with one utxo of 1 LBTC and another of 30k USDT, the provider will be able to serve only one trade at a time, because either the LBTC or the USDT utxo is locked as soon as a trade is fullfilled. This causes one of the balances to be zero-ed until the trade is included in blockchain, by making you loose other opportunities in the meanwhile - no trades are allowed in case one or both the balances are zero!

This should make clear that the number of concurrent trades supported on a single market depend on the number of utxos with which it's funded.

And this is exactly what's the `market_fragmenter_account` is useful for: considering how hard can this _fragmentation_ operation be to be done manually - there aren't so many wallet out there that let you make a _send to many_ transaction - you can just send the whole amount of base and or quote asset to the fragmenter address.

The fragmenter sources the "target" market from the CLI's config file, so don't forget to set the base and quote assets in your CLI if you didn't yet:

```bash
$ tdex config set base_asset 144c654344aa716d6f3abcc1ca90e5641e4e2a7f633bc09fe3baf64585819a49
$ tdex config set quote_asset f3d1ec678811398cd2ae277cbe3849c6f6dbd72c74bc542f7c4b11ff0e820958
```

## Deposit funds

to deposit funds you have to generate a new address:

```bash
$ tdex marketfragmenter deposit
```

Now send funds of base and quote asset to this address and wait for them to be confirmed. It not suggested to use this account for fragmenting relatively low amounts. You might get an error if you try to do so; in this case, either send more funds or withdraw everything and proceed with a direct deposit to the market.

## List all derived addresses

You can see the list of all derived addresses so far with:

```bash
$ tdex marketfragmenter addresses
```

## Check the balance

To know when the funds are confirmed, you can keep track of the fragmenter balance with:

```bash
$ tdex marketfragmenter balanace
```

## Split the funds

Once the funds are confirmed, you can go forward by splitting and depositing them to the selected market with:
```bash
$ tdex feefragmenter split
```

You'll see outputs prompted on your terminal. Those are messages coming directly from the provider that keep you up-to-date with the operations executed during the process.

The funds deposited to the fragmenter are split in the following way - not customizable:
* 1 utxo with 30% the total amount
* 2 utxos with 15% the total amount
* 3 utxos with 10% the total amount
* 5 utxos with 2% the total amoun

```bash
$ tdex marketfragmenter split
```

## Withdraw funds

## Withdraw funds

You can withdraw funds from the `market_fragmenter_account` to some receiver(s) with: 

```bash
$ tdex fee withdraw \
  --password password \
  --receivers '[{"asset": "144c654344aa716d6f3abcc1ca90e5641e4e2a7f633bc09fe3baf64585819a49", "amount": 50000, "address": "tex1qr34j6jpqfkct6a2qtu77jn4fqsnxgc2hstk6wq"}]'
```
