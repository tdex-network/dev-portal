---
title: 'Swap'
sidebar_position: 4
---

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
// in case of confidential inputs/outputs, you also need to provide the blinding keys.
const swapRequestMessage = await swap.request({
  assetToBeSent: USDT,
  amountToBeSent: 300,
  assetToReceive: LBTC,
  amountToReceive: 0.05,
  psetBase64: "...",
  inputBlindingKeys: {},
  outputBlindingKeys: {},
});

//Bob parses the request and inspect the terms
let json = Swap.parse({
  message: swapRequestMessage,
  type: "SwapRequest",
});

// Bob provides the transaction with his signed inputs and outputs
// he also needs to add its blinding keys
const swapAcceptMessage = await swap.accept({
  message: swapRequestMessage,
  psetBase64: "...",
  inputBlindingKeys: {},
  outputBlindingKeys: {},
});

//Alice can parse again the message and inspect the terms (optional)
json = Swap.parse({
  message: swapAcceptMessage,
  type: "SwapAccept",
});

// Alice adds his signed inputs to the transaction
const swapCompleteMessage = await swap.complete({
  message: swapAcceptMessage,
  psetBase64: "...",
});

// Alice can sends the completed swap to Bob
// Now Bob finalize the transaction and broadcast it
```

