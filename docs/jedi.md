---
sidebar_position: 3
title: Jedi (Advanced)
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
export const dependencies = () => ({
  ':is-odd': ['IsOdd']
})

type OddDependency = {
  IsOdd: CallableFunction
}

type OddInput = {
  value: number
}

type OddParams = OddDependency & OddInput

export const odd = ({ IsOdd, value }: OddParams) => IsOdd(value)
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
export const dependencies = () => ({
  '@scoped/package':    ['foo'],
  ':scopeless-package': ['bar'],
})

type CoolDependencies = {
  foo: CallableFunction
  bar: CallableFunction
}

type CoolInput = {
  baz: string
}

type CoolParams = CoolDependencies & CoolInput

export const cool = ({ foo, bar, baz }: CoolParams) => {
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
    expect(odd({ value: 1 })).toBeTruthy()
    expect(odd({ value: 2 })).toBeFalsy()
  })
})
```

Wait a second, though ...

## Mapping default export

`is-odd` only has a single, default, export - how did Mädūl get that wired to the `IsOdd` function we used?

Mädūl maps the first capitalized item you specify to a dependency's default export.

## Knowing thy-self

Every exported function receives `self` as a parameter. This is how functions call each other while maintaining that sweet, sweet fun testability.

```typescript title="madul-example/src/Referential.ts"
export type Self = {
  myself: CallableFunction
  me:     CallableFunction
}

export const me = ({ self }: Self) => {
  return `Do you mean ${self.myself()}`
}

export const myself = ({ self }: Self) => {
  return `Are you looking for ${self.me()}?`
}

```

:::danger Heads up
Executing either of these functions via `bun repl` or any other means will result in infinite recursion.
They're intended purely as fun examples 🫣
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

## Handling errors

Mädūl takes errors seriously. It provides robust tools for reporting/diagnosing errors - and imposes strict requirements regarding the handling of errors.

JavaScript's method of error reporting, throwing something from misbehaving code, can be extremely problematic and difficult to work with.

Mädūl works hard to make JavaScript/TypeScript as secure, reliable, and robust as possible. It does this by requiring that every thrown error be caught and handled. If a thrown error is not caught and handled by the calling function Mädūl terminates the `process`. This may sound harsh but and uncaught/unhandled error would terminate the `process` anyway when it bubbles all the way to the top of the call stack. Mädūl simply enforces error handling closer to the source of the error.

Requiring the caller to handle an error makes error debugging *much* easier. Additionally, Mädūls error reporting tools make things *ever better*.

All Mädūl functions receive an `err` function as a parameter. They can use this function to report errors to the caller. `err` strips unhelpful information from bare stack traces and adds a lot of useful context and information.

As an example, consider the following:

```typescript title="madul-example/src/ReportsErr.ts"
type UhOhHelper = {
  err: CallableFunction
}

export type UhOhErr = {
  context: {
    code: number
  }
}

export const uhoh = ({ err }: UhOhHelper) => {
  err('Something went wrong', { code: 420 })
}
```

```typescript title="madul-example/src/Caller.ts"
import { UhOhErr } from "+ReportsErr"

export const dependencies = () => ({
  '+ReportsErr': ['uhoh']
})

type OhBoyDependency = {
  uhoh: CallableFunction
}

export const ohboy = ({ uhoh }: OhBoyDependency) => {
  try { uhoh({ example: 'argument' }) }
  catch (e) {
    const err = e as unknown as UhOhErr

    if (err.context.code > 399 && err.context.code < 500)
      console.error('Enhance your calm, my friend')
    else if (err.context.code > 499 && err.context.code < 600)
      console.error('Api call failed')
    else
      console.error(String(e))
  }
}
```

## Debug printing

Mädūl provides a method for pretty-printing debugging information to all functions: `print`:

```typescript title="madul-example/src/Printer.ts"
type PrintMeHelper = {
  print: CallableFunction
}

export const printMe = ({ print }: PrintMeHelper) => {
  print({ helpful: [1138], value: 42, oh: 'and this, too' })
}
```

Executing this will print nicely-formatted, helpful, output to the console, nice!
