const obj1: Record<string, string | number> = {
  name: 'Thiago',
  surname: 'Moura',
  age: 27
}
console.log(obj1)

type PersonProtocol = {
  age?: number
  name?: string
  surname?: string
}

type PersonRequired = Required<PersonProtocol>
type PersonPartial = Partial<PersonRequired>
type PersonReadonly = Readonly<PersonRequired>
type PersonPick = Pick<PersonRequired, 'name' | 'surname'>

type ABC = 'A' | 'B' | 'C'
type CDE = 'C' | 'D' | 'E'
type TypeExclude = Exclude<ABC, CDE>
type TypeExtract = Extract<ABC, CDE>

const obj2: PersonRequired | PersonPartial | PersonReadonly = {
  age: 27,
  name: 'Thiago',
  surname: 'Moura'
}
console.log(obj2)

export default 1
