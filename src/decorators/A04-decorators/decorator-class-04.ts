type Constructor = new (...args: any[]) => any

function reverseNameColor(param1: string, param2: string) {
  return function <T extends Constructor>(target: T): T {
    return class extends target {
      color: string
      name: string

      constructor(...args: any[]) {
        super(...args)
        this.name = this.reverse(args[0])
        this.color = this.reverse(args[1])
      }

      reverse(value: string) {
        return `${value.split('').reverse().join('')} ${param1} ... ${param2}`
      }
    }
  }
}

function otherDecorator(target: Constructor) {
  console.log('Sou outro decorator')
  return target
}

@otherDecorator
@reverseNameColor('value1', 'value2')
export class Animal {
  constructor(public name: string, public color: string) {}
}

const animal = new Animal('Thiago', 'purple')
console.log(animal)
