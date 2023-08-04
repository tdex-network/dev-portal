---
slug: announcing-tdex-v2
title: Accouncing TDEX v2
author: Marco Argentieri
draft: false
author_title: TDEX Contributor
author_image_url: https://avatars.githubusercontent.com/u/3596602
tags: [liquid, tdex, bitcoin, v2]
---

Today we are pleased to announce the new version of the TDEX protocol.

The newest `v2` comes with updates to BOTD#3 and BOTD#4 that affect the way a trade is both presented and cooperatively crafted by a trader and a provider.

We have released a new major version of all our services in order to be compliant with TDEX v2.
The newest version `v1.0.0` of the daemon contains very few changes at interface level, but at the same time, under the hood it has been completely refactored by drastically improve its performances.

And the same stands for the official app! The new `v2.0.0` version of the app is a lot faster than the previous one and supports both versions of the TDEX protocol. You won't even notice if you're trading against a TDEX v1 or v2 provider!

## What's changed?

The main change of the new protocol is the adoption of the new PSETv2 format (BIP-370) as a mean to describe and (cooperatively) build the transactions.

This required inevitable breaking changes to [BOTD#3](../docs/specs/03-swap-protocol.md), so we took the chance to make some little but impactful changes also to [BOTD#4](../docs/specs/04-trade-protocol.md)

Let's see briefly how the services have changed.

### Daemon

The service that has changed the most is unavoidably the daemon, which has undergone a huge process of redesigning and refactoring.

The biggest change of the new `v1.0.0` version is the detachment of the wallet. The daemon, in fact, now requires a connection to an _Ocean wallet_ that acts as the bag of keys for crafting/signing transactions, but also as the source of all blockchain-related events.  

The coolest thing about this is that you can plug your daemon not only with the official _Ocean wallet_ implementation, but with any wallet that sticks with the _Ocean protos_ really. This opens the daemon up to a lot of new scenarios - like for example you could wrap up your preferred wallet's API and let it being used by the daemon! 

Now that the handling keys and watching the blockchain are not up to the daemon anymore, we have introduced a brand new feature that might turn out useful to you: you can setup price feeds for your markets!

This means that you can configure your provider to connect to some exchange (e.g. bitfinex) and feed your market with the prices retrieved from it asynchronously!

The providers comes with the typical CLI - with a rethinked set of commands and flags - and a brand new service that takes care of migrating your daemon from the old `v0.9.x` the the new `v1.0.0`.

Take a look at the [official documentation](../docs/provider/intro.md) and follow the tutorial to know everything you need for managing your provider.

You can see the list of all the new `v2/` APIs by looking directly at the [github repo](https://github.com/tdex-network/tdex-daemon/blob/master/api-spec/protobuf/tdex-daemon/v2).

### Dashboard

The dashboard lets you setup your daemon by the mean of a user interface that might feel you more confortable compared to the CLI.

The main change that affects the new `v1.0.0` version of dashboard is that it supports only daemons with version `1.0.0` and won't be able to connect to older ones. You'll get notified with an error otherwise.

If you already used the dashboard, you won't see big changes on the user interface beside the higher number of option you have to customize your market.

### App

The app allows users to trade their funds against the markets of the providers listed on the public registry.

It supports both TDEX v1 and TDEX v2 protocols in order to offer them the smoothest experience. You won't even notice if they're trading against a TDEX v1-compatible or a v2-compatible provider!

We didn't make any relavant changes to the user interface of the app, but you'll notice for sure the step forward in terms of perfomances!

Much faster, much reliable, the app has been refactored in order to sharply reduce the time spent on watching the blockchain.

Similarly to the daemon, the app gets now notified about blockchain events in an asynchronous way instead of polling a block explorer. This grants an higher level of permonaces that you can appreciate especially when restoring your wallet - the very first operation done by the app once you updated and unlocked it.

Go to your app store and download the latest version of the app now to enjoy the new TDEX!
