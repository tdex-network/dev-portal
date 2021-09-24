---
title: 'Discovery'
sidebar_position: 5
---

TDEX clients often use multiple daemons. These daemons can provide the same market to the trader client. In this case, it is up to the trader to choose the provider that best suits his needs. For instance if two daemons provides a market LBTC<->USDT, the trader might want to choose the daemon that offers him the lowest price for instance.

For this kind of use case, the SDK provides a class named `Discoverer`. It allows to "discover" the best daemon (among a list) according to a given strategy. The "strategy" using to select daemons is called `Discovery`. It is basically a function with the following signature: 

```typescript
export type Discovery = (
  clients: TraderClientInterface[], // 1 client = 1 provider
  discoveryOpts: DiscoveryOpts, // data about the trade
  errorHandler?: (err: any) => Promise<void> // optional async error handler, if `undefined` errors will be ignored
) => Promise<TraderClientInterface[]>;

export interface DiscoveryOpts {
  market: MarketInterface; // which market the trader is targetting
  amount: number; // using for preview
  asset: string; // using for preview
  type: TradeType; // type of trade BUY or SELL
}
```

`Discoverer` takes `Discovery` function in constructor. the SDK exports two discovery functions: `bestBalanceDiscovery` and `bestPriceDiscovery`. However, feel free to write your own according to your needs.

### Best balance discovery

`bestBalanceDiscovery` will make gRPC calls on `balances` endpoints for each providers. Then, it compares all the balances and return the one with the greater amount. In other words, it allows you to select the provider that has the most liquidity for the targeted market. 

```typescript
import { Discoverer, bestBalanceDiscovery } from "tdex-sdk";

const myProvidersClients: TraderClientInterface[] = [...]

const discoverer = new Discoverer(
  myProvidersClients,
  bestBalanceDiscovery,
);

const discoveryOpts = ... // discoveryOpts describes the trade
const bestBalanceProviderClient = (await discoverer.discover(discoveryOpts))[0];
// make your trade on the daemon with the greatest liquidity
```

### Best price discovery

`bestPriceDiscovery` will make gRPC calls on `marketPrice` endpoints for each providers. Then, it compares all the prices and return the client with the lowest price.

```typescript
import { Discoverer, bestPriceDiscovery } from "tdex-sdk";

const myProvidersClients: TraderClientInterface[] = [...]

const discoverer = new Discoverer(
  myProvidersClients, 
  bestPriceDiscovery,
);

const discoveryOpts = ... // discoveryOpts describes the trade
const bestPriceProviderClient = (await discoverer.discover(discoveryOpts))[0];
// make your trade on the daemon with the lowest price
```

### Combine `Discovery`

The Javascript SDK provides also an utility function using to combine several `Discovery` functions.

```typescript
import { combineDiscovery, bestPriceDiscovery, bestBalanceDiscovery } from "tdex-sdk";

const lowestPriceThenGreatestBalance = combineDiscovery(bestPriceDiscovery, bestBalanceDiscovery);
// this discovery function will firt look at the lowest price for each providers (bestPriceDiscovery)
// then, if there is several providers providing the lowest price, the function will use bestBalanceDiscovery to select the provider.

const discoverer = new Discoverer(
  myProvidersClients, 
  lowestPriceThenGreatestBalance,
);
```
