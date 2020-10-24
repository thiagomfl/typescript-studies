function Decorator(
  classPrototype: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  console.log(classPrototype)
  console.log(methodName)
  console.log(descriptor)
}

export class Person {
  age: number
  name: string
  surname: string

  constructor(age: number, name: string, surname: string) {
    this.age = age
    this.name = name
    this.surname = surname
  }

  @Decorator
  method(txt: string) {
    return `${this.name} ${this.surname}: ${txt}`
  }

  get fullname() {
    return `${this.name} ${this.surname}`
  }

  set fullname(value: string) {
    const words = value.split(/\s+/g)
    const firstName = words.shift()

    if (!firstName) return

    this.name = firstName
    this.surname = words.join(' ')
  }
}
