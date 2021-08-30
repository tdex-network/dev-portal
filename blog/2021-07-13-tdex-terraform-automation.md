---
slug: tdex-terraform-automation
title: Automate TDex deamon with terraform
author: Alexander K
author_title: Maintainer of TDEX Network
tags: [terraform, automation, tdex]
---

Configure and run TDex box easily using Terraform automation. 

<!--truncate-->


As a first step it is required toobtain aws access and secret keys. Best practice is to create new user in AWS IAM. 
Please navigate to Services > IAM page. 
Proceed with opening AWS IAM users page, and click on Add user. Provide user with name, and below, for the Access type select Programmatic access. ![Add User](../static/img/add-user.png)
Next, make sure that your AWS account(access key) has all required privileges to create EC2 instances and S3 access.
![Attach permissions](../static/img/attach-perms.png)
Copy your keys to safe place and do not share it with anyone.
Check the documentation [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html)

Next step is to install Terraform on your machine.
The easiest way is to follow its documentation [here](https://www.terraform.io/docs/cli/install/apt.html)

Clone the TDex Box repository and enter its directory. 
```sh
git clone https://github.com/tdex-network/tdex-box.git
cd tdex-box
```

Back on the AWS side, find Ubuntu 18.04 public AMI, accessible in the region you are planing to deploy service and copy it's AMI ID. 

To run deploy please prepare: \
  aws_access_key: KS2S2F4F2F2 \
  aws_secret_key: M3C9S8D2... \
  aws_region: eu-west-1 \
  aws_ami: ami-05f7491af5eef733a \
  ssh_public_key_path: ~/.ssh/id_rsa.pub \
  ssh_key_name: My Default Key \
  IP Addr: Your IP \ 
  Explorer URL: https://example.com/explorer \
  S3 bucket name: my_backup_bucket

Once you have everything in place, just execute deploy.sh and it will prompt you for all the parameters in order provided above. 
Please enter parameters carefully. 
```sh
$ chmod +x deploy.sh
$ ./deploy.sh
```

We advice you to always have backup enabled, therefor we added S3 backup option. 

