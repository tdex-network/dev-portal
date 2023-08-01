---
title: 'Configure the daemon'
sidebar_position: 4
---

The daemon can be configured by exporting environment variables before it is started. It offers many options that let you customize it depending on your needs. 

The following table shows all the environment variables available along with their default values:

| Name | Description | Default Value |
|---|---|---|
| `TDEX_DATADIR` | Let's you change the daemon's datadir path. | `~/.tdex-daemon` (Linux).<br/><br/>`~/Library/Application\ Support/Tdex-daemon` (MacOS). |
| `TDEX_LOG_LEVEL` | Let's you change the verbosity of the logs with a numeric value in the range `[0, 6]`. You can see all possible values [here](https://github.com/Sirupsen/logrus#level-logging) listed from value `6` down to `0`. | `4` (INFO) |
| `TDEX_OPERATOR_LISTENING_PORT` | Let's you change the port on which reaching the Operator interface. | `9000` |
| `TDEX_TRADE_LISTENING_PORT` | Let's you change the port on which reaching the Trade interface. If you set both ports to the same value the daemon runs in single port mode. | `9945` |
| `TDEX_WALLET_ADDR` | The address in the form `host:port` where to reach the Ocean wallet service. TLS connection is not supported here intentionally to force the wallet and the daemon to be served in the same machine so that the first is not exposed to the outside world. | |
| `TDEX_DB_TYPE` | Let's you change the db type. At the moment only `badger` (filesystem) is supported, will soon support also `postgres` (sql) as a more consistent storage type meant for production environment. | `badger` |
| `TDEX_NO_MACAROONS` | Let's you disable the macaroon auth over the Operator interface. | `false` |
| `TDEX_NO_OPERATOR_TLS` | Let's you disable the self-signed TLS encryption over the Operator interface. | `false` |
| `TDEX_OPERATOR_EXTRA_IP` | Let's you add one or more IP addresses to be included in the self-signed TLS certificate so that you can access the Operator interface from the outside by using them - can be repeated for multiple addresses. | |
| `TDEX_OPERATOR_EXTRA_DOMAIN` | Let's you add one or more domains to be included in the self-signed TLS certificate so that you can access the Operator interface from the outside by using them - can be repeated for multiple domains. | |
| `TDEX_TRADE_TLS_KEY` | Let's you enable self-signed TLS encryption over the Trade interface by specifying the path to your private key. | |
| `TDEX_TRADE_TLS_CERT` | Let's you enable self-signed TLS encryption over the Trade interface by specifying the path to your certificate. Must be used in combo with the env var right above. | |
| `TDEX_CONNECT_ADDR` | Let's you change the address (in the form `host:port`) used to compose the daemon's connect URL. Useful if you make use of a reverse proxy to make your Operator interface publicly reachable. | `localhost:9000` |
| `TDEX_CONNECT_PROTO` | Let's you change the proto used to compose the daemon's connect URL. If the operator TLS encryption is disabled it can assume either `http` or `https`, otherwise it must be set to `https`. | `https` |
| `TDEX_ENABLE_PROFILER` | Let's you enable the Prometheus profiler. | `false` |
| `TDEX_STATS_INTERVAL` | Let's you customize the interval to periodically keep note of the stats of the daemon. Ignored if profiler is disabled. | `600` (10 minutes) |
| `TDEX_WALLET_UNLOCK_PASSWORD_FILE` | Let's you define the path of the file containing the unlocking password to activate the auto-unlocking feature whenever the daemon is restarted. | |
| `TDEX_TX_SATS_PER_BYTE` | Let's you change the sats/byte ratio used by the daemon when crafting its transactions for paying network fees. Can assume values in the range `[0.1, 10000]`. | `0.11` |
| `TDEX_FEE_ACCOUNT_BALANCE_THRESHOLD` | Let's you change the threshold amount below which the provider starts notifying about fee account low balance through webhooks (if set). | `5000` |
| `TDEX_PRICE_SLIPPAGE` | Let's you adjust the tolerance of your provider for accepting trades with a price (slightly) different from the market's one. The bigger is the value, the higher is the tollerance. | `0.05` (i.e. a tollerance of the 0.05% of a market) |
