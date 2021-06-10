---
sidebar_position: 1
---

# Overview

A **Provider** holds Liquid reserves of both a *BASE_ASSET-QUOTE_ASSET*  in his non-custodial Liquid hot-wallet, running automated market-making strategies, either with or without an oracle. Providers are incentivized to be always on and need to expose a public reachable endpoint either via clearnet or using a [Onion hidden service](https://2019.www.torproject.org/docs/tor-onion-service.html)

A small provider's fee can be taken out of each trade and added to the reserves. While the *BASE_ASSET-QUOTE_ASSET* reserve ratio is constantly shifting, fees make sure that the total combined reserve size increases with every trade.
Guaranteed arbitrage opportunities from price fluctuations should push a steady flow of transactions through the system and increase the amount of fee revenue generated.

A liquidity provider has full control over the market making strategy to apply needed to calculate the **market rate** at which to accept trades. That being said, there is a possibility to apply an automated market-making relying only on the reserves balances and the amount requested by the trader, without the need to connect to an external price feed. The default strategy of the alpha daemond is the *constant product market-making*. In short, this model generates a full order-book based on an initial price for the market. Every transaction that occurs on this market will adjust the prices of the market accordingly. It's a basic supply and demand automated market making system. 


### Provide liquidity for traders and earn fees

* [Install and run TDEX Daemon on your server](daemon.md)
* Install and run on RaspiBlitz (Coming Soon)
* One-click deploy on Ocelot.net (Coming Soon)
* One-click deploy on Amazon Web Services (Coming Soon)


### Register the provider on the network

* [Register your provider on TDEX registry](registry.md)
* Create your own registry (Coming soon)
