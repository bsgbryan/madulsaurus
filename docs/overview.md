---
sidebar_position: 1
title: Overview
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

1. Make testing so easy it's actually fun
1. Everything should be opt-in
1. Defining and using maduls should be so simple it feels like cheating

### Fun testing

Testing our code is essential, we all know that.

#### The problem

Testing out code can be a major pain; often, the more crucial the tests are, the more painful they are to write. Why is this? Because of [mocking/stubbing](https://stackoverflow.com/a/14081911/3803332).

#### The context

Tools like Jest work very hard to make defining and executing mocks/stubs as straightforward as possible. There's only so much they can do, though, as mocking/stubbing is inherently cumbersome and unwieldy. To successfully mock/stub a dependency, its import must be intercepted/replaced - but not just once; it often must be intercepted many times, for different reasons and with different outcomes. And then, other times, we need the dependency to *not* be interecpted! It can get confusing fast - and to compound things, when defining each instance of a mock/stub, we need to be *extremely* specific. If we're even a little bit off in the setup of our mocks/stubs, our tests will fail in ways that can be extremely difficult to debug.

#### The solution

Mädūl eliminates the need to use mocking/stubbing tools like `jest.spyOn` and `jest.mock` by passing everything a function needs to do its work (dependencies as well as input) as parameters. In tests, then, we simply pass functions that do what we want for our test in place of the functions used when the code runs in production.

As an example, consider the Mädūl below:

```typescript title="src/EventManager.ts"
export const dependencies = () => ({
  '+Queue': ['pop']
})

export const next = ({ handler, pop }) => {
  handler({ event: pop() })
}
```

This Mädūl declares a single dependency, and exports one function that uses that dependency. A test for `next` could look something like:

```typescript title="test/EventManager.test.ts"
import { next } from "../src/EventManager"

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
:::note[Regarding type definitions]
The example code on this page does not include type definitions. This is done for brevity and to keep focus on the structure and organisation of the code.
:::

Look Ma, no `jest.*`! 🙌🏻

### Everything's opt-in

Mädūl can:

* Define, import, initialize, and pass dependencies to your exported functions
* Define, import, initiaize, and execute decorators (functions that run before and/or after your `async` exported functions)

All of the above is opt-in. You can mix & match traditional `import` statements with the `dependencies` function however works best for you. Only what you specify via the `decorators` function are executed around your code. Functions whose input does not extend Mädūl's `Input` interface are not wrapped or processed in any way.

### So simple it feels like cheating

```typescript title="MessageManager.ts"
export const dependencies = () => ({
  '+API': ['get', 'post']
})

export const decorators = () => ({
  GetMessages: [
    '+Auth.validatePermisisons',
    '+UserSettings.applyConfiguredFilters',
    '+API.wrapCall',
  ],
  SendMessage: [
    '+Auth.validatePermisisons',
    '+Moderator.filterExplicitContent',
    '+API.wrapCall',
  ],
})

export const fetch = async ({ channel, get  }) => await get ({ channel })
export const send  = async ({ content, post }) => await post({ content })
```

In the above Mädūl, the `decorators` ensure that:

1. Every call to `GetMessages` is authenticated and authorized - *this is an example of a **before** filter; `validatePermisisons` is called prior to `GetMessages` execution, if it throws an error, `GetMessages` is not called.*
1. Every call to `GetMessages` runs the message contents through the user's configured filters - *this is an example of an **after** decorator; `applyConfiguredFilters` works on, and can modify, the output from `GetMessages`.*
1. Every call to `GetMessages` is wrapped in input validation and error handling logic - *in this example, `wrapCall` exports both `before` and `after` functions; meaning it executes both before and after `GetMessages`. If its `before` method throws an error because input does not meet the API's validation requirements (such as specifying a non-existant channel), `GetMessages` does not execute. If the API responds with an error (for example, a 502), `wrapCall` takes over and processes that error.*
1. Every call to `SendMessage` is authenticated and authorized - *as with `GetMessages`, if `validatePermisisons` thows an error, `SendMessage` does not execute.*
1. Every call to `SendMessage` runs the message contents through `filterExplicitContent` - *this demonstrates how decorarators can be chained; in this example, `filterExplicitContent` is another **before** decorator. Chained decorators are executed in the order they are specified.*
1. As with `GetMessages`, every call to `SendMessage` is wrapped with API input and error processing behavior.

This means that the functions MessageManager exports don't have to worry about or duplicate any of the above behvaior or code.