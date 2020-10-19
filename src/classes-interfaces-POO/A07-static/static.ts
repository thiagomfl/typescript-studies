export class Person {
  static cpfStandard = '000.000.000-00'

  // eslint-disable-next-line no-useless-constructor
  constructor(
    public cpf: string,
    public name: string,
    public surname: string
  ) { }

  regularMethod() {
    console.log(Person.cpfStandard)
  }

  static createPerson(name: string, surname: string): Person {
    return new Person(name, surname, Person.cpfStandard)
  }
}

const person1 = new Person('Thiago', 'Moura', '069.801.744-79')
const person2 = Person.createPerson('Thiago', 'Moura')

console.log(person1)
console.log(person2)
