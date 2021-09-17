---
title: 'Run with Docker'
sidebar_position: 2
---

Running a daemon as a dockerized container solution is easy as pulling the official image from the oraganization's Github Container registry:

```bash
$ docker pull ghcr.io/tdex-network/tdexd:latest
```

and starting a container with this image:

```bash
# Run on Liquid network connecting to blockstream.info for sourcing blockchain data
$ docker run -it -d --name tdexd --restart unless-stopped -p 9945:9945 -p 9000:9000 -v `pwd`/tdexd:/.tdex-daemon ghcr.io/tdex-network/tdexd:latest

# Run on Liquid connecting to a local explorer
$ docker run -it -d --name tdexd --restart unless-stopped -p 9945:9945 -p 9000:9000 -v `pwd`/tdexd:/.tdex-daemon -e TDEX_EXPLORER_ENDPOINT="http://127.0.0.1:3001" ghcr.io/tdex-network/tdexd:latest

# Run on Regtest connecting to a local explorer and using regtest LBTC asset hash.
$ docker run -it -d --name tdexd --restart unless-stopped -p 9945:9945 -p 9000:9000 -v `pwd`/tdexd:/.tdex-daemon -e TDEX_NETWORK="regtest" -e TDEX_BASE_ASSET="5ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225" -e TDEX_EXPLORER_ENDPOINT="http://127.0.0.1:3001"  ghcr.io/tdex-network/tdexd:latest

# Run on Liquid and specify USDt as base asset instead of default L-BTC
$ docker run -it -d --name tdexd --restart unless-stopped -p 9945:9945 -p 9000:9000 -v `pwd`/tdexd:/.tdex-daemon -e TDEX_BASE_ASSET="ce091c998b83c78bb71a632313ba3760f1763d9cfcffae02258ffa9865a37bd2" ghcr.io/tdex-network/tdexd:latest
```

With the above commands, you'll find a new `tdexd` folder in your current path, created by dockerized daemon.

Check the logs:

```bash
$ docker logs tdex
INFO[0000] trader interface is listening on :9945
INFO[0000] operator interface is listening on :9945
```

Note that the official image comes also with the CLI, so you can create an alias to use it like it was present in your path like:

```bash
$ alias tdex='docker exec tdexd tdex'
```

Next step is to [configure the operator CLI](configure_cli.md).