type Auto = {
  brand: string,
  year: string
}

type Car = {
  ano: string,
  nome: Auto['year'],
  marca: Auto['brand'],
}

const car: Car = {
  nome: 'Ka',
  ano: '2020',
  marca: 'Ford'
}

console.log(car)
