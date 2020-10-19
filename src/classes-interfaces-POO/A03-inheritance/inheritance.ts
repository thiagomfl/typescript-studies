export class Person {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    public name: string,
    public surname: string,
    private age: number,
    protected cpf: string
  ) {}

  getAge() {
    return this.age
  }

  getCpf() {
    return this.cpf
  }

  getFullname() {
    return `${this.name} ${this.surname}`
  }
}

export class Student extends Person {
  getFullname() {
    return `This comes from student ${this.name} ${this.surname}`
  }
}

export class Client extends Person {
  getFullname() {
    return `This comes from client ${this.name} ${this.surname}`
  }
}

const person = new Person('Thiago', 'Moura', 27, '000.000.000-00')
const client = new Student('Thiago', 'Moura', 27, '000.000.000-00')
const student = new Student('Thiago', 'Moura', 27, '000.000.000-00')

console.log(person.getFullname())
console.log(client.getFullname())
console.log(student.getFullname())
