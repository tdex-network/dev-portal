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

## Manually deposit funds

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

The fragmenter is an interactive process that helps you splitting few UTXOs into many with smaller amounts. It makes use of an ephemeral single-key wallet that is no longer used after the process is completed (or aborted).  

To start the fragmenter for a market account run:

```bash
$ tdex-cli fragmentmarket
# INFO[0000] send funds to address: el1qqglmel983rhht7cw7ta62xh0xvjh83r65m7d4rjfnswla8da4l6kx5fhrsy4m9wuvmyynre730qguggfahhvyn2cpqqpdwhac
# INFO[0000] Enter txid of fund(s) separated by a white space [press ENTER to skip or confirm]:
```

After generating and showing the ephemeral address, the command waits for you to prompt the txid of the funding tx(s).  
Press _ENTER_ to confirm and continue the process: the tool calculates the optimal number of fragments based on the amount detected and sends the deposit fragments to the daemon's market account.

If, for any reason, the process fails (like for example you pasted the wrong txid, or you forgot to unlock the wallet before this step) you can always resume it with:

```bash
$ tdex fragmentmarket --txid <txid1> --txid <txid2> ...
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

This is all you have to do, the fragmenter will take care of all the rest. Once the process is completed, take a look at all other commands that let's you [manage a market](manage_account.md).
