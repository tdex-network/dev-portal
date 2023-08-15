---
title: 'Deposit funds'
sidebar_position: 1
---

## Create a new market

Creating a new market is simple as providing the asset pair of the market with:

```bash
$ tdex market new --base_asset 5ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225 --quote_asset b33ddc389d5dabae5b8e371b535433b1c18505ecf656fce6ca8540c07ec2bde5
#
# market created
```

This operation fails if trying to create a market already existing in the daemon, ie. with the same asset pair.
After you've created the market, it needs to be funded with deposits of both the base and quote assets.  
Before doing that, though, let's set the assets of the market in the CLI config:

```bash
$ tdex config set base_asset 5ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225
# base_asset 5ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225 has been set

$ tdex config set quote_asset b33ddc389d5dabae5b8e371b535433b1c18505ecf656fce6ca8540c07ec2bde5
# quote_asset b33ddc389d5dabae5b8e371b535433b1c18505ecf656fce6ca8540c07ec2bde5 has been set
```

## Deposit and claim funds

Get some deposit address(es):

```bash
tdex market deposit --num_of_addresses 2
# {
# 	"address_with_blinding_key": [
#     {
#       "address": "el1qq2gn3y2r5405dppjk2yc2tjg0zxxy35fr0y9lc3yyrnyf07ktuht0ymzrh8hnjwl62w9ws6jwl3yh40k8cd26wfc27sug3rmh",
#       "blinding": "2fab376ffecbee0cb7b70794373be35c7b24340a2652f1a10c8200b04ab3eedb"
#     },
#     {
#     	"address": "el1qq092gt6vyda85eqmqk5xh6dmjujljvm5mjzurn9k36nu6f6veheqqyh3hgtlwpd0y70tdccf5ua395hugwjv2ccw237cl9tal",
#     	"blinding": "7eab1dea4e504bb90ff96e692393ecb55f9edf9e4c840cd820e24ef27f4a27b0"
#     }
# 	]
# }
```

Send funds of both the base and quote asset to the address(es), then you can claim the deposits for the market:

```bash
$ tdex-cli market claim --outpoints '[{"hash": "a85d92ce884cc578c28dc976166ab848c78580ab217d3cb66ab44f423e402adb", "index": 1}, {"hash": "57fc2ff04316f753a042b129a2f381471baf1adb11caa5e596a6c9ac339ebc47", "index": 1}]'

# market is funded
```

The daemon will start watching for those unconfirmed unspents if needed. You might not see the expected available balance until all utxos have ben at least included in blockchain.

:::tip
Take a look at the [Market Fragmenter](../market_fragmenter_account.md), a special account that splits its funds into many fragments, becoming then deposits of a market account. This account aims to make you life easier for depositing funds to some market account.
:::


Check out all other available commands to [manage a market](manage_account.md) account.
