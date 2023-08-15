---
title: 'Configure the CLI'
sidebar_position: 5
---

Now that your daemon is up and running, you have to configure the `tdex` CLI to communicate with the Operator interface.

The CLI makes use of a configuration file stored in a specific datadir, which defaults to `~/.tdex-operator` in Linux and `~/Library/Application\ Support/Tdex-operator` on MacOS.

You can change the datadir path by exporting the env var `export TDEX_OPERATOR_DATADIR=path/to/datadir`.

:::tip
Add this env var to your bash profile otherwise you'll need to always export this env var when running `tdex` commands.
:::

## Configure the CLI

You can configure the CLI in many ways, and here we'll walk through all of them.

### Initialize the CLI

This command let's you initialize the CLI by setting specific properties with the mean of flags. You should use it whenever you want to initialize or reset your CLI by tweaking only specific entries, while the others are set to their default values. 

For example, this is how you configure the CLI with the daemon you just started:

```bash
$ tdex config init --no-tls
```

Run `tdex config init --help` to see all available flags.

### Initialize the CLI with tdexconnect url

Another way to initialize the CLI is by providing the connect URL of your provider. This operation can be done only after you have initialized your proivder with a mnemonic and a password.

To retrieve the URL, open your browser and go to `http://localhost:9000`. The page will ask you for user and password, type `tdex` - as user - and your provider's password to finally see the connect URL.
<br/><br/>
<img src="/static/img/connect-url.png" width="800" />
<br/><br/>
Copy the connect URL to the clipboard, then back to your terminal you initialize the CLI by running:

```bash
# This is an example, take care of changing the url with your own.
$ tdex config connect "tdexdconnect://localhost:9000?macaroon=AgEFdGRleGQCogEDChAIgnN3T6ijmBIFqHbYWJn3EgEwGhUKBmZlZWRlchIEcmVhZBIFd3JpdGUaFQoGbWFya2V0EgRyZWFkEgV3cml0ZRoXCghvcGVyYXRvchIEcmVhZBIFd3JpdGUaFAoFcHJpY2USBHJlYWQSBXdyaXRlGhUKBndhbGxldBIEcmVhZBIFd3JpdGUaFgoHd2ViaG9vaxIEcmVhZBIFd3JpdGUAAAYgw-ECmMMgn4W-Do2sGgpxdcfeexOV0Sis4Nx0VrjRLXA&proto=http"
```

### Show the CLI configuration

You can always check the configuration of your cli with:

```bash
$ tdex config
```

The output of this command should look similar to the one below:

```
no_macaroons: false
no_tls: true
rpcserver: localhost:9000
tls_cert_path:
macaroons_path: /home/tdex/.tdex-daemon/macaroons/admin.macaroon
```

By reading this configuration, you can see that the CLI is connected to the daemon at `localhost:9000` without TLS encryption (insecure connection), authenticated with macaroons - by default the CLI sources the `admin.macaroon` from the daemon's default datadir.

### Set granular CLI configuration properties

The CLI allows you to set a single property of its configuration file without affacting the others, unlike `config init` that instead brings all props to their default if not expictly set by flags.

Let's say for example that you want to change the path where to find the `admin.macaroon`, you can do it by running:

```bash
$ tdex config set macaroons_path path/to/admin.macaroon
```

You can _set_ any property of the configuration file like done in the example above.

That's all! Now that you have configured your CLI, you're ready to [initialize your provider](../init_daemon.md).
