/* eslint-disable no-useless-constructor */
export class Employee {
  constructor(
    public readonly name: string,
    public readonly surname: string
  ) {}
}

export class Company {
  readonly name: string
  private readonly cnpj: string
  protected readonly employees: Employee[] = []

  constructor(name: string, cnpj: string) {
    this.name = name
    this.cnpj = cnpj
  }

  addEmployee(employee: Employee) {
    this.employees.push(employee)
  }

  showEmployees() {
    for (const employee of this.employees) {
      console.log(employee)
    }
  }

  // Redundante o atributo ja é acessado direto
  // public getNome() {
  //  return this.name
  // }
}

export class Udemy extends Company {
  constructor() {
    super('Accenture', '1111111111111')
  }

  popEmploy(): Employee | null {
    const employee = this.employees.pop()
    if (employee) return employee
    return null
  }
}

const company1 = new Udemy()
const employee1 = new Employee('Thiago', 'Moura')
company1.addEmployee(employee1)
company1.popEmploy()
console.log(company1.showEmployees())
