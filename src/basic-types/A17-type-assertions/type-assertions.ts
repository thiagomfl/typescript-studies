// Conditional assertion
const conditionalAssertion = document.querySelector('body')
if (conditionalAssertion) {
  conditionalAssertion.style.background = 'red'
}
console.log(conditionalAssertion)

// Non Null assertion (!)
const nonNullAssertion = document.querySelector('body')!
nonNullAssertion.style.background = 'red'
console.log(nonNullAssertion)

// Type assertion
const typeAssertion = document.querySelector('body') as HTMLBodyElement
typeAssertion.style.background = 'red'
console.log(typeAssertion)

// HTML Element
const inputEl = document.querySelector('.input') as HTMLInputElement
inputEl.value = 'Some value'
inputEl.focus()

// type coercion
const coercion =
  (document.querySelector('body') as unknown) as number
console.log(coercion)
