---
slug: liquid-pegin-browser
title: Liquid Bitcoin peg-in(s) in the browser!
author: Marco Argentieri
draft: true
author_title: TDEX Contributor
author_image_url: https://avatars.githubusercontent.com/u/3596602
tags: [pegin, liquid, tdex, bitcoin]
---

Any wallet developer can integrate trustless Liquid Bitcoin peg-in features in their own application, even in the browser!

<!--truncate-->

```sh
npm install --save pegin
# or with yarn
yarn add pegin
```


Then in your JavaScript or TypeScript project

```ts

import ElementsPegin from 'pegin';

// initialize the module
const peginModule = new ElementsPegin(
  await ElementsPegin.withGoElements(),
  await ElementsPegin.withLibwally(),
);

// get a pegin address to deposit Bitcoin
const peginAddress = await peginModule.getMainchainAddress(
  claimScript // Liquid scriptpubkey
);


// deposit funds to the Bitcoin address
console.log(peginAddress); 

// retrieve the raw bitcoin transaction hex encoded and the merkle block proof, pass them along the Liquid script used to generate the pegin address
let claimTx = await peginModule.claimTx(
    btcTxHex,
    btcTxOutProof,
    claimScript
);

// Now you can broadcast the transaction to the Liquid Network
```

### What's a peg-in?

[Liquid Network](https://liquid.net) allows anyone to "convert" BTC into L-BTC, the sidechain native asset, with a process called **peg-in**: it consists in sending Bitcoin to the Liquid federation multisignature script tweaked with the user's Liquid script. 

After 102 Bitcoin mainchain blocks, the user can **claim** his Liquid bitcoins creating a special Liquid transaction and broadcast it to the Liquid Network.


### How a user can peg-in?

At the moment the process is quite cumbersome and requires the user to use an Elements node via command line interface. This basically forced the majority of users to use centralized exchanges, involving a custodial process and counterparty risks.

### Trustless peg-in in the browser

TDEX allows anyone to trade Liquid assets freely without being custodian of funds and the major road block to increase TDEX and Liquid Network usage is to let people to get Liquid Bitcoin with their mainchain Bitcoin.

Browsers and mobile apps built with web technologies such as React Native or Cordova can now use the npm [pegin](https://www.npmjs.com/package/pegin) module and integrate this in few lines of code.

### Try now!

Try the pegin feature, now live in the TDEX mobile app!

* Download iOS from [App Store](https://apps.apple.com/app/truedex-trading-unleashed/id1545948177)
* Download Android from [Play Store](https://play.google.com/store/apps/details?id=io.sevenlabs.app) or install the [APK from Github Releases](https://github.com/TDex-network/tdex-app/releases)


