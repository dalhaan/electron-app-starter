# Electron Monorepo Starter

This is a custom boilerplate monorepo for creating an Electron app.

## Path aliases

There are a few path aliases to make importing easier and cleaner.

### Electron main process path alises

| Path                 | Alias                            | Example                                                      |
| -------------------- | -------------------------------- | ------------------------------------------------------------ |
| `~/common/*`         | `apps/electron-app/src/common/*` | `import { COUNTER_STORE_NAME } from "~/common/store-names";` |
| `@/*`                | `apps/electron-app/src/main/*`   | `import { createMainWindow } from "@/createMainWindow";`     |
| `@org-name/common/*` | `lib/common/src/index.ts`        |                                                              |
| `@org-name/node/*`   | `lib/node/src/index.ts`          |                                                              |

### Electron renderer process path alises

| Path                 | Alias                              | Example                                                      |
| -------------------- | ---------------------------------- | ------------------------------------------------------------ |
| `~/common/*`         | `apps/electron-app/src/common/*`   | `import { COUNTER_STORE_NAME } from "~/common/store-names";` |
| `@/*`                | `apps/electron-app/src/renderer/*` | `import { useCounter } from "@/stores/counter-store";`       |
| `@org-name/common/*` | `lib/common/src/index.ts`          |                                                              |
| `@org-name/node/*`   | `lib/node/src/index.ts`            |                                                              |
