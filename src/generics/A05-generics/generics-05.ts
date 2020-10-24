export class Person<T, U> {
  constructor(name: T, age: U) {}
}

const person1 = new Person('Thiago', 27)

export class Stack<T> {
  private counter = 0
  private elements: {[k: number]: T} = {}

  push(element: T) {
    this.elements[this.counter] = element
    this.counter++
  }

  pop() {
    if (this.isEmpty()) return undefined

    this.counter--
    const el = this.elements[this.counter]
    delete this.elements[this.counter]
    return el
  }

  isEmpty() {
    return this.counter === 0
  }

  length() {
    return this.counter
  }

  peek() {
    for (const key in this.elements) {
      console.log(this.elements[key])
    }
  }
}

const stack = new Stack<number>()
