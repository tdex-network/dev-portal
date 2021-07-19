---
title: 'Unlocker'
sidebar_position: 4
---

The unlocker is a service coming as a binary that lets you automatically unlock your running daemon once it is initialized.

This service sources the unlocking password from one of the providers listed below:

- [File](#unlock-with-file)
- AWS KMS (Coming soon)
- Hashicorp Vault (Coming soon)
- Kubernetes (Coming soon)

Along with the password, these providers also provide a way to possibly source a TLS certificate in case the communication with the daemon needs to be encrypted.

It is possible to select the preferred provider with the flag `--provider`.
You can see the full list of supported flags anytime with `unlockerd --help`.

## Unlock with file

The file provider is the default one used by the unlocker. 

It requires you to specify a path of the file containing the password in plaintext to use for unlocking the daemon with the flag `--password_flag`.

By default, this provider also assumes that the daemon's datadir has not been customized, therefore it looks within its default datadir path to possibly load the TLS certificate created by the daemon needed by the unlocker to establish a secure connection.  
Anyways, it's possible to specify the path of the TLS certificate with the flag `--tls_cert_path` if you have it somewhere else.  
In case the daemon is running in *no macaroons* mode, this provider shouldn't find any certificate in the daemon's datadir, signaling the unlocker that no TLS termination is required. 

Example:

```bash
# start unlockerd with given password file and default TLS cert path
unlockerd --password_path pwd.txt

# start unlockerd with given password and TLS certificate
unlockerd --password_path pwd.txt --tls_cert_path ~/path/to/cert.pem
```