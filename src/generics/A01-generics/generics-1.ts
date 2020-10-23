type FilterCallback<U> = {
  (value: U, index?: number, array?: U): boolean
}

export function myFilter<T>(array: T[], callbackfn: FilterCallback<T>) {
  const newArr = []

  for (let i = 0; i < array.length; i++) {
    if (callbackfn(array[i])) newArr.push(array[i])
  }

  return newArr
}

const arr = ['1', 2, 3, 4, 5, 8, 79]

const originalFilter = arr.filter(val => val < 5)
console.log(originalFilter)

const myFilterDeclared = myFilter(arr, value => value < 5)

console.log(myFilterDeclared)