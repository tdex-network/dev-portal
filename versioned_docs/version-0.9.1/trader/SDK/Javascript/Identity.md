---
title: 'Identity'
sidebar_position: 2
---

Identities are Javascript objects representing the trader's private key(s). They come from [Liquid Development Kit (LDK)](https://github.com/vulpemventures/ldk) and implement the [IdentityInterface](https://github.com/vulpemventures/ldk/blob/master/src/identity/identity.ts#L32-L52). `tdex-sdk` re-exports LDK classes, types and functions.

### Create a `Mnemonic` Identity instance 

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

### Restore your Identity

`Restorer` are functions using to restore the mnemonic **addresses**. `mnemonicRestorerFromEsplora` is one of the restorer exported by [LDK](https://github.com/vulpemventures/ldk). It requests an Esplora endpoint to inspect the blockchain. It follows the spec described by [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#the-key-tree).

```typescript
const identity = await mnemonicRestorerFromEsplora(new Mnemonic(options))({
  esploraURL: "https://blockstream.info/liquid/api", // blockstream explorer URL
  gapLimit: 20, // default gap limit for BIP44/BIP32 wallet
});

// the identity's addresses already used are re-generated
const notUsedAddress = await identity.getNextAddress();
```

### Fetch and unblind UTXOS

`fetchAndUnblindUtxos` uses an Esplora endpoint to fetch the identity's unspents.

```typescript
const addrs = await identity.getAddresses(); // return all the addresses restored/generated
const utxos = await fetchAndUnblindUtxos(
  addrs, // addrs contains the private blinding keys using to unblind the utxos
  "https://blockstream.info/liquid/api"
);
```

### Send a confidential transaction with Mnemonic

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
  [0, 1], // 1 is change, 0 is the recipient output
  new Map().set(
    0, // here, we only need to specify blinding key for outputs not owned by our identity
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

