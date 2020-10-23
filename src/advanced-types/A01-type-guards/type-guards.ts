export function sum(a: unknown, b: unknown) {
  return (typeof a === 'number' && typeof b === 'number') ? a + b : `${a}${b}`
}

console.log(sum(1, 5))
console.log(sum('s', 'w'))

type Person = { name: string }
type Animal = { color: string }
type PersonOrAnimal = Person | Animal

export class Student implements Person {
  constructor(public name: string) {}
}

function showName(obj: PersonOrAnimal) {
  if ('name' in obj) console.log(obj.name)
  if (obj instanceof Student) console.log(obj.name)
}

showName(new Student('Thiago'))
