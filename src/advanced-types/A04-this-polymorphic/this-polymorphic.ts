export class Calc {
  constructor(public number: number) { }

  add(a: number): this {
    this.number += a
    return this
  }

  sub(a: number): this {
    this.number -= a
    return this
  }

  mul(a: number): this {
    this.number *= a
    return this
  }

  div(a: number): this {
    this.number /= a
    return this
  }
}

export class SubCalc extends Calc {
  pow(a: number): this {
    this.number **= a
    return this
  }
}

const calc = new Calc(10)
calc.add(5).mul(2)

console.log(calc)

// Builder
export class ReqBuilder {
  private method: 'get' | 'post' | null = null
  private url: string | null = null

  setMethod(method: 'get' | 'post'): this {
    this.method = method
    return this
  }

  setUrl(url: string): this {
    this.url = url
    return this
  }

  send() {
    console.log(`Sending data via ${this.method} to ${this.url}`)
  }
}

const req = new ReqBuilder()
req.setUrl('https://www.google.com/').setMethod('get').send()
