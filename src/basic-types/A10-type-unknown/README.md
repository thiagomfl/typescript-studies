# Tipo de dado: unknown

Podemos precisar descrever o tipo de variáveis que não sabemos quando estamos escrevendo um aplicativo. Esses valores podem vir de conteúdo dinâmico - por exemplo, do usuário - ou podemos aceitar intencionalmente todos os valores em nossa API. Nesses casos, queremos fornecer um tipo que diga ao compilador e aos leitores futuros que essa variável pode ser qualquer coisa, então damos a ela o tipo ***unknown***.

```typescript
let notSure: unknown = 4;
notSure = 'maybe a string instead';

// OK, definitivamente um booleano
notSure = false;
```

Se você tiver uma variável com um tipo ***unknown***, você pode restringi-la a algo mais específico fazendo verificações de tipo, verificações de comparação ou proteções de tipo mais avançadas:

```typescript
declare const maybe: unknown;
// 'maybe' pode ser uma string, object, boolean, undefined ou outros tipos
const aNumber: number = maybe;
// tipo 'unknown' não é atribuível ao tipo 'number'.

if (maybe === true) {
  // TypeScript sabe que maybe seja um boolean agora
  const aBoolean: boolean = maybe;
  // Então, não pode ser uma string
  const aString: string = maybe;
  // O tipo 'boolean' não pode ser atribuído ao tipo 'string'.
}

if (typeof maybe === "string") {
  // TypeScript sabe que maybe é uma string
  const aString: string = maybe;
  // Então, não pode ser um boolean
  const aBoolean: boolean = maybe;
  // O tipo 'string' não pode ser atribuído ao tipo 'boolean'.
}
```

O tipo ***unknown*** representa qualquer valor. Isso é semelhante ao tipo ***any***, mas é mais seguro porque não é legal fazer nada com um valor ***unknown***:

``` typescript
function f1(a: any) {
  a.b(); // OK
}

function f2(a: unknown) {
  a.b();
  // O objeto é do tipo 'unknown'.
}
```

Isso é útil ao descrever tipos de função porque você pode descrever funções que aceitam qualquer valor sem ter nenhum valor no corpo da função.

Por outro lado, você pode descrever uma função que retorna um valor de tipo ***unknown***:

``` typescript
function safeParse(s: string): unknown {
  return JSON.parse(s);
}

// Precisa ter cuidado com 'obj'!
const obj = safeParse(someRandomString);
```