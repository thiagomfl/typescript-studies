// let firstname: string = 'Thiago'
// let age: number = 27
// let adult: boolean = true
// let symbol: symbol = Symbol('whatever')
// let big: bigint = 10n

// Arrays
// const arr: number[] = [1, 2, 3]
// const stingArr: string[] = ['T', 'M']

// Objetos
type Person = {
  name: string,
  age: number,
  adult?: boolean
}

const person: Person = {
  age: 27,
  name: 'Thiago'
}

console.log(person)

// Funções
export function sum(x: number, y: number) {
  return x + y
}

// const sum2: (x: number, y: number) => number

const res = sum(1, 2)
console.log(res)
