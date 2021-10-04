---
title: 'Manage account'
sidebar_position: 2
---

You can make use of other few commands of the operator CLI to interact with the Fee account of your daemon's internal HD wallet.

## Check the balance

You can check its balance at any time with:

```bash
$ tdex fee balance
# {
#   {
#  	  "available_balance": "73069",
# 	  "total_balance": "78069"
#   }
# }
```

The command returns the current available balance, or the sum of the value of all those UTXOs that are confirmed and not used as inputs of a yet-to-be-broadcasted transaction, and also the total balance which instead is the sum of the value of all the UTXOs, included those unconfirmed and those locked.

## List all derived addresses

It is possible to retrieve the list of all derived deposit addresses of the Fee account with:

```bash
$ tdex fee addresses
# [
#   {
#  	  "address": "el1qqdxwu2769zwkp9gn7pfl9vdvelfhjc6hk8v56wtpn6aww7h8ckhme7tj6hggvw3ycyn9epqlwzzml5yhdn9sv0dlxu676nr5k",
# 	  "blinding": "7a01d7ce7367bcd4b444f34f00580dbef5b617447a3e07cf07c8883c34a1e0d8"
#   }
# ]
```

It returns a list of all derived confidential addresseses and related private blinding keys.

## Withdraw funds

Of course, you are allowed to move funds of the Fee account away to an address of yours.  
For this you can run:

```bash
$ tdex fee withdraw --amount 10000 --address AzpppEPZ9oNeogPNVZKLLroubqTbfhsvun9AaucVBNwwNXc2CCLg2LQvGcKPA8KVwK1qU7xKt38KKLEt
# {
# 	"txid": "0bf8a14239710cff95a41d0ccba381ed878b37ecba82ef0174c303548d023150"
# }
```

By default the command uses the LBTC asset hash of the network set in the config. If you deposited funds of another asset type, you can use the `--asset` flag and specify the asset of the funds to withdraw.

```bash
$ tdex fee withdraw --amount 2000000 --address AzpppEPZ9oNeogPNVZKLLroubqTbfhsvun9AaucVBNwwNXc2CCLg2LQvGcKPA8KVwK1qU7xKt38KKLEt --asset dfb6da971d312ecb6715fbeecfd1f71dcd7a2df2e341303269f5f14e784fa670
# {
# 	"txid": "b7a53f26fd49cf5a00660c5788a28265501a9a89df3ddf060d0b2abdd66e9e40"
# }
```

Now that you kept confidence with all Fee account's commands, it's time for you to [create and deposit funds to a new market](../market/deposit_funds.md) or, if you already did that, to know more about all the other commands to [manage a market](../market/manage_account.md).
