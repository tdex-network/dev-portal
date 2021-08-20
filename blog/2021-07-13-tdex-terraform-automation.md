---
slug: tdex-terraform-automation
title: Automate TDex deamon with terraform
author: Alexander K
author_title: Maintainer of TDEX Network
tags: [terraform, automation, tdex]
---

Configure and run TDex box easily using Terraform automation. 

<!--truncate-->


As a first step it is required toobtain aws access and secret keys. Best practice is to create new user in AWS IAM. Proceed with opening AWS IAM users page, and click on Add user. Provide user with name, and below for the Access type select Programmatic access. Next, make sure that your AWS account(access key) has all required privileges to create EC2 instances and S3 access. 
Copy your keys to safe place and do not share it with anyone.
Check the documentation [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html)

Additionally install Terraform. 
The easiest way is to follow its documentation [here](https://www.terraform.io/docs/cli/install/apt.html)

Clone the repository and enter its directory. 
```sh
git clone repostiory_link
cd dir-of-repo
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

Once you have everything in place, just execute deploy.sh with all the parameters in order provided above. 

Example: \
```sh
./deploy.sh aws_access_key aws_secret_key aws_region aws_ami ssh_public_key_path ssh_key_name IP_ADDR https://example.com/explorer aws_s3_my_backup_bucket
```


Additionally, you can use unlockerd auto-unlock service, which is shipped with the container. 
In the docker-compose file you can find commented lines for enabling the unlocker with the file provider, which means it attempts to source the unlocking password from a local file.

Enabling the unlocker is as easy as creating a file containing the same password used to init your daemon's wallet and exporting its path in the PWD_PATH variable, like for example:
Connect to the service machine over SSH and enable unlockerd.

```sh
$ echo "mypassword" > pwd.txt
$ export PWD_PATH=$(pwd)/pwd.txt
$ docker-compose up -d --no-deps --force-recreate tdexd
```

Execute unlockerd: 
```sh
$ docker exec -it tdexd unlockerd
```


--- Backup option to S3 ---
If you provide bucket name, your data will be daily backed up on to it.
