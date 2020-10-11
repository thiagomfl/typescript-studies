# Tipo de dado: Null and Undefined

No TypeScript, undefined e null realmente têm seus tipos denominados undefined e null, respectivamente. Assim como o vazio, eles não são extremamente úteis por conta própria:

```typescript
// Não podemos atribuir muito mais a essas variáveis!
let u: undefined = undefined;
let n: null = null;
```

Por padrão, ***null*** e ***undefined*** são subtipos de todos os outros tipos. Isso significa que você pode atribuir ***null*** e ***undefined*** a algo como um número.

No entanto, ao usar o sinalizador ***--strictNullChecks***, ***null e undefined*** só podem ser atribuídos a ***unknow***, qualquer um e seus respectivos tipos (a única exceção sendo que ***undefined*** também pode ser atribuído a ***void***). Isso ajuda a evitar muitos erros comuns. Nos casos em que você deseja passar uma ***string*** ou ***null*** ou ***undefined***, você pode usar o tipo de união ***string | null | undefined***.

Os tipos de união são um tópico avançado que abordaremos em um capítulo posterior.

> Como observação: encorajamos o uso de ***--strictNullChecks*** quando possível.

JavaScript tem dois valores primitivos, ***null*** e ***undefined***, ambos usados para sinalizar valores ausentes ou não inicializados.

TypeScript possui dois tipos correspondentes com os mesmos nomes. Como esses tipos se comportam depende se você tem a opção ***strictNullChecks*** ativada.

## strictNullChecks off

Com ***strictNullChecks*** desativado, os valores que podem ser ***null*** ou ***undefined***, ainda podem ser acessados normalmente, e os valores ***null*** e ***undefined***, podem ser atribuídos a uma propriedade de qualquer tipo. Isso é semelhante a como as linguagens sem verificações de null (por exemplo, C #, Java) se comportam. A falta de verificação desses valores tende a ser a principal fonte de bugs; Sempre recomendamos que as pessoas ativem ***strictNullChecks*** se for prático fazê-lo em sua base de código.

## strictNullChecks on

Com ***strictNullChecks*** ativado, quando um valor for ***null*** ou ***undefined***, você precisará testar esses valores antes de usar métodos ou propriedades nesse valor. Assim como verificar se há undefined antes de usar uma propriedade opcional, podemos usar o estreitamento para verificar se há valores que podem ser nulos:

```typescript
function doSomething(x: string | null) {
  if (x === null) {
    // faz algo...
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}
```

## Operador de asserção não nula

O TypeScript também tem uma sintaxe especial para remover ***null*** e ***undefined*** de um tipo sem fazer nenhuma verificação explícita. Escrita ***`!`*** depois que qualquer expressão é efetivamente uma afirmação de tipo de que o valor não é ***null*** ou ***undefined***:

```typescript
function liveDangerously(x?: number | null) {
  // Sem erro
  console.log(x!.toFixed());
}
```
