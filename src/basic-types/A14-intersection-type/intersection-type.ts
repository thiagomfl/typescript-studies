type HasName = { name: string }
type HasSurname = { surname: string }
type HasAge = { age: number }

type Person = HasName & HasSurname & HasAge

const person: Person = {
  age: 27,
  name: 'Thiago',
  surname: 'Moura'
}

console.log(person)
