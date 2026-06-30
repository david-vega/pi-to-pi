# pi-to-pi

Installable Pi package for agent-to-agent workflows.

## What this package includes

### Communication extensions
- `coms` (local): peer messaging on the same machine
- `coms-net` (network): peer messaging through an HTTP/SSE hub

### Meta-builder extension
- `pi-pi`: orchestrator extension with parallel Pi-domain experts (`query_experts`)

### Reusable prompts/resources
- Agent prompts: `scout`, `planner`, `builder`, `reviewer`, `documenter`, `browser`, `plan-reviewer`, `red-team`, `blue-team`
- `browser` is the package-facing browser automation prompt resource (derived for this package from the source repo's `bowser` role)
- Pi-pi expert prompts under `agents/pi-pi/*.md` (including `pi-orchestrator.md`)

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

Tools:
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

Tools:
- `coms_net_list`
- `coms_net_send`
- `coms_net_get`
- `coms_net_await`

---

## Pi-pi mode (`pi-pi`)

Pi-pi loads expert prompts from:
1. Project override: `.pi/agents/pi-pi/*.md`
2. Package fallback: bundled `agents/pi-pi/*.md`

So installs work out of the box, while still allowing per-project expert overrides.

Commands:
- `/experts`
- `/experts-grid <1-5>`

Tool:
- `query_experts`

---

## Agent-chain mode (`agent-chain`)

`agent-chain` provides sequential pipeline orchestration via `run_chain`.

Config loading order:
1. Project override: `.pi/agents/agent-chain.yaml`
2. Package fallback: bundled `agents/agent-chain.yaml`

Agent prompt resolution for chain steps:
1. `.pi/agents/*.md`
2. `agents/*.md` in your project
3. `.claude/agents/*.md` in your project
4. bundled package `agents/*.md`

This means packaged defaults work out of the box, while project-local agent prompts still override.

Commands:
- `/chain`
- `/chain-list`

Tool:
- `run_chain`

---

## Cross-agent mode (`cross-agent`)

`cross-agent` discovers and exposes resources from other agent ecosystems (`.claude`, `.gemini`, `.codex`) and local `.pi/agents`.

- Registers discovered commands as `/name`
- Registers discovered skills as `/skill:name`
- Lists discovered agents for reference

---

## Cross-team mode (`agent-team` / `cross-team`)

`cross-team` is an alias entrypoint for `agent-team`.

It dispatches tasks to specialist agents via `dispatch_agent` and supports team presets.

Teams config loading order:
1. Project override: `.pi/agents/teams.yaml`
2. Package fallback: bundled `agents/teams.yaml`

Bundled `teams.yaml` uses `browser` in the `frontend` team (package-compatible replacement for source `bowser`).

Commands:
- `/agents-team`
- `/agents-list`
- `/agents-grid <1-6>`

Tool:
- `dispatch_agent`

---

## Till-done mode (`tilldone`)

Task-discipline extension that enforces explicit task tracking before other tools are used.

Commands/tooling:
- Tool: `tilldone` (`new-list`, `add`, `toggle`, `remove`, `update`, `list`, `clear`)
- Command: `/tilldone` overlay

---

## Notes

- Agent identity flag is `--cname` (not `--name`).
- If no `PI_COMS_NET_SERVER_URL`/server config exists, `coms-net` stays dormant.
- This package does not include themes, theme cyclers, or keybinding overrides.
