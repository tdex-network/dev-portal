---
title: 'Fee Fragmenter Account'
sidebar_position: 6
---

Starting from v0.7.2, the daemon internal wallet makes use of 2 new special accounts. One of them is the Fee Fragmenter account.

This account aims to optimize the process of depositing funds to the Fee acccount.  
You can send relative large amounts of L-BTC to the addresses of this account that will be then splitted in many fragments of 5000 sats each, and become funds of the Fee account.

## Deposit and split funds

Get some deposit address(es):

```bash
$ tdex feefragmenter deposit
# {
#  	"address": "el1qqwpdh5ukef958ptywaqk8xdp9j4v8svfmmfhd32szs0f486dc20wwgxf58avsn2ycrs8xa92093j9f3lq5luulgkgsqskkws8",
# 	"blinding": "a78bdfe9126badd956f4fe36b5289c0937141edf5cd1ca8746ee713ad06efa19"
# }
```

Now send some L-BTC to the address(es) and **only after** the transaction(s) gets confirmed, you can make them be fragmented with:

```bash
$ tdex feefragmenter split
#
# fetching fee fragmenter funds
#
# calculating fragments for LBTC funds
#
# detected 1 fund(s) of total amount 100000 that will be split into 20 fragments
#
# crafting fee deposit transaction
#
# broadcasting transaction
#
# fee account funding transaction: 480293fdc417a7179ae82185140eb56873e4cffb557bf8c2248f60e7c12ac394
#
# claiming deposits for fee account
#
# fragmentation succeeded
```

After the fragmentation succededs try to check the balances of both the fee fragmenter and fee accounts.  
The first will have 0 balance, while the second won't have exactly the same balance you sent to the fragmenter just because of the network fees required to include the transaction in blockchain.

## List all deposit addresses

You can see the list of all derived deposit addresses so far with:

```bash
$ tdex feefragmenter addresses
# [
#   {
#   	"address": "el1qqwpdh5ukef958ptywaqk8xdp9j4v8svfmmfhd32szs0f486dc20wwgxf58avsn2ycrs8xa92093j9f3lq5luulgkgsqskkws8",
#   	"blinding": "a78bdfe9126badd956f4fe36b5289c0937141edf5cd1ca8746ee713ad06efa19"
#   }
# ]
```

## Check the balance

You can check the balance of the Fee account with:

```bash
$ tdex feefragmenter balanace
# {
# 	"balance": {
# 		"5ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225": {
# 			"total_balance": "100000",
# 			"confirmed_balance": "100000",
# 			"unconfirmed_balance": "0"
# 		}
# 	}
# }
```

The output shows the total, confirmed and unconfirmed balance for each asset owned by the Fee Fragmenter. 

## Withdraw funds

Unlike the Fee or market accounts, you cannot select the amount or asset to withdraw for the Fee Fragmenter account. **ALL** the fetched funds are withdrawn from this account when using the command:

```bash
$ tdex feefragmenter withdraw --address AzpppEPZ9oNeogPNVZKLLroubqTbfhsvun9AaucVBNwwNXc2CCLg2LQvGcKPA8KVwK1qU7xKt38KKLEt
# {
# 	"txid": "c33151440427bdcb0fba97dfed0cac83273e5562b9a5f6c90454664c7ee533bd"
# }
```

You can optionally set the _millisats_per_byte_ to pay for network fees with the flag `--millisatsperbyte`. By default, `100 (0.1 sats/byte)` ie. the minimum defined by protocol is used.

These are all the commands available for the Fee Fragmenter account.  

After you used the Fee Fragmenter, you should be ready to [create and manage a market](market/deposit_funds.md) account.
