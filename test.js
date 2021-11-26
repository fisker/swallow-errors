import test from 'ava'
import {execute, wrap} from './index.js'

console.log(wrap(() => {}))

const error = new TypeError('A dummy error')
const isDummyError = (caughtError) => caughtError === error

test('execute', async (t) => {
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const foo = () => {
    throw error
  }
  t.is(typeof execute(foo), 'undefined')

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const bar = () => Promise.reject(error)
  t.is(typeof execute(bar).then, 'function')
  t.is(typeof (await execute(bar)), 'undefined')

  t.is(
    execute(() => 1),
    1,
  )
  t.is(await execute(async () => 1), 1)
})

test('`ignore` parameter', async (t) => {
  t.is(
    typeof (await execute(async () => {
      throw error
    }, isDummyError)),
    'undefined',
  )
  t.throws(
    () =>
      execute(() => {
        throw new RangeError('Not in range')
      }, isDummyError),
    {
      instanceOf: RangeError,
    },
  )
})

test('wrap', (t) => {
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const foo = () => {
    throw error
  }
  t.is(typeof wrap(() => {}), 'function')
  t.is(typeof wrap(foo)(), 'undefined')
})
