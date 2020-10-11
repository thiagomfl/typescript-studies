# Tipo de dado: array

TypeScript, como JavaScript, permite que você trabalhe com arrays de valores. Os tipos de array podem ser escritos de duas maneiras. No primeiro, você usa o tipo dos elementos seguido por [] para denotar um array desse tipo de elemento:

```typescript
let list: number[] = [1, 2, 3];
```

A segunda maneira usa um tipo de array genérico, `Array <elemType>`:

```typescript
let list: Array<number> = [1, 2, 3];
```

Para especificar o tipo de um array como [1, 2, 3], você pode usar a sintaxe `number[]`; essa sintaxe funciona para qualquer tipo (por exemplo, `string[]` é um array de strings e assim por diante). Você também pode ver isso escrito como `Array<number>`, o que significa a mesma coisa. Existe também a sintaxe `T<U>` ao abordar `generics`.
