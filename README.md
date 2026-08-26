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

## TypeScript

`tsc` is TypeScript 7, and it is the only compiler this repository installs.

`typescript-eslint` cannot use it — TypeScript 7 ships no programmatic compiler API until
7.1, and typescript-eslint refuses to load without one. It does not need this repository to
solve that: [`@damienmortini/eslint-config`](https://www.npmjs.com/package/@damienmortini/eslint-config)
depends on TypeScript 6 itself, and pnpm gives the parser that copy. Nothing here has to
name a second compiler, and `pnpm test` passes with `typescript` at 7.

Should `eslint` ever start failing on `does not support TS 7.0`, that pin is what went
away, and the fix is to install both compilers side by side:

```json
"@typescript/native": "npm:typescript@^7.0.2",
"typescript": "npm:@typescript/typescript6@^6.0.2"
```

The package named `typescript` then becomes the TypeScript 6 compatibility shim, whose
binary is `tsc6`, while `@typescript/native` owns `tsc`. Both aliases become unnecessary at
TypeScript 7.1.

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
