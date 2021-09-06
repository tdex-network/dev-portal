---
slug: tdex-terraform-deploy
title: Deploy a TDEX Daemon to AWS with Terraform
author: Alexander K
author_title: TDEX Contributor
tags: [terraform, automation, tdex, deploy]
---

Configure and run TDex box easily using Terraform automation. 

<!--truncate-->

### Create user and obtain AWS Keys

As a first step it is required to obtain AWS access and secret keys. Best practice is to create new user in AWS IAM. 
Please navigate to Services > IAM page > Add user. 
Proceed with opening AWS IAM users page, and click on Add user. Provide user with name, and below, for the Access type select Programmatic access. ![Add User](../static/img/add-user.png)
Next, make sure that your AWS account(access key) has all required privileges to create EC2 instances and S3 access.
Permissions you need (EC2 full, S3 full, VPC access)
![Attach permissions](../static/img/attach-perms.png)

Once you add Permissions and Tags, click Create user. That will bring you to latest page provided with AWS Access and Secret Keys. 
Copy your keys to safe place and do not share it with anyone.
![Attach permissions](../static/img/user-keys.png)

Check the documentation [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html)

- - - - - 
### Install Terraform

Next step is to install Terraform on your machine.
The easiest way is to follow its documentation [here](https://www.terraform.io/docs/cli/install/apt.html) \
Or follow this installation for APT Packages for Debian and Ubuntu.
```sh
$ curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
$ sudo apt-add-repository "deb [arch=$(dpkg --print-architecture)] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
$ sudo apt install terraform
```
- - - - - 
### Proceed with cloning and deploy
Clone the TDex Box repository and enter its directory. 
```sh
git clone https://github.com/tdex-network/tdex-box.git
cd tdex-box
```
- - - - - 

On the AWS AMI Marketplace, find Ubuntu 20.04 public AMI, accessible in the region you are planing to deploy service and copy it's AMI ID. 


Once you have everything in place, just execute deploy.sh and it will prompt you for all the parameters in order provided above. 
Please enter parameters carefully. 
```sh
$ cd terabox/
$ chmod +x deploy.sh
$ ./deploy.sh
```
![Deploy](../static/img/deploy.png)


Since it is good practice to have backup enabled, please provide S3 bucket name when deploying. 

### Use TDexd CLI to interact with deployed service

TDEX is a CLI (GRPC client), that can be used to interact with TDEX-deamon service deployed to machine. 
Thats why we need to init/config tdex-cli, which is way of authenticating to deamon. 
When configuring service, we need to provide several things:
 - tls_cert_path
 - macaroons_path
 - rpcserver (this will be IP of machine where tdex-box is deployed)

To install Tdex cli you need to clone tdex-deamon repository and build cli. 

```sh
$ git clone https://github.com/tdex-network/tdex-daemon
$ cd tdex-deamon
$ make build-cli
$ mv build/tdex-linux-platform /usr/bin/tdex
$ /usr/bin/tdex config set tls_cert_path /path/to/downloaded/cert.pem
$ /usr/bin/tdex config set macaroons_path /path/to/downloaded/admin.macaroon
$ /usr/bin/tdex config set rpcserver 43.34.43.34 (IP of your deployed machine)

After those are set, you can proceed to interact with tdex-deamon. 
$ /usr/bin/tdex help   <-- for more information and commands
```