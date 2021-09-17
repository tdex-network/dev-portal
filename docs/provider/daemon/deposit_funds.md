---
title: 'Deposit funds'
sidebar_position: 3
---

To create a market, you need to deposit two reserves of two **Liquid assets** for the pair (called **Market**) you are providing liquidity for. Each **Market** has a BASE ASSET, which is always the same per daemon, and a QUOTE ASSET.

To determine the spot price you can adopt different strategies, at the moment the supported one are **PLUGGABLE** and **BALANCED**.

The PLUGGABLE strategy expects you to update the price manually, plugging in an external price feed that need to call the `UpdateMarketPrice` rpc method of the operator interface. If you're searching for an automatized way to do this operation, take a look at the [TDEX Feeder service](../feeder/overview.md).

The BALANCED strategy (this is the default when you create a market) uses **Automated Market Making** to determine the spot price. The initial ratio of the two amounts you deposit will represent the price of the first trade you accept in.
From that point on, the **automated market making strategy will self regulate the trading price**. It follows the *constant product market-making* formula. Every transaction that occurs on this market will adjust the prices of the market accordingly. It's a basic supply and demand automated market making system.

## Initialize and unlock the wallet

The very first thing to do after you started your daemon is to setup the internal wallet.  

If you want to create a new wallet, you should find useful generating a random mnemonic seed with:

```bash
$ tdex genseed
```

Now that you have a seed, you can initialize the daemon's wallet:

```bash
$ tdex init --seed "<generatedSeed>" --password <mypassword>
```

**OR**, instead, if you want to import and restore an existing wallet:

```bash
$ tdex init --seed "<mySeed>" --password <mypassword> --restore
```

Keep in mind that restoring a wallet can take a while, depeneding on the total number of accounts and addresses-per-account generated.

The daemon locks its embedded wallet after the initalization has succeded, so the next step is to unlock it with the password:

```bash
$ tdex unlock --password <mypassword>
```

## Deposit funds

Finally, you are ready to deposit funds: you can either [manually deposit funds](#manual-deposit) to the daemon, or you can make use of the [fragmenter tool](#fragmenter-tool) that facilitates the process, empowering the daemon to serve an higher number of concurrent swap requests. 

### Manual deposit

In order to manually send funds to the daemon wallet, you need to get a deposit address from the fee account:

```
$ tdex depositfee [--num_of_addresses]
```

Use the `--num_of_addresses` flag to get more than one address to send funds to multiple addresses.

Now send some L-BTC that will be used to subsidize Liquid network fees.

After the transaction get confirmed, you can claim the deposits for the fee account:

```
$ tdex claimfee --outpoints '[{"hash": <txid>, "index": <vout>}]'
```

The same flow applies to create a market, so first of all get some address(es) for the market:

```bash
# To create a new market and derive addresses for that account
$ tdex depositmarket [--num_of_addresses]
# To derive addresses for an already existing market
$ tdex depositmarket --base_asset <basetAsset> --quote_asset <quoteAssethash> [--num_of_addresses]
```

Now send some amount of base asset (by default is LBTC) and quote asset of choice to the address(es) - such as USDt or LCAD.

Again, after the tx gets confirmed you can claim the deposits for the market:

```bash
# You need tell to the CLI for which market you are claiming the funds to
$ tdex config set base_asset <baseAssethash>
$ tdex config set quote_asset <quoteAssethash>

$ tdex claimmarket --outpoints '[{"hash": <txid>, "index": <vout>}, {...}]'
```

### Fragmenter tool

You can make use of the fragmenter tool, an interactive process that let's you send all the funds to an ephemeral wallet that splits the total amount into smaller fragments, increasing the capabilities of the daemon to serve an higher number of concurrent trade requests:

Get the address where to send fee account's funds to:

```bash
$ tdex fragmentfee
# INFO[0000] send funds to address: el1qqtqj6psznm2km5axsj8qxgduzzznzjvmxfs3qh7h83hsp72hp0s5hzzwlzv92cgr44qtl4krrykddyv6xtcmvpusqraynmn0k
# INFO[0000] Enter txid of fund(s) separated by a white space [press ENTER to skip or confirm]:
```

After generating and showing the ephemeral address, the command waits for you to prompt the txid of the funding tx(s).  
Press _ENTER_ to confirm and continue the process: the tool calculates the optimal number of fragments based on the amount detected and sends the fragmented funds to the daemon's fee account.

If, for any reason, the process fails (like for example you pasted the wrong txid, or you forgot to unlock the wallet before this step) you can always resume it with:

```bash
$ tdex fragmentfee --txid <txid1> --txid <txid2> ...
```

The fragmenter is smart enough to recognize if any previous attempt exited before being completed. In that case, it expects you to resume that one by providing the list of funding txids. If this time everything's allright, the process will complete as described above. Only after a fragmentation process is completed, it is possible to go for another one.

Another option is to abort the pending process instead of resuming it:

```bash
$ tdex fragmentfee --recover_funds_to_address <address>
```

With the `--recover_funds_to_address` you can specify an address where to send all the funds owned by the fragmenter and abort the process instead of completing it.

The fragmenter can be used also for market's deposits, and starting the interactive process is as easy as running:

```bash
$ tdex fragmentmarket
# INFO[0000] send funds to address: el1qqf9w40vhwnq0rjejfuv0l4hlhgc6zwdacftra5yd3rakl8s3y0pn3078ul8jh5dhfg7rpceu2xt8wyx92wz9swqsm2p6fcjvq
# INFO[0000] Enter txid of fund(s) separated by a white space [press ENTER to skip or confirm]:
```

Fund the temporary wallet address and prompt the txid(s) of the funding tx(s).  
Press _ENTER_ to confirm and continue the process in order to calculate the optimal number of fragments and to send them to the daemon's market account.

If, for any reason, the process fails, the same resume flow described above applies for `fragmentmarket --txid <txid1> ...`.

To abort it, instead, you can use the `--recover_funds_to_address`  flag as described above.

You can check the status of the market with:

```bash
$ tdex listmarket
```

## Manage a market

* Set the CLI to work with the newly created market:

```bash
$ tdex config set base_asset <baseAssethash>
$ tdex config set quote_asset <quoteAssethash>
```

You can always check the current state with the following command

```bash
$ tdex config
```

Now the following commands will be executed against this market.

* Open the market using automated market making

```bash
$ tdex open
```
This makes the selected market available for trading using the BALANCED market strategy

* Close the market

```bash
$ tdex close
```

This makes the selected market NOT available for trading.

* Update the percentage fee

```bash
$ tdex percentagefee --basis_point 100
```

This updates the current market percentage fee to 1% (by default it's 0.25%).

* Update the fixed fee

```bash
$ tdex fixedfee --base_fee 600 --quote_fee 20000
```

:::tip
Consider to set a fixed fee of ~650 sats of LBTC and correspond amount of quote asset on the markets of your daemon since you'll always pay for network fees for the all the swap transactions made by traders.
:::

This updates the current market fixed fees (by default they're 0).

* Change market making strategy to pluggable

```bash
$ tdex strategy --pluggable
```

* Update the price

```bash
$ tdex price --base_price=16000 --quote-price=0.001
```
This updates the current market price to be used for future trades.

* Open the market again

```bash
$ tdex open
```

Congratulations! Your daemon is now ready to accept trade proposals from all over the world.

Check all the trades served by the daemon (including those ongoing and those that have been rejected or expired) with:

```bash
# List all trades for the current market.
# If no market is configured in the cli state, it lists all trades for all markets
$ tdex listtrades

# List trades for market with pagination and default page size
$ tdex listtrades --page 1

# List trades for market with pagination and custom page size
$ tdex listtrades --page 1 --page_size 20


# List all trades for all markets
$ tdex listtrades --all
```