# Changelog

## 0.1.1

- Added current/self agent row to both `coms` and `coms-net` pool widgets with distinct styling for clear identification.
- Expanded self row metadata in both widgets to include model, context %, queue depth, and purpose, with stable fallbacks (`unknown`, `--%`, `0`, empty string).
- Hardened narrow-width pool rendering in both widgets to prevent border/line corruption and preserve readable truncation behavior.
- Landed reliability fixes across local and hub messaging paths: serialized inbound turn handling, pending-reply lifecycle hardening, response-race handling, and shutdown cleanup robustness.
- Expanded helper test coverage for `scripts/coms-net-server.ts` pure utilities.

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
