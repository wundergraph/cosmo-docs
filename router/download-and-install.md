---
description: Learn how to download and install the router
---

# Download & Install

## Download

On every router release, we attach official binaries for all available platforms. [Here](https://github.com/wundergraph/cosmo/releases?q=router\&expanded=true) is the list of available router releases.

<figure><img src="../.gitbook/assets/CleanShot 2024-10-03 at 19.41.10@2x.png" alt="an image showing the expandable assets menu"><figcaption><p>The red arrow points to the expandable Assets menu, under which the list of binaries can be found</p></figcaption></figure>

If you are unsure which binary is for what platform please take the following table as a reference.

| Binary        | OS/Architecture                     |
| ------------- | ----------------------------------- |
| darwin-amd64  | MacOS (Intel 64 bit)                |
| darwin-arm64  | MacOS (Apple Silicon 64 bit \[M1+]) |
| linux-386     | Linux 32 bit                        |
| linux-amd64   | Linux AMD 64 bit                    |
| linux-arm64   | Linux ARM 64 bit                    |
| windows-386   | Windows 32 bit                      |
| windows-amd64 | Windows 64 bit                      |

## Docker

You can also run the router with docker. On every release, we also push a docker image. [Here](https://github.com/wundergraph/cosmo/pkgs/container/cosmo%2Frouter) is the docker repository of the router. If you are looking for an easy way to find the right docker instructions, navigate to your dashboard and click on "Run router locally".

<figure><img src="../.gitbook/assets/CleanShot 2024-10-03 at 19.39.08@2x.png" alt=""><figcaption><p>Click on the button to copy the docker instructions. Graph name and token are replaced your correct values.</p></figcaption></figure>

The output will look like this but with your own `GRAPH_API_TOKEN``.`

```bash
docker run \
  --name cosmo-router \
  --rm \
  -p 3002:3002 \
  --add-host=host.docker.internal:host-gateway \
  --pull always \
  -e DEV_MODE=true \
  -e LISTEN_ADDR=0.0.0.0:3002 \
  -e GRAPH_API_TOKEN=<graph-api-token> \
  ghcr.io/wundergraph/cosmo/router:latest
```
