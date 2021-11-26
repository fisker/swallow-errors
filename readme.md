# swallow-errors

[![Build Status][github_actions_badge]][github_actions_link]
[![Coverage][coveralls_badge]][coveralls_link]
[![Npm Version][package_version_badge]][package_link]
[![MIT License][license_badge]][license_link]

[github_actions_badge]: https://img.shields.io/github/workflow/status/fisker/swallow-errors/CI/main?style=flat-square
[github_actions_link]: https://github.com/fisker/swallow-errors/actions?query=branch%3Amain
[coveralls_badge]: https://img.shields.io/coveralls/github/fisker/swallow-errors/main?style=flat-square
[coveralls_link]: https://coveralls.io/github/fisker/swallow-errors?branch=main
[license_badge]: https://img.shields.io/npm/l/prettier-format.svg?style=flat-square
[license_link]: https://github.com/fisker/swallow-errors/blob/main/license
[package_version_badge]: https://img.shields.io/npm/v/swallow-errors.svg?style=flat-square
[package_link]: https://www.npmjs.com/package/swallow-errors

> Ignore function errors.

## Install

```bash
yarn add swallow-errors
```

## Usage

```js
import {wrap, execute} from 'swallow-errors'

const foo = wrap(() => {
  throw new Error('oops!')
})
// Returns a function will never throw errors

execute(() => {
  throw new Error('oops!')
})
// Execute the function and ignore possible errors
```

## API

### `wrap(originalFunction, ignore?)`

Type: `function`

Returns a function that will ignore errors passed `ignore` test.

#### `originalFunction`

Type: `function`

The function to wrap

#### `ignore`

Type: `function`

The error test function, if it's omitted, all errors will be ignored.

To ignore specific errors, return `true`

```js
const foo = wrap(
  function () {
    throw new Error('foo')
  },
  (error) => error?.message === 'bar',
)

foo()
// Throws a error with message `foo`
```

### `execute(originalFunction, ignore?)`

Execute the wrapped function **without arguments**.
