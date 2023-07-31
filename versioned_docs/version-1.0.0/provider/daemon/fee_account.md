---
title: 'Fee Account'
sidebar_position: 5
---

The daemon is designed to pay for Liquid network fees to include transactions in the blockchain, whether they are trades made with traders, deposits (with fragmenter accounts), or withdrawals.

The `fee_account` is the very first account you should fund. This account is designed to handle only L-BTC funds. If you deposit funds of some other asset type, they just won't be used by it. You'll stll be able to withdraw them at any time though.

Since this account is meant to pay only for network fees, it will need to cover very low amounts, like ~700 sats/vbyte per trade transaction, even lower for withdrawls. Therefore, it is suggested to fund it with multiple UTXOs with small amounts like for example 2000 or 5000 sats of LBTC.

Keep in mind that the number of concurrent transactions your provider can handle strictly depends on the number of utxos owned by the `fee_account`.

## Deposit the funds

To directly deposit some funds to the `fee_account` you need to generate a receiving address with:

```bash
$ tdex fee deposit --num-of-addresses 1
```

If you want to get only one address, you can just omit the `--num-of-addresses` flag.

Now it's enough to send some L-BTCs to the generated address(es), the daemon will detect them automatically once they are at least included in mempool. You can keep track of the account balance with:

```bash
$ tdex fee balance
```

You'll see the deposit amount as uncofirmed balance as long as the trannsaction gets included in blockchain, thereafter you'll see it as confirmed balance.

:::tip
Take a look at the [fee_fragmenter](fee_fragmenter_account.md), a special account that aims to make your life easier by making you send funds to it, while it takes care of spliitng them in many fragmented utxos.

This way of depositing funds is highly suggested if you want to increase the number of concurrent transactions it can handle.
:::

## List all derived addresses

You can see the list of all derived addresses so far with:

```bash
$ tdex fee addresses
```

## Check the balance

As already introduced, you can take a look at the balance of the `fee_account` with:

```bash
$ tdex fee balanace
```

It shows the unconfirmed balance, or the sum of all utxos that are still in mempool, the confirmed one, or the sum of all of them included in blockchain, and the locked balance, ie. the sum of all utxos currently used as inputs of pending transactions. This last balance periodically sets to 0, once the pending transactions either expire or get included in blockchain.

## Withdraw funds

Of course, you are allowed to move away funds from the `fee_account` to some receivers, which is the aggregation of the asset, amount and destination address:

```bash
$ tdex fee withdraw \
  --password password \
  --receivers '[{"asset": "144c654344aa716d6f3abcc1ca90e5641e4e2a7f633bc09fe3baf64585819a49", "amount": 10000, "address": "tex1qr34j6jpqfkct6a2qtu77jn4fqsnxgc2hstk6wq"}]'
```

If you need, you can define even multiple receivers.

This is all about the management of the `fee_account`, what's the next step? Check out how to [manage your markets](market_account.md)
