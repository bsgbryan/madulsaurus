---
sidebar_position: 1
title: Star Map (Overview)
custom_edit_url: null
---

## What is Mädūl?

Mädūl is a set of conventions and tools that support crafting rock-solid, functional code.

### Why functional?

Functional programming is a declarative programming paradigm where programs are created by applying sequential functions rather than statements.

* **Easy debugging**: Pure functions and immutable data make it easy to find where variable values are set. Pure functions have fewer factors influencing them and therefore allow you to find the bugged section easier.

* **Lazy evaluation**: Functional programs only evaluate computations at the moment they’re needed. This allows the program to reuse results from previous computations and save runtime.

* **Modular**: Pure functions do not rely on external variables or states to function, meaning they’re easily reused across the program. Also, functions will only complete a single operation or computation to ensure you can reuse that function without accidentally importing extra code.

* **Enhanced readability**: Functional programs are easy to read because the behavior of each function is immutable and isolated from the program’s state. As a result, you can predict what each function will do often just by the name!

* **Parallel programming**: It’s easier to create parallel programs with a functional programming approach because immutable variables reduce the amount of change within the program. Each function only has to deal with user input and can trust that the program state will remain mostly the same!

*Read more at [educative.io](https://www.educative.io/blog/what-is-functional-programming-python-js-java#what)*

## Goals

1. Make testing so easy it's fun
1. Everything is opt-in
1. Defining and using maduls is so simple it feels like cheating

### Fun testing

Testing our code is essential, we all know that.

#### The problem

Testing out code can be a major pain; often, the more crucial the tests are, the more painful they are to write. Why is this? Because of [mocking/stubbing](https://stackoverflow.com/a/14081911/3803332).

#### The context

Tools like Jest work very hard to make defining and executing mocks/stubs as straightforward as possible. There's only so much they can do, though, as mocking/stubbing is inherently cumbersome and unwieldy. To successfully mock/stub a dependency, its import must be intercepted/replaced - but not just once; it often must be intercepted many times, for different reasons and with different outcomes. And then, other times, we need the dependency to *not* be interecpted! It can get confusing fast - and to compound things, when defining each instance of a mock/stub, we need to be *extremely* specific. If we're even a little bit off in the setup of our mocks/stubs, our tests will fail in ways that can be extremely difficult to debug.

#### The solution

Mädūl eliminates the need to use mocking/stubbing tools like `jest.spyOn` and `jest.mock` by passing everything a function needs to do its work (dependencies as well as input) as parameters. In tests, then, we simply pass functions that do what we want for our test in place of the functions used when the code runs in production.

As an example, consider the Mädūl below:

```typescript title="src/EventQueue.ts"
export const dependencies = () => ({
  '+Queue': ['pop']
})

type NextInput = {
  handler: CallableFunction
  pop:     CallableFunction
}

export const next = ({ handler, pop }: NextInput) => {
  handler({ event: pop() })
}
```

This Mädūl declares a single dependency, and exports one function that uses that dependency. A test for `next` could look something like:

```typescript title="test/EventQueue.test.ts"
import { next } from "../src/EventQueue"

describe('next', () => {
  it('calls pop to get the next item from the Queue, and passes that to the specified handler', () => {
    const called = {
      pop:     false,
      handler: false,
    }

    const pop = () = {
      called.pop = true
      return 'handle me'
    }

    let passed = ''

    const handler: thing => {
        passed = thing
        called.handler = true
      }
    }

    next({ handler, pop })

    expect(called.pop).toBeTruthy()
    expect(called.handler).toBeTruthy()

    expect(passed).toEqual({ event: 'handle me' })
  })
})
```

Look Ma, no `jest`! 🙌🏻

### Everything's opt-in

Mädūl can:

* Define, import, initialize, and pass dependencies to your exported functions
* Define, import, initiaize, and execute decorators (functions that run before and/or after your `async` exported functions)

All of this is opt-in. You can mix & match traditional `import` statements with the `dependencies` function however works best for you. Only what you specify via the `decorators` function are executed around your code. Functions whose input does not extend Mädūl's `SyncInput` or `AsyncInput` interfaces are not wrapped or processed in any way.

### Super powers

```typescript title="MessageManager.ts"
export const dependencies = () => ({
  '+API': ['get', 'post']
})

export const decorators = () => ({
  fetch: {
    before: {
      '+Auth': ['validatePermisisons'],
      '+API':  ['validateInput'],
    },
    after: {
      '+API':      ['handleErrors'],
      '+Settings': ['applyContentFilters'],
    },
  },
  send: {
    before: {
      '+Auth':      ['validatePermisisons'],
      '+API':       ['validateInput'],
      '+Moderator': ['filterExplicitContent'],
    },
    after: {
      '+API': ['handleErrors'],
    },
  },
})

type FetchInput = {
  channel: string
  get: CallableFunction
}

type SendInput = {
  content: {
    recipient: string
    body:      string
  }
  post: CallableFunction
}

export const fetch = async ({ channel, get  }: FetchInput) => await get ({ channel })
export const send  = async ({ content, post }: SendInput ) => await post({ content })
```

In the above Mädūl, the `decorators` ensure that:

1. *Every call to `fetch` is authenticated and authorized*
1. *Every call to `fetch` runs the message contents through the user's configured filters*
1. *Every call to `fetch` is wrapped in input validation and error handling logic*
1. *Every call to `send` is authenticated and authorized*
1. *Every call to `send` runs the message contents through `filterExplicitContent`*
1. *Every call to `send` is wrapped with API input and error processing behavior.*

The functions MessageManager exports don't have to worry about or duplicate any of the behvaior implemented by the `decorators`.

It's also extremely clear what happens on every invokation of `fetch` and `send`; anyone working with this Mädūl can see everything that's going on.
