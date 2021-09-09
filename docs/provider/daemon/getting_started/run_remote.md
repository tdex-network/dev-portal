---
title: 'Run on remote host'
sidebar_position: 4
---

Whether you're serving your daemon as a standalone binary or as a dockerized solution, if you want to do that on a remote machine you have to go through some further steps to interact with it, especially if you want to make its Operator interface reachable from the outside world.

Here below, you can find the necessary info and examples to:

- [Enable macaroons/TLS for Operator interface on remote host](#enable-macaroonstls-for-operator-interface-on-remote-host)
- [Enable TLS for Trade interface on remote host](#enable-tls-for-trade-interface-on-remote-host)
- [Enable secure connection on both interfaces](#enable-secure-connection-on-both-interfaces)
- [Configure a local Operator CLI to connect with remote daemon](#configure-a-local-operator-cli-to-connect-with-remote-daemon)

## Enable macaroons/TLS for Operator interface on remote host

If you want to run a daemon on a remote machine and make its Operator interface reachable from the outside world it's strongly suggested to enable macaroons auth and TLS encryption to secure the connection with external clients. 

You must have a static IP or a DNS name at which to reach your machine and configure it to allow in-going and out-going traffic over the Operator and Trade ports (the defaults are `9000` and `9945` respctively).

Before starting the daemon, export the environment variables `TDEX_OPERATOR_EXTRA_IP` and/or `TDEX_OPERATOR_EXTRA_DOMAIN` like for example:

- Standalone:
    ```sh
    $ export TDEX_OPERATOR_EXTRA_IP=54.170.20.39
    $ export TDEX_OPERATOR_EXTRA_DOMAIN=provider.mydomain.com

    # Start a daemon with macaroons/TLS enabled ONLY on Operator interface
    tdexd
    ```

- Docker:
  ```sh
  # Start a dockerized daemon with macaroons/TLS enabled ONLY on Operator interface
  $ docker run -it -d \
    --name tdexd \
    --restart unless-stopped \
    -p 9945:9945 -p 9000:9000 \
    -v `pwd`/tdexd:/.tdex-daemon \
    -e TDEX_OPERATOR_EXTRA_IP=54.170.20.39 \
    -e TDEX_OPERATOR_EXTRA_DOMAIN=provider.mydomain.com \
    ghcr.io/tdex-network/tdexd:latest
  ```

This will make the daemon create the TLS certificate by including the given IP/DNS name to the list of identities, making it usable for external clients.

## Enable TLS for Trade interface on remote host

It is possible to enable TLS encryption and requiring to establish a secure connection with the public Trade interface of the daemon.

For this, you must obtain a valid TLS certificate from a trusted Certificate Authotity (for example [Let's Encrypt](https://letsencrypt.org/), [ZeroSSL](https://zerossl.com/), etc.) and export the `TDEX_SSL_KEY` and `TDEX_SSL_CERT` environment variables with the paths of your TLS key and cert files:

- Standalone:
    ```sh
    # In this example the TLS key/cert were previously generated with the help of
    # Let's Encrypt and placed in a dedicated directory into the daemon datadir
    $ export TDEX_SSL_KEY=~/.tdex-daemon/trade-tls/privatekey.pem
    $ export TDEX_SSL_CERT=~/.tdex-daemon/trade-tls/fullchain.pem

    # Start a daemon with TLS enabled ONLY on Trade interface
    $ tdexd
    ```
- Docker:
    ```sh
    # Start a dockerized daemon with TLS enabled ONLY on Trade interface
    $ docker run -it -d \
    --name tdexd \
    --restart unless-stopped \
    -p 9945:9945 -p 9000:9000 \
    -v `pwd`/tdexd:/.tdex-daemon \
    # Here, it's required to mount the filepaths of the TLS key/cert as volumes
    # of the container
    -v `pwd`/privatekey.pem:/privatekey.pem \
    -v `pwd`/fullchain.pem:/fullchain.pem \
    -e TDEX_SSL_KEY=/privatekey.pem \
    -e TDEX_SSL_CERT=/fullchain.pem \
    ghcr.io/tdex-network/tdexd:latest
    ```

## Enable secure connection on both interfaces

- Standalone:
    ```sh
    $ export TDEX_OPERATOR_EXTRA_IP=54.170.20.39
    $ export TDEX_OPERATOR_EXTRA_DOMAIN=provider.mydomain.com
    $ export TDEX_SSL_KEY=~/.tdex-daemon/trade-tls/privatekey.pem
    $ export TDEX_SSL_CERT=~/.tdex-daemon/trade-tls/fullchain.pem

    # Start a daemon with macaroons/TLS over Operator interface AND TLS enabled 
    # over Trade interface
    $ tdexd
    ```
- Docker:
    ```sh
    # Start a dockerized daemon with macaroons/TLS enabled over Operator
    # interface AND TLS enabled over Trade interface
    $ docker run -it -d \
    --name tdexd \
    --restart unless-stopped \
    -p 9945:9945 -p 9000:9000 \
    -v `pwd`/tdexd:/.tdex-daemon \
    -v `pwd`/privatekey.pem:/privatekey.pem \
    -v `pwd`/fullchain.pem:/fullchain.pem \
    -e TDEX_OPERATOR_EXTRA_IP=54.170.20.39 \
    -e TDEX_OPERATOR_EXTRA_DOMAIN=provider.mydomain.com \
    -e TDEX_SSL_KEY=/privatekey.pem \
    -e TDEX_SSL_CERT=/fullchain.pem \
    ghcr.io/tdex-network/tdexd:latest
    ```

## Configure a local Operator CLI to connect with remote daemon

Now that your daemon is up and running on your remote machine, if you made your Operator interface reachable, you can safely interact with it with the CLI on your laptop or home pc.

To do this, you need to import in your local machine a copy of both the macaroon named `admin.macaroon` and the TLS certificate named `cert.pem` that you can find in the daemon's datadir. If, for example you have SSH access to the remote host you can take advantage of the `scp` command:

```sh
$ scp ubuntu@54.170.20.39:~/.tdex-daemon/macaroons/admin.macaroon ~/.tdex-daemon-remote/admin.macaroon
$ scp ubuntu@54.170.20.39:~/.tdex-daemon/tls/cert.pem ~/.tdex-daemon-remote/cert.pem
```

Now it's time to configure the local Operator CLI to connect to the remote daemon:

```sh
$ tdex config init --macaroons_path ./admin.macaroon --tls_cert_path ./cert.pem --rpc_address provider.mydomain.com:9000

# Now it's possible to start initializing the daemon if it's a brand new one..
$ tdex genseed
$ tdex init --password "***" --seed "***"
```

That's it! You're now ready to [deposit funds](../deposit_funds.md) and open some markets.