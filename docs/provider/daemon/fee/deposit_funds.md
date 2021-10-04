---
title: 'Deposit funds'
sidebar_position: 1
---

The daemon is designed to pay for Liquid network fees to include a transaction in the blockchain, whether it is a trade between the daemon and a trader or a withdraw from one of the HD wallet accounts.

The Fee account is the very first account you should send funds to. This account is designed to handle only LBTCs funds. If you deposit funds of some other asset type, don't panic, you'll stll be able to withdraw them as long as you actually deposit LBTCs into this account.

Since this account is meant to only pay for network fees, it will need to cover very low amounts, like ~700 sats/vbyte per transaction is its a trade, even lower for withdrawls. Therefore, it is suggested to fund it with multiple UTXOs with small amounts like for example 2000 or 5000 sats.  

You can either [manually deposit funds](#manually-deposit-funds) into the Fee account or you can make use of the [Fragmenter](#fragmenter) tool that facilitates the process of splitting few funds with "big" amounts into many fragments with smaller amounts.

## Manually deposit funds

Get some deposit address(es):

```bash
$ tdex fee deposit
# {
#  	"address": "el1qqdxwu2769zwkp9gn7pfl9vdvelfhjc6hk8v56wtpn6aww7h8ckhme7tj6hggvw3ycyn9epqlwzzml5yhdn9sv0dlxu676nr5k",
# 	"blinding": "7a01d7ce7367bcd4b444f34f00580dbef5b617447a3e07cf07c8883c34a1e0d8"
# }
```

Use the `--num_of_addresses` flag to get more than one address to send funds to.

Now send some L-BTC to the address(es) and **only after** the transaction(s) gets confirmed, you can claim the deposits for the fee account:

```bash
$ tdex fee claim --outpoints '[{"hash": 248a47a99ae3e6de93a614a05ab1c0e064aa9ea2fb292bfa1b33c48b067cac10, "index": 1}]'

# fee account is funded
```

That's it! You have funded the fee account. Now you can take a look at how to [manage this account](manage_account.md) or you can proceed with [creating and funding a new market](../market/deposit_funds.md).

## Fragmenter

The fragmenter is an interactive process that helps you splitting few UTXOs into many fragments of `5000` satoshis. It makes use of an ephemeral single-key wallet that is no longer used after the process is completed (or aborted).  

To start the fragmenter for the Fee account run:

```bash
$ tdex fragmentfee
# INFO[0000] send funds to address: el1qqtqj6psznm2km5axsj8qxgduzzznzjvmxfs3qh7h83hsp72hp0s5hzzwlzv92cgr44qtl4krrykddyv6xtcmvpusqraynmn0k
# INFO[0000] Enter txid of fund(s) separated by a white space [press ENTER to skip or confirm]:
```

After generating and showing the ephemeral address, the command waits for you to prompt the txid of the funding tx(s).  
Press _ENTER_ to confirm and continue the process: the tool calculates the optimal number of fragments based on the amount detected and sends the deposit fragments to the daemon's fee account.

You can optionally start the fragmenter by specifying the max number of possible fragments it is allowed to create. By default it is set to 50 if not specified:

```bash
$ tdex fragmentfee --max_fragments 20
```

:::tip
Take into account that the --max_fragments value basically defines the max number of outputs for the Fee account's deposit transaction.  
In the Liquid network, transactions that weights more that 100K vBytes are rejected for being too heavy, therefore you should set this value at max to `70` or you'll risk to bump into this issue.
:::

If, for any reason, the process fails (like for example you pasted the wrong txid, or you forgot to unlock the wallet before this step) you can always resume it with:

```bash
$ tdex fragmentfee --txid <txid1> --txid <txid2> ...
```

The fragmenter is smart enough to recognize if any previous attempt exited before being completed. In that case, it expects you to resume that one by providing the list of funding txids. If this time everything's allright, the process will complete as described above. Only after a fragmentation process is completed, it is possible to go for another one.

Another option is to abort the pending process instead of resuming it and send the "stuck" funds back to an address of yours instead of depositing them into the daemon HD wallet:

```bash
$ tdex fragmentfee --recover_funds_to_address <address>
```

This will send all the funds owned by the fragmenter to the specified address and abort the process instead of completing it.

:::tip
If you have funds stuck on the ephemeral wallet of the fragmenter, it is strongly suggested to backup your operator CLI datadir (usually located at `~/.tdex-operator` in Linux or `~/Library/Application\ Support/Tdex-operator in OSX) as long as you haven't completed or aborted the process, in order to prevent loosing them if you delete the datadir by accident.
:::

This is all you have to do, the fragmenter will take care all the rest. Once the process is completed you'll be ready to [create and deposit funds to a new market](../market/deposit_funds.md), but still consider taking a look also at how you can [manage the fee account](manage_account.md).
