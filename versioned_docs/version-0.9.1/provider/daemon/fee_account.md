---
title: 'Fee Account'
sidebar_position: 4
---

The daemon is designed to pay for Liquid network fees to include a transaction in the blockchain, whether it is a trade between the daemon and a trader or a withdraw from one of the HD wallet accounts.

The Fee account is the very first account you should send funds to. This account is designed to handle only L-BTC funds. If you deposit funds of some other asset type, they just won't be used by this acount. You'll stll be able to withdraw them though.

Since this account is meant to only pay for network fees, it will need to cover very low amounts, like ~700 sats/vbyte per trade transaction, even lower for withdrawls. Therefore, it is suggested to fund it with multiple UTXOs with small amounts like for example 2000 or 5000 sats.

## Deposit and claim funds

Get some deposit address(es):

```bash
$ tdex fee deposit --num_of_addresses 1
# {
#  	"address": "el1qqdxwu2769zwkp9gn7pfl9vdvelfhjc6hk8v56wtpn6aww7h8ckhme7tj6hggvw3ycyn9epqlwzzml5yhdn9sv0dlxu676nr5k",
# 	"blinding": "7a01d7ce7367bcd4b444f34f00580dbef5b617447a3e07cf07c8883c34a1e0d8"
# }
```

If you want to get only one address, you can omit the `--num_of_addresses` flag.

Now send some L-BTC to the address(es), then claim the deposits for the fee account with:

```bash
$ tdex fee claim --outpoints '[{"hash": "248a47a99ae3e6de93a614a05ab1c0e064aa9ea2fb292bfa1b33c48b067cac10", "index": 1}]'
#
# fee account is funded
```

The daemon will start watching for those unconfirmed unspents if needed. You might not see the expected available balance until all utxos have ben at least included in blockchain.

:::tip
Take a look at the [Fee Fragmenter](fee_fragmenter_account.md), a special account that splits its funds into many fragments, becoming then deposits of the Fee account. This account aims to make your life easier for depositing funds to the Fee account.
:::

## List all deposit addresses

You can see the list of all derived deposit addresses so far with:

```bash
$ tdex fee addresses
# [
#   {
#  	  "address": "el1qqdxwu2769zwkp9gn7pfl9vdvelfhjc6hk8v56wtpn6aww7h8ckhme7tj6hggvw3ycyn9epqlwzzml5yhdn9sv0dlxu676nr5k",
# 	  "blinding": "7a01d7ce7367bcd4b444f34f00580dbef5b617447a3e07cf07c8883c34a1e0d8"
#   }
# ]
```

Like for the `deposit` command, the list is a pair of confidential address and related private blinding key.

## Check the balance

You can check the balance of the Fee account with:

```bash
$ tdex fee balanace
# {
# 	"available_balance": "50000",
# 	"total_balance": "50000"
# }
```

The output shows the `available_balance`, or the balance of all confirmed and spendable L-BTC utxos, and the `total_balance`, ie. including all confirmed/unconfirmed utxos and also those currently used by some not-yet confirmed transaction.

## Withdraw funds

Of course, you are allowed to move funds of the Fee account away to an address of yours.  
For this you can run:

```bash
$ tdex fee withdraw --amount 10000 --address AzpppEPZ9oNeogPNVZKLLroubqTbfhsvun9AaucVBNwwNXc2CCLg2LQvGcKPA8KVwK1qU7xKt38KKLEt
# {
# 	"txid": "0bf8a14239710cff95a41d0ccba381ed878b37ecba82ef0174c303548d023150"
# }
```

By default the command uses make you withdraw L-BTC funds. You can use the `--asset` flag and specify the asset of the funds to withdraw if you need to:

```bash
$ tdex fee withdraw --amount 2000000 --address AzpppEPZ9oNeogPNVZKLLroubqTbfhsvun9AaucVBNwwNXc2CCLg2LQvGcKPA8KVwK1qU7xKt38KKLEt --asset dfb6da971d312ecb6715fbeecfd1f71dcd7a2df2e341303269f5f14e784fa670
# {
# 	"txid": "b7a53f26fd49cf5a00660c5788a28265501a9a89df3ddf060d0b2abdd66e9e40"
# }
```

What's next? Check out how to [create and manage a market](market/deposit_funds.md).
