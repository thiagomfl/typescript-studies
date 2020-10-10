type Age = number
type PersonAlias = {
  name: string;
  age: Age,
  salary: number,
  preferColor?: string
}

type RGBColor = 'Red' | 'Green' | 'Blue'
type MYKColor = 'Cyan' | 'Magenta' | 'Yellow' | 'Black'
type PreferColor = RGBColor | MYKColor

const person: PersonAlias = {
  age: 27,
  name: 'Thiago',
  salary: 3300
}

export function setPreferColor(person: PersonAlias, color: PreferColor): PersonAlias {
  return {
    ...person, preferColor: color
  }
}

console.log(setPreferColor(person, 'Green'))
