---
title: 'Deposit funds'
sidebar_position: 1
---

The daemon is designed to pay for Liquid network fees to include a transaction in the blockchain, whether it is a trade between the daemon and a trader or a withdraw from one of the HD wallet accounts.

The Fee account is the very first account you should send funds to. This account is designed to handle only LBTCs funds. If you deposit funds of some other asset type you'll stll be able to withdraw them.

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

The fragmenter helps you splitting few UTXOs into many fragments of `5000` satoshis each, becoming funds of the daemon's Fee account. It makes use of an ephemeral single-key wallet that is discarded after the process is completed or aborted. A brand new wallet is used for every new fragmentation.

Starting the process is as simple as running the command below:

```bash
$ tdex fee deposit --fragment [--max_fragments]
# send funds to the following address: el1qqtqj6psznm2km5axsj8qxgduzzznzjvmxfs3qh7h83hsp72hp0s5hzzwlzv92cgr44qtl4krrykddyv6xtcmvpusqraynmn0k
# press ENTER to continue after the funds have been trasferred to the fragmenter:
# 
# ***** after pressing ENTER *****
# 
# fetching funds for ephemeral wallet
# 
# calculating fragments for LBTC funds
# 
# detected 2 fund(s) of total amount 100000 that will be split into 20 fragments
# 
# crafting fee deposit transaction
# 
# broadcasting transaction
# 
# fee account funding transaction: d76c79295ad3ba56480bd3829ab2f058189bb1fc32eebf4b8c326d2369fcb1de
# 
# claiming deposits for fee account
# 
# fragmentation succeeded
```

You can optionally set the max number of fragments that can be generated when splitting the funds sent to the ephemeral wallet.  
By default, this value is set to `50` and is highly discouraged to increase it because transactions with too many outputs won't be included in blockchain becuase their weight could exceed the max tx size of 100K bytes.

When you funded the ephemeral wallet address and the transaction has been included in blockchain, you can press _ENTER_ and the process will continue by fetching the utxos of the ephemeral wallet and splitting them into multiple deposits for the Fee account.

If for any reason the fragmentation does not succeed you can retry by running the same command again and just pressing _ENTER_.  
The ephemeral wallet does not change until the process is either completed or aborted.

To abort a fragmentation, you can run:

```bash
$ tdex fee deposit --fragment --recover_funds_to_address el1qqwg8mnllqtlh8fhcvwfjqt8eapptmh2l39cegs0a89qyu9hp6upyg8tu35l9z83crtqrrgps8ma4fn358sghku2d3e378y7aw
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
# sent all ephemeral wallet funds to address el1qqwg8mnllqtlh8fhcvwfjqt8eapptmh2l39cegs0a89qyu9hp6upyg8tu35l9z83crtqrrgps8ma4fn358sghku2d3e378y7aw in tx: 71d1af7be9f2c74b6b83dfb13dc2e046e817ec01b9255344b8be1359a9b3a778
#
# recover succeeded
```

Change the address in the example with an address of yours. Press _ENTER_ when asked, and the fragmenter will send back all its funds to your address and abort the process so a new one can eventually be done later.

That's it. As you can see the fragmenter is really handful because it helps depositing funds to the daemon with just one command. Once the process is completed you're ready to [create and deposit funds to a new market](../market/deposit_funds.md), but still consider taking a look also at how you can [manage the fee account](manage_account.md).
