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
As a first step it is required to obtain aws access and secret keys. Best practice is to create new user in AWS IAM. 
Please navigate to Services > IAM page. 
Proceed with opening AWS IAM users page, and click on Add user. Provide user with name, and below, for the Access type select Programmatic access. ![Add User](../static/img/add-user.png)
Next, make sure that your AWS account(access key) has all required privileges to create EC2 instances and S3 access.
Permissions you need (EC2 full, S3, VPC access)
![Attach permissions](../static/img/attach-perms.png)

Once you add Permissions and Tags, click Create user. That will bring you to latest page provided with AWS Access and Secret Keys. 
Copy your keys to safe place and do not share it with anyone.
![Attach permissions](../static/img/user-keys.png)

Check the documentation [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html)

- - - - - 
### Install Terraform
Next step is to install Terraform on your machine.
The easiest way is to follow its documentation [here](https://www.terraform.io/docs/cli/install/apt.html) \
Or follow this installation for APT Packages for Debian and Ubuntu
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

