---
sidebar_position: 1
---

# Overview

The *market makers* are called **liquidity providers** in the TDEX network and they put always-on reserves in various asset pairs forming a specified interface called **Market**. Each *Market* holds reserves of a **base asset** and a **quote asset**. 

A **Trader** proposes new swaps using the provider's market rate. A trader can come and go, he only needs to support the [swap protocol defined in the BOTD #3](https://github.com/tdex-network/tdex-specs/blob/master/03-swap-protocol.md) and he can swap between the two assets in the **Market** in either direction by adding to the liquidity reserve of one and withdrawing from the reserve of the other. Traders can either connect directly to a **provider** if they already know the endpoint.


**Interact with a Liquidity Provider:**

* [Mobile App](app.md)
* [Browser](browser.md)


**Implement your own client using on these TDEX SDKs:**

* [JavaScript](SDK/Javascript/install.md)
* Python (Coming soon)
* Go (Coming soon)
* Rust (Coming soon)
