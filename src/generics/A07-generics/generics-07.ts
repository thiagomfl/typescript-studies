export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

export function sum<T>(...args: T[]) {
  const res = args.reduce((acc, value) => {
    if (isNumber(acc) && isNumber(value)) {
      return acc + value
    }

    return acc
  }, 0)

  return res
}

console.log(sum(1, 2, 3))
console.log(sum('1', '2', '3'))
console.log(sum(...[1, 2, 3, 'a', 'b', 'c']))
