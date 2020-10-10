function noReturn(...args: string[]): void {
  console.log(args.join(' '))
}

const person1 = {
  name: 'Priscila',
  surname: 'Finizola',
  showName() {
    console.log(`${this.name} ${this.surname}`)
  }
}

noReturn('Thiago', 'Moura')
person1.showName()
