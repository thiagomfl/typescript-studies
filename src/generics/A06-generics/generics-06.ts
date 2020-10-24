function joinObj<T, U>(obj1: T, obj2: U) {
  // return { ...obj1, ...obj2 }
  return Object.assign({}, obj1, obj2)
}

const obj1 = { key: 'value1' }
const obj2 = { key: 'value2' }
const union = joinObj(obj1, obj2)
console.log(union)
