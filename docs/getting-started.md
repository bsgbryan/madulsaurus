---
sidebar_position: 2
title: Getting Started
---

## Initialize

```bash
curl -fsSL https://bun.sh/install | bash
mkdir madul-example && cd $_
bun init
bun i @tsconfig/bun @tsconfig/node-lts bun-types
bun i @bsgbryan/madul
```

### Why [Bun](https://bun.sh)?

Bun is an all-in-one toolkit for JavaScript and TypeScript apps. It ships as a single executable called `bun​`.

At its core is the Bun runtime, a fast JavaScript runtime designed as a drop-in replacement for Node.js. It's written in Zig and powered by JavaScriptCore under the hood, dramatically reducing startup times and memory usage.

The bun​ command-line tool also implements a test runner, script runner, and Node.js-compatible package manager, all significantly faster than existing tools and usable in existing Node.js projects with little to no changes necessary.

## Your first Mädūl

All code samples below are complete; they can be copy/pasted as-is into your project 😊

### Configure

```json title="madul-example/tsconfig.json"
{
  ...
  "extends": [
    "@tsconfig/bun/tsconfig.json",
    "@tsconfig/node-lts/tsconfig.json"
  ],
  "compilerOptions": {
    ...
    "types": ["bun-types"],
    "paths": {
      "+*": ["./src/*"]
    }
  }
}
```

### Define

```typescript title="madul-example/src/Greeter.ts"
import { type Input } from "@bsgbryan/madul"

export interface OhaiInput extends Input {
  person: string
}

export const ohai = ({ person }: OhaiInput) => {
  return `OHAI, ${person}, didn't see you there 😅`
}
```

### Test

```typescript title="madul-example/test/Greeter.test.ts"
import {
  describe,
  expect,
  it,
} from "bun:test"

import greeter from "+Greeter"

describe('Greeter', () => {
  it('greets a person', () => {
    expect(typeof greeter.ohai).toBe('function')
    expect(greeter.ohai({ person: 'Bryan' })).toBe("OHAI, Bryan, didn't see you there 😅")
  })
})
```

```bash title="Execute test"
bun test
```

### Use

```bash title="Commands"
$ bun repl
> import madul from "@bsgbryan/madul"
> const greeter = madul('+Greeter')
> const greeting = greeter.ohai({ person: 'Beth' })
> console.log(greeting)
```
```bash title="Output"
OHAI Beth, I didn't see you there 😅
```
