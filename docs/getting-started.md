---
sidebar_position: 2
title: Getting Started
---

## Initialize
:::tip
You can copy/paste the entire block below into a macOS/Linux/WSL terminal. It will:

1. Install bun
1. Create the project's directory
1. Initialize the project
1. Install all needed dependencies
1. Install Mädūl
:::

```bash showLineNumbers
curl -fsSL https://bun.sh/install | bash
mkdir madul-example && cd $_
bun init -y
bun i @tsconfig/bun @tsconfig/node-lts bun-types
bun i @bsgbryan/madul
```

### Why [Bun](https://bun.sh)?

Bun is an all-in-one toolkit for JavaScript and TypeScript apps. It ships as a single executable called `bun​`.

At its core is the Bun runtime, a fast JavaScript runtime designed as a drop-in replacement for Node.js. It's written in Zig and powered by JavaScriptCore under the hood, dramatically reducing startup times and memory usage.

The bun​ command-line tool also implements a test runner, script runner, and Node.js-compatible package manager, all significantly faster than existing tools and usable in existing Node.js projects with little to no changes necessary.

## Your first Mädūl

Let's start small; over the following steps, you'll build a little Mädūl that does its best to greet people 😊

### Configure

The items in `"extends"` are not strictly required, but including them is good practice.

The `compilerOptions.types` is also not required. We won't be doing anything in this tutorial that will need it, but as you build bigger and better Mädūls (*specifically: Mädūls that use any of Bun's apis*) having it will come in very handy.

The `compilerOptions.paths` item is required to Mädūl to work. Below, you'll see `"+Greeter"` - the `compilerOptions.paths` item tells TypeScript where to find the `Greeter` file we create.

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

:::tip
Both code samples below are complete; they can be copy/pasted as-is into your project 😊
:::

```typescript title="madul-example/src/Greeter.ts"
import { type Input } from "@bsgbryan/madul"

export interface OhaiInput extends Input {
  person: string
}

export const ohai = ({ person }: OhaiInput) => {
  return `OHAI, ${person}, didn't see you there 😅`
}
```

Mädūl functions are just regular functions. All arguments are passed using an object. This is nice as it makes passing and using arguments easy and descriptive.

All parameters passed to a Mädūl function are read only.

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

Look Ma, no `jest`! 🤘🏻

Mädūl tests require no external tooling. There's nothing to get in your way when you're validating that your code behaves as required.

```bash title="Execute test"
bun test
```

### Use - *via Bun's [repl](https://en.wikipedia.org/wiki/Read–eval–print_loop)*

```bash title="Fire it up"
$ bun repl
```

:::note
The code below does the following:

1. Import Mädūl - *This is required to get access to all Mädūl's benefits*
1. Instantiate the `greeter` Mädūl - *This is where the magic happens*
1. Call function on `greeter` Mädūl - *This is a wrapped verion of the function defined above*
1. Use returned value - *Mädūl functions are just regular functions*
:::

```bash title="Paste into Bun's repl" showLineNumbers
import madul from "@bsgbryan/madul"
const greeter = madul('+Greeter')
const greeting = greeter.ohai({ person: 'Beth' })
console.log(greeting)
```

The `console.log` statement above will display the following in your terminal:

```bash title="Output"
OHAI Beth, I didn't see you there 😅
```
