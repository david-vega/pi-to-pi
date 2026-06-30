# Release Checklist (`pi-to-pi`)

Use this every time before publishing.

## 1) Sanity checks

```bash
npm run check:pack
npm run check:load
```

Expected:
- `check:pack` tarball includes only intended files.
- `check:load` prints `pong` (both extensions load together).

## 2) Version + changelog

- Bump `package.json` version.
- Add a new section to `CHANGELOG.md`.

## 3) Commit and tag (rollback safety)

```bash
git add -A
git commit -m "release: vX.Y.Z"
git tag vX.Y.Z
```

If something breaks after publish, you can return to known state:

```bash
git checkout vX.Y.Z
```

## 4) Publish dry run

```bash
npm publish --dry-run
```

## 5) Publish

```bash
npm publish --access public
```

## 6) Post-publish smoke test

In a clean project:

```bash
pi install npm:pi-to-pi
pi -p "List available tools including coms and coms_net variants"
```

