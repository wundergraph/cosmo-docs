---
description: >-
  The cosmo CLI tool: wgc. Used to manage the cosmo platform e.g. pushing
  schema, checking schemas, creating new projects, managing users, etc. It
  interacts with the control plane.
---

# Intro

## Installation

{% hint style="info" %}
Please ensure you have installed at least one version of Node.js that is in "long-term support" ([LTS](https://nodejs.org/en/about/previous-releases)).
{% endhint %}

The CLI tool is part of the npm registry. You can start using it by simply running the following command.

```bash
npm install -g wgc@latest
```

or

```bash
npx -y wgc@latest
```

Cosmo CLI Tool, or `wgc`, is an essential companion for developers leveraging the powerful capabilities of the Cosmo platform. It simplifies the management of GraphQL schemas, projects, and users, making the process of building and maintaining GraphQL APIs a seamless and efficient experience. Empowered by `wgc`, developers can focus on delivering innovative GraphQL solutions while taking full advantage of Cosmo's advanced features and functionalities.

### Authentication

The CLI uses the following environment variables to authenticate with the control plane:

* `COSMO_API_KEY` - API key for the control plane (For Cosmo Cloud you get this token after account provisioning)
* `COSMO_API_URL` - URL of the control plane (Points to Cosmo Cloud by default but can be changed for self-hosted)
