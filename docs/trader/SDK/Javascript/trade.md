---
title: 'Trade'
sidebar_position: 3
---

Trade against a Liquidity provider in the TDEX network. This fully implements [**BOTD#4**](https://github.com/tdex-network/tdex-specs/blob/master/04-trade-protocol.md)

The `Trade` object provides the API using to interact with TDex daemons. The constructor takes a configuration object with the following options:

- `providerUrl`: the TDex daemon endpoint, hosted by a Liquidity provider.
- `explorerUrl`: the Esplora endpoint using to get blockchain data.
- `utxos`: the trader's unspents. You can [fetch them](#fetch-and-unblind-utxos) with LDK.
- `coinSelector`: specify the strategy used to select utxos during transaction creation.

```typescript
const trade = new Trade({
  providerUrl: "provider.tdex.network:9945",
  explorerUrl: "https://blockstream.info/liquid/api",
  utxos: traderUtxos, // an array of UtxoInterface
  coinSelector: greedyCoinSelector(), // this is exported by tdex-sdk
});
```

> `utxos` are [JS objects](https://github.com/vulpemventures/ldk/blob/master/src/types.ts#L33) wrapping utxo's data. They can be fetched without LDK. However, they **must** be unblinded in case of [confidential outputs](https://elementsproject.org/features/confidential-transactions).

### TOR proxy for web clients

Natively, web browsers do not support TOR protocol. That's why we are using a [tor-proxy](https://github.com/tdex-network/tor-proxy) to redirect requests to onion endpoints. By default, clients use `https://proxy.tdex.network` as proxy. If you want to use your own, you must specify your proxy endpoint in `Trade` constructor.

Example with a custom proxy hosted at *https://my.custom.tor-proxy.endpoint*.
```typescript
const trade = new Trade(tradeOpts, "https://my.custom.tor-proxy.endpoint");
```
> `tradeOpts.providerUrl` should be an onion endpoint here.

### Market

We'll trade on LBTC<->USDT market. `MarketInterface` describes the market with asset hashes.

```typescript
const market = {
  baseAsset: "6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d", // L-BTC
  quoteAsset:
    "c5870288a7c9eb5db398a5b5e7221feb9753134439e8ed9f569b0eea5a423330", // USDT
};
```

### Sell L-BTC

Then, using the `Trade` instance, we are able to sell 10 000 sats of L-BTC. At this step, you need an [IdentityInterface](#identity) in order to sign the PSET.

```typescript
// sell ALWAYS send baseAsset and receive quoteAsset
// `trade` will select the baseAsset unspents.
const tradeTxID = await trade.sell({
  market, // our MarketInterface object
  amount: 100000, // expressed in satoshis
  asset: market.baseAsset,
  identity: identityInterface,
});
```

### Buy L-BTC

Contrary to `trade.sell`, the `trade.buy` function lets to buy the baseAsset (L-BTC here).

```typescript
// sell ALWAYS send quoteAsset and receive baseAsset
// `trade` will select the quoteAsset unspents.
const tradeTxID = await trade.buy({
  market, // our MarketInterface object
  amount: 100000, // expressed in satoshis
  asset: market.baseAsset,
  identity: identityInterface,
});
```

> The `asset` parameter is using to specify the amount of base or quote asset in a trade. Thus, if u want to sell the **base asset** in order to receive a certain amount of **quote asset**, you can specify it in `sell()` parameter object.
>
> ```typescript
> // sell baseAsset and receive quoteAsset
> const tradeTxID = await trade.sell({
>   market,
>   amount: 50000,
>   asset: market.quoteAsset, // receive 50000 sats of *quoteAsset* but still send *baseAsset*!
>   identity: identityInterface,
> });
> ```

### Preview

The `trade.preview` method can be used to compute market's prices.

```typescript
const {
  assetToBeSent
  amountToBeSent // amount of baseAsset satoshis to sell in order to receive 50000 quoteAsset
  assetToReceive
  amountToReceive
} = await trade.preview({
  market,
  tradeType: TradeType.SELL,
  amount: 50000,
  asset: market.quoteAsset
});
```
