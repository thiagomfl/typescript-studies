type MapStringsCb = (item: string) => string

export function mapStrings(array: string[], cbFn: MapStringsCb): string[] {
  const newArr: string[] = []

  for (let i = 0; i < array.length; i++) {
    const item = array[i]
    newArr.push(cbFn(item))
  }

  return newArr
}

const upperCase = ['a', 'b', 'c']
const upperCaseMapped =
  mapStrings(upperCase, item => item.toUpperCase())

console.log(upperCaseMapped)
