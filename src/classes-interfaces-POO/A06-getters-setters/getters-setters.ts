export class Person {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private _cpf: string,
    private name: string,
    private surname: string
  ) {
    this.cpf = _cpf
  }

  get cpf() {
    console.log('Setter Chamado')
    return this._cpf.replace(/\D/g, '')
  }

  set cpf(value: string) {
    console.log('Getter Chamado')
    this._cpf = value
  }
}

const person = new Person('Thiago', 'Moura', '069.801.744-79')
person.cpf = ('069.801.744-00')
console.log(person.cpf)
