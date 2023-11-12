---
description: The router can be debugged and tested in multiple ways.
---

# Debugging

## Load a static Router configuration from file

Instead of letting the router fetch the config from the platform, you can also point to a local file. This is handy for local development. Your production config can be fetched by running [wgc router fetch](../../cli/router/fetch.md) or [wgc router compose](../../cli/router/compose.md) to generate a router config without the need to interact with the controlplane.

```bash
docker run \
    -e ROUTER_CONFIG_PATH=/app/config.json \
    -v ./config.json:/app/config.json \
    --env-file ./.env router
```

The command above will mount your local file `config.json` into the router's working directory.

Docker `--env-file` allows you to specify all environment variables in your `.env` file instead of passing all of them through `-e` flags.

## Debug log level

Enable debug mode by setting the environment variable `LOG_LEVEL=debug`
