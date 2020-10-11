# Function Types

As interfaces são capazes de descrever a ampla gama de formas que os objetos JavaScript podem assumir. Além de descrever um objeto com propriedades, as interfaces também são capazes de descrever tipos de funções.

Para descrever um tipo de função com uma interface, damos à interface uma assinatura de chamada. É como uma declaração de função com apenas a lista de parâmetros e o tipo de retorno fornecidos. Cada parâmetro na lista de parâmetros requer nome e tipo.

```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}
```

Uma vez definida, podemos usar essa interface de tipo de função como faríamos com outras interfaces. Aqui, mostramos como você pode criar uma variável de um tipo de função e atribuir a ela um valor de função do mesmo tipo.

```typescript
let mySearch: SearchFunc;

mySearch = function (source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
};
```

Para que os tipos de função digitem corretamente a verificação, os nomes dos parâmetros não precisam corresponder. Poderíamos ter, por exemplo, escrito o exemplo acima assim:

```typescript
let mySearch: SearchFunc;

mySearch = function (src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
};
```

Os parâmetros da função são verificados um de cada vez, com o tipo em cada posição de parâmetro correspondente verificada entre si. Se você não quiser especificar os tipos de forma alguma, a digitação contextual do TypeScript pode inferir os tipos de argumento, uma vez que o valor da função é atribuído diretamente a uma variável do tipo ***`SearchFunc`***. Aqui, também, o tipo de retorno de nossa expressão de função está implícito nos valores que ela retorna (aqui ***`false`*** e ***`true`***).

```typescript
let mySearch: SearchFunc;

mySearch = function (src, sub) {
  let result = src.search(sub);
  return result > -1;
};
```

Se a expressão da função retornasse números ou strings, o verificador de tipo teria cometido um erro que indica que o tipo de retorno não corresponde ao tipo de retorno descrito na interface ***`SearchFunc`***.

```typescript
let mySearch: SearchFunc;

mySearch = function (src, sub) {
Type '(src: string, sub: string) => string' is not assignable to type 'SearchFunc'.
  Type 'string' is not assignable to type 'boolean'.
  let result = src.search(sub);
  return "string";
};
```
