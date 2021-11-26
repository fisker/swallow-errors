function wrap(originalFunction, ignore) {
  const handleError = (error) => {
    if (!ignore || ignore(error)) {
      return
    }

    throw error
  }

  return function (...argumentsList) {
    let result
    try {
      result = originalFunction.apply(this, argumentsList)
    } catch (error) {
      handleError(error)
    }

    if (result && result.then) {
      return result.then(undefined, handleError)
    }

    return result
  }
}

const execute = (...arguments_) => wrap(...arguments_)()

export {wrap, execute}
