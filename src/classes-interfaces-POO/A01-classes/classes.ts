/* eslint-disable no-useless-constructor */
export class Employee {
  constructor(
    public readonly name: string,
    public readonly surname: string
  ) {}
}

export class Company {
  readonly name: string
  private readonly employees: Employee[] = []
  protected readonly cnpj: string

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
}

const company1 = new Company('Accenture', '1111111111111')
const employee1 = new Employee('Thiago', 'Moura')
company1.addEmployee(employee1)
console.log(company1.showEmployees())
