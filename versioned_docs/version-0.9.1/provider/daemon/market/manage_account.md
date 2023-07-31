---
title: 'Manage a market'
sidebar_position: 2
---

Here below you can find a list with the description of all the other commands of the operator CLI to interact with a market account of your daemon's internal HD wallet.

:::tip
At any time, you can obtain detaild info about all the markets created in the daemon with:

```bash
$ tdex listmarkets
# {
# 	"markets": [
# 		{
# 			"market": {
# 				"base_asset": "5ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225",
# 				"quote_asset": "b33ddc389d5dabae5b8e371b535433b1c18505ecf656fce6ca8540c07ec2bde5"
# 			},
# 			"fee": {
# 				"basis_point": "25",
# 				"fixed": {
# 					"base_fee": "600",
# 					"quote_fee": "10000000"
# 				}
# 			},
# 			"tradable": false,
# 			"strategy_type": "PLUGGABLE",
# 			"account_index": "5",
# 			"price": {
# 				"base_price": 40000,
# 				"quote_price": 0.000025
# 			},
# 			"balance": {
# 				"base_amount": "100000000",
# 				"quote_amount": "4000000000000"
# 			}
# 		}
# 	]
# }
```
:::

## Check the balance

```bash
$ tdex market balance
# {
# 	"available_balance": {
# 		"base_amount": "100000000",
# 		"quote_amount": "4000000000000"
# 	},
# 	"total_balance": {
# 		"base_amount": "100000000",
# 		"quote_amount": "4000000000000"
# 	}
# }
```
This commands shows the available balance and the total balance for a market. The available balance takes into account only the UTXOs that are confirmed and not currently used as inputs of yet-to-be-broadcasted transactions, while the total balance takes into account all those UTXOs excluded before.  
In the example above all UTXOs are currently confirmed and not locked by any transaction.

## List all derived addresses

It is possible to retrieve the list of all derived deposit addresses of a market account with:

```bash
$ tdex market addresses
# {
# 	"address_with_blinding_key": [
# 		{
# 			"address": "el1qq2gn3y2r5405dppjk2yc2tjg0zxxy35fr0y9lc3yyrnyf07ktuht0ymzrh8hnjwl62w9ws6jwl3yh40k8cd26wfc27sug3rmh",
# 			"blinding": "2fab376ffecbee0cb7b70794373be35c7b24340a2652f1a10c8200b04ab3eedb"
# 		},
# 		{
# 			"address": "el1qq092gt6vyda85eqmqk5xh6dmjujljvm5mjzurn9k36nu6f6veheqqyh3hgtlwpd0y70tdccf5ua395hugwjv2ccw237cl9tal",
# 			"blinding": "7eab1dea4e504bb90ff96e692393ecb55f9edf9e4c840cd820e24ef27f4a27b0"
# 		}
# 	]
# }
```

It returns a list of all derived confidential addresseses and related private blinding keys.

## Update the relative fee of the market

The relative fee is a percentage fee added to or deducted from the counter amount of a trade proposal, depending on the type of the trade (BUY or SELL respectively). It is expressed in basis point (bp) and can assume values in the range [1, 9999], ie. from 0.01% to 99.99% of the traded amount. 
For example, a trader selling LBTC on a LBTC-USDt market with a relative fee set to 100bp means that 1% of the receiving USDt amount is kept by the liquidity provider.
Inversely, a trader buying LBTC on a LBTC-USDt market with a relative fee set to 100bp means that the trader will have to pay 1% more of the USDt amount to be sent in order to pay the liquidity provider.

```bash
$ tdex market percentagefee --basis_point 100
```

:::tip 
When a market is created, by default the percentage fee is set to `250` typically. This value is customizable via the `TDEX_DEFAULT_FEE` env var before starting the daemon. If you plan to open several markets on your daemon all of them with the same percentage fee, consider exporting the environment variable instead of manually update it for every market with the operator CLI.
:::

## Update the fixed fee of the market

Since your daemon will always pay for network fees, you may want to specify a fixed fee that will be charged to the trades so that the traders contribute indirectly to cover the fee amount of the transactions.

The fixed fee can be specified for both the base asset and the quote asset. When a market is created, this kind of fee is set to 0 for both assets.

To update it, you can run:

```bash
$ tdex market fixedfee --base_fee 600 --quote_fee 20000
#
# market fees have been updated
```

:::tip
The fixed fee is also used by the daemon as a way to discourage trades with very low amounts because it is used as the minimum amount allowed for amounts in a trade proposal in order to be accepted. Consider setting this to half or the whole typical fee amount (ie ~700 sats of LBTC per trade).
:::

## Update the strategy of the market

The AMM strategy defines how your daemon calculates the current price for a market. By default, when a market is created the strategy is set to `BALANCED`, which is a strategy that uses the constant product formula. This means that the current price depends exclusively from the balances of your market and the counter amount for a trade proposal is calculated by keeping constant the product of the base and quote asset balances.

At the time of writing (v0.6.0), the daemon supports only another type of strategy which is named `PLUGGABLE`. This strategy requires you to manually update the current base and quote price of the market, plugging in an external price feed that can be done by calling the `UpdateMarketPrice` RPC of the Operator interface.

To update the strategy of your selected market run:

```bash
# set the strategy to PLUGGABLE
$ tdex market strategy --pluggable
#
# strategy has been updated

# set the strategy to BALANCED
$ tdex market strategy --pluggable=false
#
# strategy has been updated
```

:::tip
If you want to use an external price feed for your market instead of the BALANCES strategy, but you also don't want to periodically update the market price by hand, you may find the [TDEX Feeder](../../feeder/overview.md) a solution that fits your needs.
:::

## Update the price of the market

To manually update the price of the selected market run:

```bash
$ tdex market price --base_price 40000 --quote-price 0.000025
#
# price has been updated
```

## Open the market

Your market is ready to be opened by running: 

```bash
$ tdex market open
#
# market is open
```

This command makes the market tradable, therefore it will be visibile by traders by calling the ListMarkets RPC of the public Trade interface of the daemon.

## Close a market

To close the market run:

```bash
$ tdex market close
#
# market is close
```

## List collected fees for trades on the market

You can get info about the fees collected by the daemon on the trades made with traders for the selected market:

```bash
$ tdex market reportfee
{
	"collected_fees": [
	],
	"total_collected_fees_per_asset": {
	}
}
```

This command prints to stdout the list of collected fees per each trade and the sum of these fees per each asset of the market pair.

This command makes the market not tradable, therefore it won't be visibile by traders who call the ListMarkets RPC on the public Trade interface.

## Withdraw from market

To withdraw funds from the market run:

```bash
# withdraw from both asset pairs
$ tdex-cli market withdraw --base_amount 1000000 --quote_amount 1000000000 --address AzpnfRDMibvBfrzzdnq4aDCpfvENqRqckXRxqNNSPvLGqvPoucsiWfxryZxXErpXkMWqkts8ooaqVAXB

# withdraw only base asset amount
$ tdex-cli market withdraw --base_amount 1000000 --address AzpnfRDMibvBfrzzdnq4aDCpfvENqRqckXRxqNNSPvLGqvPoucsiWfxryZxXErpXkMWqkts8ooaqVAXB

# withdraw only quote asset amount
$ tdex-cli market withdraw --quote_amount 1000000000 --address AzpnfRDMibvBfrzzdnq4aDCpfvENqRqckXRxqNNSPvLGqvPoucsiWfxryZxXErpXkMWqkts8ooaqVAXB
```

This command returns the hash of the withdrawal transaction.

## Drop market

To drop a market, hence to delete the market account associated with an asset pair, run:

```bash
$ tdex market drop
#
# market is dropped
```

This will reset the HD wallet account associated with the market's asset pair. Make sure you withdrew all the funds from the market before doing this operation.
