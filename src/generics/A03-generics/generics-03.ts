interface PersonProtocol<T, U> {
  name: T
  surname: T
  age: U
}

type PersonProtocol2<T = string, U = number> = {
  name: T
  surname: T
  age: U
}

const student: PersonProtocol<string, number> = {
  name: 'Thiago',
  surname: 'Moura',
  age: 27
}

console.log(student)
