# Insecure Chrome

Raycast extension to launch Chrome Canary with security flags disabled for local development.

## Features

- Launch Chrome Canary (falls back to stable Chrome) with insecure origin flags
- Useful for testing local HTTP services that need HTTPS-only browser APIs
- Uses a temporary profile at `/tmp/chrome-test-profile`

## Commands

| Command | Arguments | Description |
|---------|-----------|-------------|
| Open Insecure Chrome | domain (required), port (optional) | Launch Chrome with insecure origin flags |

## Install

```bash
bun install
bun run build
bun run dev
```

## License

MIT
