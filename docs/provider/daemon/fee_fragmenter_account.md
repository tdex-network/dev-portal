---
title: 'Fee Fragmenter Account'
sidebar_position: 7
---

The `fee_fragmenter_account` is a special account that makes your life easier when it's about depositing funds to the `fee_account`.

It lets you make a single deposit to one of its generated addresses, and then split it into multiple fragmented utxos that become deposits of the `fee_account`. This way, you don't need to do fancy stuff or repeat the same deposit operation to the fee account again and again to have it funded with many utxos in order to increase the number of concurent txs the provider can handle.

When using this account, be aware that any deposit amount is split into several utxos of `5000` sats each - expect for the very last one.

## Deposit funds

Just like any other account, to deposit funds you have to generate a new address:

```bash
$ tdex feefragmenter deposit
```

Now send some L-BTC amount to the generated address and just wait for the funds to get confirmed before proceeding.

You can generate multiple addresses by using the flag `--num-of-addresses`.

## List all derived addresses

You can see the list of all derived addresses so far with:

```bash
$ tdex feefragmenter addresses
```

## Check the balance

To know when the funds are confirmed, you can keep track of the fragmenter balance with:

```bash
$ tdex feefragmenter balanace
```

## Split the funds

Once the funds are confirmed, you can go forward by splitting and depositing them to the `fee_account` with:
```bash
$ tdex feefragmenter split
```

You'll see outputs prompted on your terminal. Those are messages coming directly from the provider that keep you up-to-date with the operations executed during the process.

## Withdraw funds

You can withdraw funds from the `fee_fragmenter_account` to some receiver(s) with: 

```bash
$ tdex fee withdraw \
  --password password \
  --receivers '[{"asset": "144c654344aa716d6f3abcc1ca90e5641e4e2a7f633bc09fe3baf64585819a49", "amount": 50000, "address": "tex1qr34j6jpqfkct6a2qtu77jn4fqsnxgc2hstk6wq"}]'
```

So far so good! It's now time to [create and manage your markets](market_account.md).
