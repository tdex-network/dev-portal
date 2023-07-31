---
title: 'Configure the daemon'
sidebar_position: 4
---

The daemon can be configured by exporting environment variables before it is started. It offers many options that let you customize it depending on your needs. 

Here below you can find the list of all environment variables available along with their default values:

* **TDEX_DATADIR** let's you to change the daemon's datadir path, which defaults to `~/.tdex-daemon` for Linux and `~/Library/Application\ Support/Tdex-daemon` for MacOS.
* **TDEX_LOG_LEVEL** let's you change the verbosity of the logs with a numeric value in the range `[0, 6]`. Defaults to level `Info` which is represented by the number `4`. You can see all possible values [here](https://github.com/Sirupsen/logrus#level-logging) listed from value `6` down to `0`.
* **TDEX_OPERATOR_LISTENING_PORT** let's you change the port on which reaching the Operator interface. Defaults to `9000`.
* **TDEX_TRADE_LISTENING_PORT** let's you change the port on which reaching the Trade interface. Defaults to `9945`. If you set both ports to the same value the daemon runs in single port mode.
* **TDEX_WALLET_ADDR** the address in the form `host:port` where to reach the Ocean wallet service. TLS connection is not supported here intentionally to force the wallet and the daemon to be served in the same machine so that the first is not exposed to the outside world.
* **TDEX_DB_TYPE** let's you change the db type. Defaults to `badger`, ie filesystem - the db lives in the daemon's datadir. Will soon support also `postgres` as a more consistent storage solution for production usage.
* **TDEX_NO_MACAROONS** let's you disable the macaroon auth over the Operator interafce. Defaults to `false`.
* **TDEX_NO_OPERATOR_TLS** let's you disable the self-signed TLS encryption over the Operator interface. Defaults to `false`.
* **TDEX_OPERATOR_EXTRA_IP** let's you add one or more IP addresses to be included in the self-signed TLS certificate so that you can access the Operator interface from the outside by using them - can be repeated for multiple addresses. No default.
* **TDEX_OPERATOR_EXTRA_DOMAIN** let's you add one or more domains to be included in the self-signed TLS certificate so that you can access the Operator interface from the outside by using them - can be repeated for multiple domains. No default.
* **TDEX_TRADE_TLS_KEY** let's you enable self-signed TLS encryption over the Trade interface by specifying the path to your private key. No default.
* **TDEX_TRADE_TLS_CERT** let's you enable self-signed TLS encryption over the Trade interface by specifying the path to your certificate. Must be used in combo with the env var right above. No default.
* **TDEX_CONNECT_ADDR** let's you change the address (in the form `host:port`) used to compose the daemon's connect URL. Useful if you make use of a reverse proxy to make your Operator interface publicly reachable. Defaults to `localhost:9000`.
* **TDEX_CONNECT_PROTO** let's you change the proto used to compose the daemon's connect URL. If the operator TLS encryption is disabled it can assume either `http` or `https`, otherwise it must be set to `https`, which is also the default value.
* **TDEX_ENABLE_PROFILER** let's you enable the Prometheus profiler. Defaults to `false`.
* **TDEX_STATS_INTERVAL** let's you customize the interval to periodically keep note of the stats of the daemon. Ignored if profiler is disabled. Defaults to `600`, ie. 10 minutes.
* **TDEX_WALLET_UNLOCK_PASSWORD_FILE** let's you define the path of the file containing the unlocking password to activate the auto-unlocking feature whenever the daemon is restarted. No default.
* **TDEX_TX_SATS_PER_BYTE** let's you change the sats/byte ratio used by the daemon when crafting its transactions for paying network fees. Can assume values in the range `[0.1, 10000]`. Defaults to `0.11`.
* **TDEX_FEE_ACCOUNT_BALANCE_THRESHOLD** let's you change the threshold amount below which the provider starts notifying about fee account low balance through webhooks (if set). Defaults to `5000` sats of LBTC.
* **TDEX_PRICE_SLIPPAGE** let's you adjust the tollerance of your provider for accepting trades with a price (slightly) different from the market's one. The bigger is the value, the higher is the tollerance. Defaults to `0.05`, ie. a tollerance of the 0.05% of a market price.