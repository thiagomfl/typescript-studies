type Adder = {
  (x: number): number,
  (...arg: number[]): number,
  (x: number, y: number): number,
}

const adder: Adder = (x: number, y?: number, ...args: number[]) => {
  if (args.length > 0) {
    return args.reduce((acc, value) => acc + value, 0) + x + (y || 0)
  }

  return x + (y || 0)
}

console.log(adder(1))
