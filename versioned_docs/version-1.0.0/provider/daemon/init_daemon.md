---
title: 'Init & Unlock'
sidebar_position: 3
---

Once the daemon is up and running and you have configured your CLI, you should initialize and unlock both its wallet and database.

You can skip the following steps if you need to [migrate your daemon](migrate_daemon.md) from the old _v0_ to new _v1_ instead.

## Setup the wallet

To create a new wallet you need a 24 words mnemonic. You can either generate your random mnemonic by your own, or you can make use of the following command:

```bash
$ tdex genseed
```

You can now initialize the provider's wallet: 

```bash
$ tdex init --password password --seed "place defense olive vast forum outer accident tissue story agent turtle desert wool wink device glass cruise chalk simple club enforce borrow health fat"
```

You can either restore an existing wallet by simply adding a `--restore` flag:

```bash
$ tdex init --password password --seed "place defense olive vast forum outer accident tissue story agent turtle desert wool wink device glass cruise chalk simple club enforce borrow health fat" --restore
```

:::tip
The provider restores the addresses, utxos and txs of all the BIP-32 accounts derived from the root path `m/84'/0'` by using a gap of 200 "unused" addresses and 2 "empty" accounts to consider the job done. This is for historical reason, since the previous v0 versions were using that specific root path.

If you want to restore a wallet with a different root path, you can do it by [interacting directly with the Ocean wallet](https://github.com/vulpemventures/ocean/tree/master#local-run). In this case, you can skip the provider's initialization phase and start directly from the unlock one once the restoration is complete.
:::

## Unlock the wallet

Now that the provider has been initialized, let's unlock it:

```bash
$ tdex unlock --password password
```

Everytime you restart your provider, it requires to be unlocked, so you may find useful activating its **auto-unlock** feature.

This can be done by saving the password to a text file and configure the daemon by exporting the environment variable `TDEX_WALLET_UNLOCK_PASSWORD_FILE=path/to/pwd.txt`. This instructs your provider to use the password stored in the file to unlock itself right after it has started.

Great! You've initialized and unlocked your daemon. It's time to [deposit funds to the `fee_account`](fee_account.md) and then [setup a new market](market_account.md).
