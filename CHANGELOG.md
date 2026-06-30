# Changelog

## 0.1.0

- Converted repository from playground into focused installable package `pi-to-pi`.
- Reduced package surface to:
  - `extensions/coms.ts`
  - `extensions/coms-net.ts`
  - `scripts/coms-net-server.ts`
- Removed theme/keybinding/demo coupling from shipped package.
- Updated extension imports to current Pi package names (`@earendil-works/*`, `typebox`).
- Fixed auto-load blocker where both extensions registered duplicate shared flags.
- Made `coms-net` dormant when no server URL is configured.
- Rewrote README around installable package workflow.
