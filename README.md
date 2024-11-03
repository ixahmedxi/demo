# TypeScript Monorepo Demo

> This is a demo of two different ways of setting up a TypeScript monorepo.

The monorepo is setup using TypeScript project references, however the `web2` app escapes out of this setup by
not referencing the `api` package to simulate the built packages way of doing things.

The `api` package is a trpc api that has 100 routers, with each router having a child router to simulate a typescript lsp heavy codebase.

The test concludes the following:

- `web` app with project references is slower to calculate auto-completions compared to `web2` app with no project references.
- `web` has a better DX because of live types, but `web2` can scale better with more TypeScript heavy stuff going on.
- `web2` is faster to calculate auto-completions compared to `web` because it resolves types using the `dist` folder instead of the source code.

Advantages of project references:

- Live types, you don't need to build everything to resolve dependencies.
- Better for CI/CD for typechecking, linting...etc because you don't need to build before running these commands.
- You can use `tsc --build` from the root of the monorepo to build everything at once.
- `tsc` knows the linkage and hierarchy of packages to each other, thus only recompiles what has changed.
- Go to definition is more accurate because it uses the source code.

Advantages of built packages:

- Immediate auto-completion from the moment you build the packages.
- Scales better because you don't need to worry about your LSP getting slower as the monorepo grows.

## To simulate my not very accurate test

- Go to the `trpc.tsx` file in both `web` and `web2` apps after running `bun tsc --build --verbose` at the root of the project.
- Below this line: `export const trpc = createTRPCReact<AppRouter>()`, try to access something from the trpc object, like type:

```tsx
trpc.
```

Observe how long it takes for the auto-completion to pop up.

## So what's the best way to setup a TypeScript monorepo? (my opinion)

I personally think that in the world of monorepos, slow LSP is a huge issue and it should be prioritized, it lowers developer morale and productivity.

You can use a combination of built packages and task management tools like [`turbo`](https://turbo.build/repo) or [`nx`](https://nx.dev) to build your packages in order.

You can also build your packages on `postinstall` to ensure types are resolved at install time.

Project references are cool but they are not a true fix for slow LSP, they are are a middle ground, theoretically they should be faster than just exporting the source code because of typescript understanding the hierarchy of the code, however they are still not as fast as built packages.

Go to definition being off in built packages is a TypeScript bug which should be fixed sometime in the future hopefully.
