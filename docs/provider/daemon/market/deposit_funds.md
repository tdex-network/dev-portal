---
title: 'Deposit funds'
sidebar_position: 1
---

The flow to create and deposit funds to a new market has been changed starting from version v0.6.0.

Before this version the market's asset pair was deducted by the daemon by checking the asset types of the claimed deposits.  
Starting from v0.6.0 you're in charge of explicitly create a market by specifying its asset pair before sending funds to it.

## Create a new market

Starting from v0.6.0 the first thing you have to do for opening a market is to explicitly create it by specifying its asset pair:

```bash
$ tdex market new --base_asset 5ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225 --quote_asset b33ddc389d5dabae5b8e371b535433b1c18505ecf656fce6ca8540c07ec2bde5
#
# market created
```

Now that the market is created, it needs to be funded with funds of both its base and quote assets.  
Before doing that, though, you have to set the assets of the market in your CLI config:

```bash
$ tdex config set base_asset 5ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225
# base_asset 5ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225 has been set

$ tdex config set quote_asset b33ddc389d5dabae5b8e371b535433b1c18505ecf656fce6ca8540c07ec2bde5
# quote_asset b33ddc389d5dabae5b8e371b535433b1c18505ecf656fce6ca8540c07ec2bde5 has been set
```

You're ready to deposit the funds! You can choose to [manually deposit the funds](#manually-deposit-funds) into the market or to use the [Fragmenter](#fragmenter) to automatically split funds sent to an ephemeral address into many smaller ones that will be deposited into the market.

## Manually deposit funds

Get some deposit address(es):

```bash
tdex market deposit --num_of_addresses 2
# {
# 	"address_with_blinding_key": [
# 		{
# 			"address": "el1qq2gn3y2r5405dppjk2yc2tjg0zxxy35fr0y9lc3yyrnyf07ktuht0ymzrh8hnjwl62w9ws6jwl3yh40k8cd26wfc27sug3rmh",
# 			"blinding": "2fab376ffecbee0cb7b70794373be35c7b24340a2652f1a10c8200b04ab3eedb"
# 		},
#     {
#     	"address": "el1qq092gt6vyda85eqmqk5xh6dmjujljvm5mjzurn9k36nu6f6veheqqyh3hgtlwpd0y70tdccf5ua395hugwjv2ccw237cl9tal",
#     	"blinding": "7eab1dea4e504bb90ff96e692393ecb55f9edf9e4c840cd820e24ef27f4a27b0"
#     }
# 	]
# }
```

Send funds of both the base and quote asset to the address(es) and **only after** the transaction(s) gets confirmed, you can claim the deposits for the market:

```bash
$ tdex-cli market claim --outpoints '[{"hash": "a85d92ce884cc578c28dc976166ab848c78580ab217d3cb66ab44f423e402adb", "index": 1}, {"hash": "57fc2ff04316f753a042b129a2f381471baf1adb11caa5e596a6c9ac339ebc47", "index": 1}]'

# market is funded
```

Done! You have created and funded a new market. You may want to take a look at the other commands of the operator CLI to [manage a market](manage_account.md)

## Fragmenter

The fragmenter helps you splitting few UTXOs into many fragments of `5000` satoshis each, becoming funds of a daemon's market account. It makes use of an ephemeral single-key wallet that is discarded after the process is completed or aborted. A brand new wallet is used for every new fragmentation.

Starting the process is as simple as running the command below:

```bash
$ tdex-cli market --deposit --fragment
# send funds to the following address: el1qqglmel983rhht7cw7ta62xh0xvjh83r65m7d4rjfnswla8da4l6kx5fhrsy4m9wuvmyynre730qguggfahhvyn2cpqqpdwhac
# press ENTER to continue after the funds have been trasferred to the fragmenter
#
# ***** after pressing ENTER *****
#
# fetching funds for ephemeral wallet
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
# market account funding transaction: 0f7210c6308b2e52ef41a8da53ba391b43b1624b718cd75bc5cd12e26f854276
#
# claiming deposits for market account
#
# fragmentation succeeded
```

When you funded the ephemeral wallet address and the transaction has been included in blockchain, you can press _ENTER_ and the process will continue by fetching the utxos of the ephemeral wallet and splitting them into multiple deposits for the Fee account.

If for any reason the fragmentation does not succeed you can retry by running the same command again and just pressing _ENTER_.  
The ephemeral wallet does not change until the process is either completed or aborted.

To abort a fragmentation, you can run:

```bash
$ tdex market deposit --fragment --recover_funds_to_address el1qqwg8mnllqtlh8fhcvwfjqt8eapptmh2l39cegs0a89qyu9hp6upyg8tu35l9z83crtqrrgps8ma4fn358sghku2d3e378y7aw
# press ENTER to continue after the funds have been trasferred to the fragmenter
#
# fetching funds for ephemeral wallet
#
# found 1 unspents with amount per asset:
#
# 5ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225: 99999868 (network fees deducted)
#
# crafting recover trasaction
#
# broadcasting transaction
#
# sent all ephemeral wallet funds to address el1qqwg8mnllqtlh8fhcvwfjqt8eapptmh2l39cegs0a89qyu9hp6upyg8tu35l9z83crtqrrgps8ma4fn358sghku2d3e378y7aw in tx: 2a4dfc6b73a9e08ba3e6904dd98bcaf98814f1b1c9e648ae0f555fb3448d2026
#
# recover succeeded
```

Change the address in the example with an address of yours. Press _ENTER_ when asked, and the fragmenter will send back all its funds to your address and abort the process so a new one can eventually be done later.

This is all you have to do, the fragmenter will take care of all the rest. Once the process is completed, take a look at all other commands that let's you [manage a market](manage_account.md).
