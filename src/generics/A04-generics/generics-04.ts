type GetKeyFN = <O, K extends keyof O>(obj: O, key: K) => O[K]

const getKey: GetKeyFN = (obj, key) => obj[key]
console.log(getKey({
  name: 'Thiago', surname: 'Moura'
}, 'name'))
