---
title: 'Init & Unlock'
sidebar_position: 3
---

Once the daemon is up and running and you have configured your CLI, the very next step is to initialize and unlock the daemon's HD wallet.

You can either [setup a brand new wallet](#setup-new-wallet), or you can [restore one with a mnemonic](#restore-from-mnemonic) used previously by another daemon.

## Setup new wallet

To create a new wallet you need a 24 words mnemonic. You can either generate your random mnemonic by your own, or you can make use of the following command:

```bash
$ tdex genseed
# 
# place defense olive vast forum outer accident tissue story agent turtle desert wool wink device glass cruise chalk simple club enforce borrow health fat
```

This command asks the daemon to generate a safe and strong random mnemonic that can be used ot initialize the wallet.

Initializing the HD wallet with a new mnemonic can be done with:

```bash
$ tdex init --password="password" --seed "place defense olive vast forum outer accident tissue story agent turtle desert wool wink device glass cruise chalk simple club enforce borrow health fat"
#
# Wallet is initialized. You can unlock
```

That's it! Next step is to [unlock the wallet](#unlock-the-wallet).

## Restore from mnemonic

The TDEX daemon supports the option of restoring an HD wallet from an already used mnemonic.

:::tip
Avoid to do this if the mnemonic you want to use has been generated/used by some other application. The HD scheme used to derive key pairs might be different from the one used by the daemon and the wallet itself and the funds might not be restored properly.
:::

In this process, the daemon makes use of its explorer service to first know how many accounts must be restored. This phase is called *addresses discovery*.  
The daemon starts deriving addresseses for an account asking the explorer if they were *used*, ie. involved in some transactions included in the blockchain.  
When 50 consecutive addresseses have been found "unused" the process stops and the discovery proceeds for the next account.  
An account is considered *empty* when the first 50 addresses are *unused* and when is found *empty* the *address discovery* phase terminates.

When all the accounts have been discovered, the daemon restores their funds and creates the markets related to them (no market created for the Fee account). This means you will just need to configure their fees, strategies and prices, possibly, before opening them. You won't need to create them though.

:::tip
By default the number of *unused* addresses is set to 50, but it can be customized via the dameon's environment variable `TDEX_RESCAN_GAP_LIMIT`.  
Increasing the default rescan gap limit means slowing the restoration process but increases the chances that all funds are restored correctly.  
On the other side, decreasing it means speeding up the restoration but the funds might not be all restored properly.

The default value should be a good trade-off between these two aspects. In general, it should be better to increase it instead of decreasing: if after a restore you don't see the balances you'd expect for your accounts, you may want to try to restore the wallet again by incresing the rescan gap limit.
:::

To restore your daemon's HD wallet run:

```bash
$ tdex init --password "password" --seed "your 24 words mnemonic" --restore
# addresses discovery PROCESSING
# addresses discovery DONE
# restore account 0 PROCESSING
# restore account 0 DONE
# restore account 5 PROCESSING
# restore account 5 DONE
#
# Wallet is initialized. You can unlock
```

The process may take a while, depending on how many accounts (fee and markets) must be restored. After it is finished you can [unlock the wallet](#unlock-the-wallet).



## Unlock the wallet

Now that the internal wallet is initialized, you can unlock it by running:

```bash
$ tdex unlock --password "password"
#
# Wallet is unlocked
```

You may want to take a look at the [Auto-Unlock Wallet on start-up](getting_started/run_prod.md#auto-unlock-wallet-on-start-up) if you're searching for a way to automatize this step.

:::tip
You should use a stronger and safer password for your daemon's HD wallet than the one used in the example above.

Also, be sure to backup the mnemonic of your daemon's wallet, store it in a safe place, and don't share it with anybody.
:::

Great! You've initialized and unlocked your daemon. It's time to [deposit funds into the Fee account](fee_account.md) and then [create and fund a new market](market/deposit_funds.md).
