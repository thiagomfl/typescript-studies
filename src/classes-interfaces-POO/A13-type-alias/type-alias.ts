type TypePerson = {
  name: string
  surname: string
  fullname(): string
}

export class Person implements TypePerson {
  constructor(public name: string, public surname: string) { }

  fullname() {
    return `${this.name} ${this.surname}`
  }
}

const person = new Person('Thiago', 'Moura')
console.log(person.fullname())
