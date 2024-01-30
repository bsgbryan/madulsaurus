---
sidebar_position: 3
title: Going Intermediate
custom_edit_url: null
---

## Paths

Mädūl uses TypeScript's `compilerOptions.paths` to find your dependencies.

```json title="madul-example/tsconfig.json"
{
  ...
  "compilerOptions": {
    ...
    "paths": {
      ...
      // You can specify as many entries as you like
      "#*": ["./lib/*"],
      "-*": ["./src/controllers/*"],
      "!*": ["./api/*"]
    }
  }
}
```

## Specifying third-party dependnecies

First, execute this 💎 of a command:

```bash
bun i is-odd
```

Then, add the following to your TypeSscript config:

```json title="madul-example/tsconfig.json"
{
  ...
  "compilerOptions": {
    ...
    "paths": {
      ...
      ":*": ["./node_modules/*"]
    }
  }
}
```

Now, create the following Mädūl:

```ts title="madul-example/src/IsMaybe.ts"
import { type Input } from "@bsgbryan/madul"

export const dependencies = () => ({
  ':is-odd': ['IsOdd']
})

export interface OddInput extends SyncInput {
  IsOdd: CallbableFunction
  value: number
}

export const odd = ({ IsOdd, value }: OddInput) => IsOdd(value)
```

:::tip Scoped packages
If you don't like using `:@scoped/package` to specify scoped third-party dependencies, you can add the following to your TypeScript config:

```json title="madul-example/tsconfig.json"
{
  ...
  "compilerOptions": {
    ...
    "paths": {
      ...
      "@*": ["./node_modules/@*"]
    }
  }
}
```

With this, you can specify third-party dependencies like this:

```typescript title="madul-example/src/Bang.ts"
import { type Input } from "@bsgbryan/madul"

export const dependencies = () => ({
  '@scoped/package':    ['foo'],
  ':scopeless-package': ['bar'],
})

export interface CoolInput extends SyncInput {
  foo: CallableFunction
  bar: CallableFunction
  baz: string
}

export const cool = ({ foo, bar, baz }: CoolInput) => {
  console.log(`${foo()}, ${bar()}, ${baz}`)
}
```
:::

And finally, let's test it!

```ts title="madul-example/test/IsMaybe.test.ts"
import {
  describe,
  expect,
  it,
} from "bun:test"

import { odd } from "+IsMaybe"

describe('IsMaybe.odd', () => {
  it('answers the tough question', () => {
    expect(odd({ value: 2 })).toBeTruthy()
    expect(odd({ value: 1 })).toBeFalsy()
  })
})
```

Wait a second, though ...

## Mapping default export

`is-odd` only has a single, default, export - how did Mädūl get that wired to the `IsOdd` function we used?

Mädūl maps the first capitalized item you specify to a dependnecy's default export. It can do this because the JavaScript/TypeScript naming convention is for function names to start with lowercased letters.

## Knowing thy-self

Every exported function gets `self` passed as a parameter. This is how functions can call each other.

```typescript title="madul-example/src/Referential.ts"
import {
  type InnerSelf,
  type SyncInput,
} from "@bsgbryan/madul"

export interface Self extends InnerSelf {
  me:     CallableFunction
  myself: CallableFunction
}

export const me = ({ self }: SyncInput) => {
  return `Do you mean ${self.myself()}`
}

export const myself = ({ self }: SyncInput) => {
  return `Are you looking for ${self.me()}?`
}

```

:::danger Heads up
Executing either of these functions via `bun repl` or any other means will result in infinite recursion.
They're intended to be silly, fun, examples; please don't execute them for real 😊
:::

```typescript title="madul-example/test/Referential.test.ts"
import {
  describe,
  expect,
  it,
} from "bun:test"

import {
  Self,
  me,
  myself,
} from "+Referential"

describe("Referential.me", () => {
  it('calls myself', () => {
    let called = false
    const self = {
      myself: () => called = true
    } as unknown as Self

    me({ self })

    expect(called).toBeTruthy()
  })
})

describe("Referential.myself", () => {
  it('calls me', () => {
    let called = false
    const self = {
      me: () => called = true
    } as unknown as Self

    myself({ self })

    expect(called).toBeTruthy()
  })
})

```
