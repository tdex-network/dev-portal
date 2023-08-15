---
title: 'Overview'
sidebar_position: 1
---

The daemon can be served in one of the following ways:
 * [Dockerized application](run_docker.md)
 * [Standalone application](run_standalone.md)

The daemon makes use of an external [Ocean wallet](https://github.com/vulpemventures/ocean) to which it connects via gRPC (HTTP/2).

Once your provider is up and running you need to [configure the operator CLI](configure_cli.md) in order to setup your markets - and lot more things. 

If you have already done all these steps, you are ready to [initialize and unlock the daemon and its wallet](../init_daemon.md).
