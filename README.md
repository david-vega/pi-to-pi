# pi-to-pi

Installable Pi package for agent-to-agent communication.

## What this package includes

- `coms` (local): peer messaging on the same machine
- `coms-net` (network): peer messaging through an HTTP/SSE hub

Deliberately excluded: themes, theme cyclers, custom keybindings, and unrelated demo extensions.

---

## Install

```bash
pi install npm:pi-to-pi
```

After install, Pi auto-loads package extensions on startup.

---

## Local mode (`coms`)

Start two Pi sessions (same project name):

```bash
pi --cname planner --project default
pi --cname coder --project default
```

Then use tools:
- `coms_list`
- `coms_send`
- `coms_get`
- `coms_await`

---

## Network mode (`coms-net`)

`coms-net` activates only when a server URL is configured.

### 1) Start the hub server

From this repository root:

```bash
bun scripts/coms-net-server.ts
```

> Bun is required only for the hub server script.

### 2) Start Pi clients

```bash
PI_COMS_NET_SERVER_URL=http://127.0.0.1:52965 \
PI_COMS_NET_AUTH_TOKEN=<token> \
pi --cname planner --project default

PI_COMS_NET_SERVER_URL=http://127.0.0.1:52965 \
PI_COMS_NET_AUTH_TOKEN=<token> \
pi --cname coder --project default
```

Network tools:
- `coms_net_list`
- `coms_net_send`
- `coms_net_get`
- `coms_net_await`

---

## Notes

- Agent identity flag is `--cname` (not `--name`).
- If no `PI_COMS_NET_SERVER_URL`/server config exists, `coms-net` stays dormant (no startup error spam).
