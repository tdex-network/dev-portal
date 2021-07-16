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

The `Trade` object provides the API using to interact with TDex daemons.

```typescript
import { Trade } from "tdex-sdk";

const trade = new Trade({
  providerUrl: "provider.tdex.network:9945",
  explorerUrl: "https://blockstream.info/liquid/api",
  utxos: [],
  coinSelector: greedyCoinSelector(),
});
```

```js
import { Trade, IdentityType, TradeType, fetchBalances } from "tdex-sdk";

// Connect to specific provider and use Blockstream Esplora to source blockchain data.
// Change the providerUrl with the one you want to trade with.
const trade = new Trade({
  providerUrl: "provider.tdex.network:9945",
  explorerUrl: "https://blockstream.info/liquid/api",
  identity: {
    chain: "liquid", // or regtest
    type: IdentityType.PrivateKey,
    value: {
      signingKeyWIF: "<WIF>",
      blindingKeyWIF: "<WIF>",
    },
  },
});

// Get a new address and his blinnding private key from identity interface
const { confidentialAddress, blindingPrivateKey } =
  trade.identity.getNextAddress();

// Receiving Address and Change address are the same with Identity.PrivateKey
const changeAddrAndBlidning = trade.identity.getNextChangeAddress();

// Get the balances grouped by assetHash
const balances = fetchBalances(
  confidentialAddress,
  blindingPrivateKey,
  "https://blockstream.info/liquid/api"
);

// Asset hash of the market to trade
const LBTC = "6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d";
const USDT = "c5870288a7c9eb5db398a5b5e7221feb9753134439e8ed9f569b0eea5a423330";

//BUY = quote asset as input
// SELL = base asset as input
//
// If the type of the trade is BUY it means the base asset will be received by
// the trader.
//
// If the type of the trade is SELL it means the base asset will be sent by
// the trader.
const preview = await trade.preview({
  market,
  tradeType: TradeType.SELL,
  amount: 5000000,
});

console.log(preview);
/*
{
  "amountToBeSent": 5000000,
  "amountToReceive": 23869047,
  "assetToBeSent": "6f0279e9ed041c3d710a9f57d0c02928416460c4b722ae3457a11eec381c526d",
  "assetToReceive": "c5870288a7c9eb5db398a5b5e7221feb9753134439e8ed9f569b0eea5a423330",
}
*/

// Sell some LBTCs
const txid = await trade.sell({
  market: {
    baseAsset: LBTC,
    quoteAsset: USDT,
  },
  amount: 100000, //satoshis unit
});

// Buy some LBTCs
const txid = await trade.buy({
  market: {
    baseAsset: LBTC,
    quoteAsset: USDT,
  },
  amount: 50000, //satoshis unit
});
```

#### With Mnemonic (HD Wallet)

```js
const explorerUrl = "http://localhost:3001";

// Or Use HD wallet from mnemonic for both signign and blinding
const tradeWithMnemonic = new Trade({
  providerUrl: "localhost:9945",
  explorerUrl: explorerUrl,
  identity: {
    chain: "regtest", // or regtest
    type: IdentityType.Mnemonic,
    value: {
      mnemonic:
        "deny pyramid explain dragon crane oxygen nature flee version cat fatal kingdom tray suspect broccoli ship rival hard add cruel defy library picture unaware",
    },
    initializeFromRestorer: true, // Scan the blockchain and restore previous addresses
    restorer: new EsploraIdentityRestorer(explorerUrl),
  },
});

// Wait for restore to be be completed. Can take a while.
try {
  await tradeWithMnemonic.identity.isRestored();
} catch (e) {
  console.error(e);
}

// Now you can get addresses
tradeWithMnemonic.identity.getNextAddress();
tradeWithMnemonic.identity.getNextChangeAddress();
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

### Wallet

An easy-to-use transaction builder using to create swap transactions.

#### Create a wallet from an Identity with `walletFromAddresses`

```js
// Create the identity
const sender = new PrivateKey({
  chain: "regtest",
  type: IdentityType.PrivateKey,
  value: {
    signingKeyWIF: "cPNMJD4VyFnQjGbGs3kcydRzAbDCXrLAbvH6wTCqs88qg1SkZT3J",
    blindingKeyWIF: "cRdrvnPMLV7CsEak2pGrgG4MY7S3XN1vjtcgfemCrF7KJRPeGgW6",
  },
});

// Use the addresses to create the wallet
const senderWallet = walletFromAddresses(sender.getAddresses(), "regtest");
```

#### Create transaction using the wallet

```js
// createTx returns an empty transaction.
const tx = senderWallet.createTx();

// fetch the utxos for each wallet's address
const arrayOfArrayOfUtxos = await Promise.all(
  // fetchUtxos is an utility function using to retreive utxos of a given address (1st argument) from an Esplora endpoint (2nd argument)
  senderWallet.addresses.map((a) =>
    fetchUtxos(a.confidentialAddress, "https://nigiri.network/liquid/api")
  )
);
// Flat them
const utxos = arrayOfArrayOfUtxos.flat();

// lets enrich them with confidential proofs using the prevout tx hexes
// /!\ we need proofs to unblind the utxo outputs.
// first, fetch the transaction's hex using another Esplora util function: fetchTxHex
const txHexes = await Promise.all(
  utxos.map((utxo) => fetchTxHex(utxo.txid, explorerUrl))
);
// select the outputs from the hex values using liquidjs-lib
const outputs = txHexes.map(
  (hex, index) => Transaction.fromHex(hex).outs[utxos[index].vout]
);
// assign the prevout to each utxo
utxos.forEach((utxo, index) => {
  utxo.prevout = outputs[index];
});

// This will add output that send 50000 LBTC satoshis to the recipient address.
// it will also adds the inputs according to the provided utxos
const unsignedTx = senderWallet.buildTx(
  tx,
  // senderUtxos can be fetched using the explorer endpoint
  senderUtxos,
  // the recipient address
  "el1qqt4rfky0utmv8durktmmg3athy4qfmtqz5xwvsnrty7zhujtxcthdqzncgk7vkfgpvm9varxetmp0mvxkl9tzgxq79n3mdn3v",
  // the amount to send, in satoshis
  50000,
  // the asset hash to send
  "5ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225",
  // the change address to use
  sender.getNextChangeAddress().confidentialAddress
);
```
