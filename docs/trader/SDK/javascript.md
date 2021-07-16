# JavaScript

JavaScript SDK for building trader-facing applications on top of TDEX

## ⬇️ Install

- Install with **yarn**

```sh
$ yarn add tdex-sdk
```

- Install with **npm**

```sh
$ npm install --save tdex-sdk
```

## 📄 Usage

### Identity

Identities are Javascript objects representing the trader's private key(s). They come from [Liquid Development Kit (LDK)](https://github.com/vulpemventures/ldk) and implement the [IdentityInterface](https://github.com/vulpemventures/ldk/blob/master/src/identity/identity.ts#L32-L52). `tdex-sdk` re-exports LDK classes, types and functions.

#### Instanciate a `Mnemonic` Identity

```js
import { IdentityOpts, MnemonicOpts, IdentityType, Mnemonic } from "tdex-sdk";

const options: IdentityOpts<MnemonicOpts> = {
  chain: "regtest",
  type: IdentityType.Mnemonic,
  opts: {
    mnemonic: "<MNEMONIC WORDS>",
  },
};

const identity = new Mnemonic(options);
```

#### Restore your Identity

`Restorer` are functions using to restore the mnemonic **addresses**. `mnemonicRestorerFromEsplora` is one of the restorer exported by [LDK](https://github.com/vulpemventures/ldk). It requests an Esplora endpoint to inspect the blockchain. It follows the spec described by [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#the-key-tree).

```typescript
const identity = await mnemonicRestorerFromEsplora(new Mnemonic(options))({
  esploraURL: "https://blockstream.info/liquid/api", // blockstream explorer URL
  gapLimit: 20, // default gap limit for BIP44/BIP32 wallet
});

// the identity's addresses already used are re-generated
const notUsedAddress = await identity.getNextAddress();
```

#### Fetch and unblind UTXOS

`fetchAndUnblindUtxos` uses an Esplora endpoint to fetch the identity's unspents.

```typescript
const addrs = await identity.getAddresses(); // return all the addresses restored/generated
const utxos = await fetchAndUnblindUtxos(
  addrs, // addrs contains the private blinding keys using to unblind the utxos
  "https://blockstream.info/liquid/api"
);
```

#### Send a confidential transaction with Mnemonic

```js
import {
  walletFromAddresses,
  Mnemonic,
  IdentityType,
  greedyCoinSelector,
  address,
  mnemonicRestorerFromEsplora,
  decodePset,
} from "tdex-sdk";

// we'll send 850 sats of LBTC (5ac9f65...)
const recipientInfos = {
  value: 850,
  asset: "5ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225",
  address:
    "Azpk3oLvSDtYScUcWTc2VDyqj78HmNqPuoYDEGMZtPNLEJmNz33cy36S1cJXAAoikLVf2Zv4muNM2FCQ",
};

const network = "regtest"; // "liquid" for mainchain
const esploraURL = "http://localhost:3001"; // LDK uses Esplora endpoints to fetch blockchain data
// you can use Nigiri to run a local regtest node: https://nigiri.vulpem.com/

// Create the Identity
const identity = new Mnemonic({
  chain: network,
  type: IdentityType.Mnemonic,
  opts: {
    mnemonic: "<MNEMONIC WORDS>",
  },
});

// Let's use Esplora to re-generate already used addresses (LDK restorer)
const restoredIdentity = await mnemonicRestorerFromEsplora(identity)({
  esploraURL,
  gapLimit: 20,
});

// Get addresses from identity
const addresses = await restoredIdentity.getAddresses();

// create a WalletInterface object from addresses, we'll use it to build the PSET
// `walletFromAddresses` will fetch and unblind unspents.
const wallet = await walletFromAddresses(addresses, esploraURL, network);

const changeAddress = await identity.getNextChangeAddress();

// buildTx lets to create PSET ready to be signed by Identity
let tx = wallet.buildTx(
  wallet.createTx(), // -> create an empty PSET
  [recipientInfos], // the outputs to create
  greedyCoinSelector(), // how the build must select the unspents to fund the transaction
  (asset) => changeAddress.confidentialAddress, // specify to builder the change address to use
  true // will add the fee output, default to false
);

// we can blind our transaction using identity
tx = await identity.blindPset(
  tx,
  [0, 1],
  new Map().set(
    0,
    address.fromConfidential(recipientInfos.address).blindingKey.toString("hex")
  )
);

// Now we can sign with identity abstraction
const signedTx = await identity.signPset(tx);

// finalize the tx and encode to hex
const finalizedTx = decodePset(signedTx)
  .finalizeAllInputs()
  .extractTransaction()
  .toHex();

// finalizedTx can be broadcasted
console.log(finalizedTx);
```

### Trade

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

#### Market

We'll trade on LBTC<->USDT market. `MarketInterface` describes the market with asset hashes.

```typescript
const market = {
  baseAsset: "6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d", // L-BTC
  quoteAsset:
    "c5870288a7c9eb5db398a5b5e7221feb9753134439e8ed9f569b0eea5a423330", // USDT
};
```

#### Sell L-BTC

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

#### Buy L-BTC

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

#### Preview

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

### Swap

Create manually Swap messages without connecting to a provider. This fully implements [**BOTD#3**](https://github.com/tdex-network/tdex-specs/blob/master/03-swap-protocol.md)

```js
import { Swap } from "tdex-sdk";

const swap = new Swap({ chain: "regtest" });

const LBTC = "5ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225";
const USDT = "c5870288a7c9eb5db398a5b5e7221feb9753134439e8ed9f569b0eea5a423330";

// Alice starts a swap proposal
//
// You need to create and provide an unsigned transaction that has
// enough inputs to cover amountToBeSent and the desired output
const swapRequestMessage = swap.request({
  assetToBeSent: USDT,
  amountToBeSent: 300,
  assetToReceive: LBTC,
  amountToReceive: 0.05,
  psetBase64: "...",
});

//Bob parses the request and inspect the terms
let json = Swap.parse({
  message: swapRequestMessage,
  type: "SwapRequest",
});

// Bob provides the transaction with his signed inputs and outputs
const swapAcceptMessage = swap.accept({
  message: swapRequestMessage,
  psetBase64: "...",
});

//Alice can parse again the message and inspect the terms (optional)
json = Swap.parse({
  message: swapAcceptMessage,
  type: "SwapAccept",
});

// Alice adds his signed inputs to the transaction
const swapCompleteMessage = swap.complete({
  message: swapAcceptMessage,
  psetBase64: "...",
});

// Alice can sends the completed swap to Bob
// Now Bob finalize the transaction and broadcast it
```
