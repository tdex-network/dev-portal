---
title: 'Market Fragmenter Account'
sidebar_position: 6
---

Starting from v0.8, the daemon internal wallet makes use of 2 new special accounts. One of them is the Market Fragmenter account.

This account aims to optimize the process of depositing funds for any market acccount.  
You can send relative large amounts of both base and quote assrts to the addresses of this account that will be then splitted in many fragments, and become funds of the Fee account.

Before using the commands for this account, you need to set in your CLI config, the assets of the market you want your funds to end up to after the fragmentation with:

```bash
$ tdex config set base_asset 5ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225
# base_asset 5ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225 has been set

$ tdex config set quote_asset b33ddc389d5dabae5b8e371b535433b1c18505ecf656fce6ca8540c07ec2bde5
# quote_asset b33ddc389d5dabae5b8e371b535433b1c18505ecf656fce6ca8540c07ec2bde5 has been set
```

## Deposit and split funds

Get some deposit address(es):

```bash
$ tdex marketfragmenter deposit
# {
#  	"address": "el1qqw0jfk8qnjxywrzn0a78j779ffyvvh5p7vv80tvr9kwedefydr7j99t33eapuy9wlwfpgv7cnmc9ggq84zkws86thfyq8x03f",
# 	"blinding": "fd6647935eff475a2a9542c22b5f3d0a5e63e06a01f0ddcb8ee36d003ec35945"
# }
```

Now send funds of both the assets of the market to the address(es) and **only after** the transaction(s) gets confirmed, you can make them be fragmented with:

```bash
$ tdex marketfragmenter split
#
# fetching market fragmenter funds
#
# calculating fragments for market asset pair
#
# detected 2 funds
#
# splitting base asset amount 100000000 into 11 fragments
#
# splitting quote asset amount 5500000000000 into 11 fragments
#
# crafting market deposit transaction
#
# broadcasting transaction
#
# market account funding transaction: acd3d8105943f9044cced2ff79d4fc91637455de2b446237486f93de1e67923d
#
# claiming deposits for market account
#
# fragmentation succeeded
```

After the fragmentation succededs try to check the balances of both the market fragmenter and market accounts.  
The first will have 0 balance, while the second won't have exactly the same balance you sent to the fragmenter just because of the network fees required to include the transaction in blockchain.

## List all deposit addresses

You can see the list of all derived deposit addresses so far with:

```bash
$ tdex marketfragmenter addresses
# [
#   {
#     "address": "el1qqw0jfk8qnjxywrzn0a78j779ffyvvh5p7vv80tvr9kwedefydr7j99t33eapuy9wlwfpgv7cnmc9ggq84zkws86thfyq8x03f",
#     "blinding": "fd6647935eff475a2a9542c22b5f3d0a5e63e06a01f0ddcb8ee36d003ec35945"
#   }
# ]
```

## Check the balance

You can check the balance of the Fee account with:

```bash
$ tdex marketfragmenter balanace
# {
# 	"balance": {
# 		"5ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225": {
# 			"total_balance": "100000000",
# 			"confirmed_balance": "100000000",
# 			"unconfirmed_balance": "0"
# 		},
# 		"b33ddc389d5dabae5b8e371b535433b1c18505ecf656fce6ca8540c07ec2bde5": {
# 			"total_balance": "5500000000000",
# 			"confirmed_balance": "5500000000000",
# 			"unconfirmed_balance": "0"
# 		}
# 	}
# }
```

The output shows the total, confirmed and unconfirmed balance for each asset owned by the Market Fragmenter. 

## Withdraw funds

Unlike the Fee or market accounts, you cannot select the amount or asset to withdraw for the Market Fragmenter account. **ALL** the fetched funds are withdrawn from this account when using the command:

```bash
$ tdex marketfragmenter withdraw --address AzpppEPZ9oNeogPNVZKLLroubqTbfhsvun9AaucVBNwwNXc2CCLg2LQvGcKPA8KVwK1qU7xKt38KKLEt
# {
# 	"txid": "643b1bbf9ecd02d11bd2e8cb0ad01a54b7607c60627d710682a2482410d23c6a"
# }
```

You can optionally set the _millisats_per_byte_ to pay for network fees with the flag `--millisatsperbyte`. By default, `100 (0.1 sats/byte)` ie. the minimum defined by protocol is used.
