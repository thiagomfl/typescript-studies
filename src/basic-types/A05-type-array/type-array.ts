// Array<T> - T[]
export function multiplyArgs(...args: Array<number>) {
  return args.reduce((acc, value) => acc * value, 1)
}

export function stringConcat(...args: string[]) {
  return args.reduce((acc, value) => acc + value)
}

export function upperCase(...args: string[]) {
  return args.map(el => el.toUpperCase())
}

console.log(multiplyArgs(1, 2, 3, 4, 5))
console.log(upperCase('t', 'h', 'i', 'a', 't'))
console.log(stringConcat('1', '2', '3', '4', '5'))
