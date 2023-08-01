---
title: 'Run with Docker'
sidebar_position: 2
---

The easiest way to serve your daemon as a dockerized application is by using `docker compose` so you can well orchestrate your wallet and daemon instances. You can find a similar version of the following `docker-compose.yml` file in the [github repository](https://github.com/tdex-network/tdex-daemon/tree/v1/resources/compose/docker-compose.yml):

```yml
version: "3.7"

services:
  oceand:
    container_name: oceand
    image: ghcr.io/vulpemventures/oceand:latest
    restart: unless-stopped
    depends_on:
      - oceand-db
    environment:
      - OCEAN_LOG_LEVEL=5
      - OCEAN_NO_TLS=true
      - OCEAN_NO_PROFILER=true
      - OCEAN_ELECTRUM_URL=ssl://blockstream.info:465
      - OCEAN_NETWORK=testnet
      - OCEAN_UTXO_EXPIRY_DURATION_IN_SECONDS=240
      - OCEAN_DB_HOST=oceand-db
    ports:
      - "18000:18000"
    volumes:
      - volumes/oceand:/home/ocean/.ocean-wallet
      - volumes/ocean-cli:/home/ocean/.ocean-cli
  tdexd:
    container_name: tdexd
    image: ghcr.io/tdex-network/tdexd:latest
    restart: unless-stopped
    depends_on:
      - oceand
    environment:
      - TDEX_WALLET_ADDR=oceand:18000
      - TDEX_LOG_LEVEL=5
      - TDEX_NO_OPERATOR_TLS=true
      - TDEX_CONNECT_PROTO=http
    ports:
      - "9000:9000"
      - "9945:9945"
    volumes:
      - volumes/tdexd:/home/tdex/.tdex-daemon
      - volumes/tdex-cli:/home/tdex/.tdex-operator
  oceand-db:
    container_name: oceand-db
    image: postgres
    restart: unless-stopped
    environment:
      - POSTGRES_USER=root
      - POSTGRES_PASSWORD=secret
      - POSTGRES_DB=oceand-db
    ports:
      - "5432:5432"
```

This compose file lets you serve your daemon on the testnet network but it can be used as good starting point for your mainnet provider as well.

3 docker services are defined here:
* `oceand`, the Ocean wallet service, required by the daemon to craft its transactions (deposits, withdrawals, trades)
* `tdexd`, the tdex daemon that lets you setup and open markets, deposit or withdraw funds and many other operations.
* `oceand-db` a postgres db for the ocean wallet, as a more consistent data storage rather than relying on the filesystem. If you want to use the latter instead, you can drop the `OCEAN_DB_HOST` env var and add a new one `OCEAN_DB_TYPE=badger`.

Place this file in your preferred folder and name it `docker-compose.yml`, take care of editing the volumes folders mounted for `oceand` and `tdexd` if you need. With the configuration above, instead, you should take care of creating the folders `volumes/oceand`, `volumes/ocean-cli`, `volumes/tdexd` and `volumes/tdex-cli` in the same directory where you placed the compose file. This should be the structure of your main directory:

```
|__ docker-compose.yml
|__ volumes/
   |__ oceand/
   |__ ocean-cli/
   |__ tdexd/
   |__ tdex-cli /
```

You're now ready to start up the services. First of all, let's start the ocean services:

```bash
$ docker-compose up -d oceand-db oceand
```

You can inspect the status of the service by running `docker ps` - don't be afraid if oceand gives errors at this stage, it can happen depending on how fast the db startup phase is. Once both services are up and running you can start up your provider service:

```bash
$ docker-compose up -d tdexd
```

That's it! You just started your provider served as docker container. What's next? You can get some insights about [the daemon's configuration](configure_daemon.md), or you can take a look at how to [configure the CLI](configure_cli.md) to setup your markets, deposit and withdraw funds and even more cool stuff.

If you are asking where this CLI is, it comes with your daemon service and you can use it by just creating the following alias:

```bash
alias tdex="docker exec tdexd tdex"
```

:::tip
If you have problems while starting up the wallet or the daemon and you see some _Permission denied_ error from their logs it's very likely that your Unix user doesn't have the common uid `1000` - used by default by the docker images.

You can find the uid of your user by listing all of them with `cat /etc/passwd`, and then add a line `user: "<uid>:<uid>"` to every service defined in the compose.

Alternatively, you can directly override the id of your container by running `docker run --user <uid>:<uid> -d ... oceand` and `docker run --user <uid>:<uid> -d ... tdexd`
:::