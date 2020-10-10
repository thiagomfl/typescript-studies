let x
if (typeof x === 'undefined') x = 20
console.log(x)

interface Person {
  firstname: string;
  surname?: string
}

export function createPerson(firstname: string, surname?: string): Person {
  return {
    firstname,
    surname
  }
}

export function squareOf(x: any) {
  if (typeof x === 'number') return x * x

  return null
}
