---
title: 'BOTD#3: Swap'
---

# Swap protocol

## Overview

The **swap protocol** defines the process by which two parties conclude an atomic swap using an interactive exchange of signed messages and Elements transaction.

Identifying with _Alice_ as the **Proposer** and _Bob_ the **Responder**:

1. Alice connects to Bob through secure transport layer and encrypted connection.
2. Alice proposes a swap crafting an unsigned transaction and a message defined as sending `AMOUNT_P` of `ASSET_P` and receiving `AMOUNT_R` of `ASSET_R`. If confidential, the blinding keys need to be included.
3. Alice sends to Bob the `SwapRequest` message containing the unsigned transaction. An additional input and eventual change output needed to pay _half_ of the network fees is included by Alice in the transaction.
4. Bob, if accepts the terms, funds the swap and partially signs the proposed transaction and includes his blinding keys too.
5. Bob sends back to Alice the `SwapAccept` message containing the partially signed transaction. An additional input and eventual change output needed to pay the remaining _half_ of the network fees is included by Bob in the transaction.
6. Alice parses the accepted swap and signs the transaction.
7. Alice sends to Bob the `SwapComplete` message containing the signed transaction.
8. Ideally Bob finalizes and broadcast the transaction to the Liquid network.

## Swap

### Data Structures

```protobuf
syntax = "proto3";

message SwapRequest {
  // Random unique identifier for the current message
  string id = 1;
  // The proposer's quantity
  uint64 amount_p = 2;
  // The proposer's asset hash
  string asset_p = 3;
  // The responder's quantity
  uint64 amount_r = 4;
  // The responder's asset hash
  string asset_r = 5;
  // The proposer's unsigned transaction in PSETv2 format (base64 string)
  string transaction = 6;
  // The list of proposer's unblinded inputs data, even in case they are
  // unconfidential.
  repeated UnblindedInput unblinded_inputs = 7;
}

message SwapAccept {
  // Random unique identifier for the current message
  string id = 1;
  // Identifier of the SwapRequest message
  string request_id = 2;
  // The complete swap transaction in PSETv2 format (base64 string),
  // signed by the Responder
  string transaction = 3;
  // The original list of trader's unblinded inputs updated with those
  // of the inputs added by the responder, whether they're confidential or not.
  repeated UnblindedInput unblinded_inputs = 4;
}

message SwapComplete {
  // Random unique identifier for the current message
  string id = 1;
  // Identifier of the SwapAccept message
  string accept_id = 2;
  // The swap transaction in PSETv2 or raw hex format signed by the Proposer
  string transaction = 3;
}

message SwapFail {
  // Random unique identifier for the current message
  string id = 1;
  // Identifier of either SwapRequest or SwapAccept message. It can be empty
  string message_id = 2;
  // The failure code. It can be empty
  uint32 failure_code = 3;
  // The failure reason messaged
  string failure_message = 4;
}

message UnblindedInput {
  // Index of the transaction input of reference.
  uint32 index = 1;
  // Unblinded asset.
  string asset = 2;
  // Unblinded amount.
  uint64 amount = 3;
  // Asset blinder for blinded prevout, 32-byte 0x00..00 if unconfidential.
  string asset_blinder = 4;
  // Amount blinder for blinded prevout, 32-byte 0x00..00 if unconfidential.
  string amount_blinder = 5;
}
```

### SwapRequest

The `SwapRequest` message is sent by the **Proposer** to the **Responder** to start the swap negotiation. The transaction is a PSETv2 base64 encoded string containing the Proposer's inputs and outputs (amount_r and eventual change).

### SwapAccept

The `SwapAccept` message is sent by the **Responder** to the **Proposer** to accept the swap request.

### SwapComplete

The `SwapComplete` message is sent by **Proposer** to the **Responder** to announce the successful completion of the swap.

### SwapFail

The `SwapFail` message can be sent by either side of the swap protocol, at any time, to announce the swap termination.
`failure_code` is an optional parameter for specifying the failure reason. TBD
