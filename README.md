# starter

Tiny, functional and future-proof JavaScript starter using Web Components.

No bundler, no transpiler, no framework: the browser loads standard ES modules, custom
elements and CSS module scripts, and the dev server serves TypeScript straight from source.

## Getting started

```sh
pnpm install
pnpm start
```

`pnpm start` runs [`@damienmortini/server`](https://www.npmjs.com/package/@damienmortini/server),
which serves each package's `dist/*.js` from its `src/*.ts` and rewrites bare specifiers to
real paths. Edit a `.ts` file and reload — there is no build to run in development.

## Layout

Each folder under `packages/` is a workspace package, built by plain `tsc` into its own
`dist/`. `index.html` is the page: it imports the entry package by bare name and carries an
import map so the same file works both under the dev server and as a static build.

Add a package by creating `packages/<name>/` with a `package.json`, a `tsconfig.json`
extending the root one, and a `src/index.ts`.

## Scripts

| Script | What it does |
| --- | --- |
| `pnpm start` | Dev server, serving TypeScript from source |
| `pnpm run build` | `tsc` in every package, into `dist/` |
| `pnpm test` | The gate: eslint over `packages`, then a typecheck of every package |
| `pnpm run lint` / `lint:fix` | eslint over the repository |
| `pnpm run upgrade` | `syncpack` update and fix, then install |

## Deployment

Pushing to `main` builds the packages and publishes the whole repository to GitHub Pages,
`node_modules` included — that is what the import map in `index.html` resolves against.

## Git hooks

`pnpm install` points `core.hooksPath` at `hooks/`:

- `commit-msg` strips agent attribution trailers, which are permanent once a commit is pushed.
- `pre-push` runs a prose checker if one is configured, so nothing meant to stay local is
  published by accident:

  ```sh
  git config hooks.proseCheck <command>
  ```

  It is called as `<command> <repository> --commits <range>` and its exit status decides the
  push. Unset, and the hook does nothing.
