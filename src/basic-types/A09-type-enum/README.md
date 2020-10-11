# Tipo de dado: enum

Enums são um dos poucos recursos do TypeScript que não são uma extensão de nível de tipo de JavaScript.

Enums permitem que um desenvolvedor defina um conjunto de constantes nomeadas. O uso de enums pode tornar mais fácil documentar a intenção ou criar um conjunto de casos distintos. TypeScript fornece enums numéricos e baseados em string.

## Enums numéricos

Começaremos primeiro com enums numéricos, que provavelmente são mais familiares se você estiver vindo de outras linguagens. Um enum pode ser definido usando a palavra-chave enum.

```typescript
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}
```

Acima, temos um enum numérico onde Up é inicializado com 1. Todos os membros a seguir são incrementados automaticamente a partir desse ponto. Em outras palavras, Direction.Up tem o valor 1, Down tem 2, Left tem 3 e Right tem 4.

Se quiséssemos, poderíamos deixar totalmente de fora os inicializadores:

```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right
}
```

Aqui, Up teria o valor 0, Down teria 1, etc. Este comportamento de incremento automático é útil para casos em que podemos não nos preocupar com os valores dos membros em si, mas nos importamos que cada valor seja distinto de outros valores no mesmo enum.

Usar um enum é simples: basta acessar qualquer membro como uma propriedade fora do próprio enum e declarar os tipos usando o nome do enum:

```typescript
enum UserResponse {
  No = 0,
  Yes = 1
}

function respond(recipient: string, message: UserResponse): void {
  // ...
}

respond("Princess Caroline", UserResponse.Yes);
```

Enums numéricos podem ser misturados em membros computados e constantes. Resumindo, enums sem inicializadores precisam ser os primeiros ou vir depois de enums numéricos inicializados com constantes numéricas ou outros membros de enum constantes. Em outras palavras, o seguinte não é permitido:

```typescript
enum E {
  A = getSomeValue(),
  B
}
```

> O membro Enum deve ter um inicializador.

## String enums

Enums de string são um conceito semelhante, mas têm algumas diferenças sutis de tempo de execução. Em um string enum, cada membro deve ser inicializado com uma constante com um string literal ou com outro membro string enum.

```typescript
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}
```

Embora os enums de string não tenham comportamento de incremento automático, os enums de string têm a vantagem de "serializar" bem. Em outras palavras, se você estivesse depurando e tivesse que ler o valor de tempo de execução de um enum numérico, o valor é frequentemente opaco - ele não transmite nenhum significado útil por si só (embora o mapeamento reverso possa ajudar frequentemente), enums de string fornecem um valor significativo e legível quando seu código é executado, independente do nome do próprio membro enum.

Tecnicamente, enums podem ser misturados com strings e membros numéricos, mas não está claro por que você gostaria de fazer isso:

```typescript
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES"
}
```

A menos que você realmente esteja tentando tirar proveito do comportamento de tempo de execução do JavaScript de uma maneira inteligente, é aconselhável que você não faça isso.

## Membros computados e constantes

Cada membro enum tem um valor associado a ele, que pode ser constante ou calculado. Um membro enum é considerado constante se:

- É o primeiro membro no enum e não tem inicializador, caso em que é atribuído o valor 0:

```typescript
// E.X is constant:
enum E { X }
```

- Ele não tem um inicializador e o membro de enum anterior era uma constante numérica. Nesse caso, o valor do membro enum atual será o valor do membro enum anterior mais um.

```typescript
// Todos os membros do enum em 'E1' e 'E2' são constantes.
enum E1 { X, Y, Z }

enum E2 { A = 1, B, C }
```

- O membro enum é inicializado com uma expressão enum constante. Uma expressão enum constante é um subconjunto de expressões TypeScript que podem ser totalmente avaliadas em tempo de compilação. Uma expressão é uma expressão enum constante se for:

  1) uma expressão enum literal (basicamente um literal de string ou um literal numérico)
  2) uma referência a um membro enum constante definido anteriormente (que pode se originar de um enum diferente)
  3) uma expressão enum constante entre parênteses
  4) um dos operadores ***`+`***, ***`-`***, ***`~`*** unários aplicados à expressão enum constante
  5) ***`+`***, ***`-`***, ***`*`***, ***`/`***, ***`%`***, ***`<<`***, ***`>>`***, ***`>>>`***, ***`&`***, ***`|`***, ***`^`*** operadores binários com expressões enum constantes como operandos.

  É um erro de tempo de compilação para expressões enum constantes a serem avaliadas para ***NaN*** ou ***Infinity***.

Em todos os outros casos, o membro enum é considerado calculado.

```typescript
enum FileAccess {
  // membros constantes
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  // membro computado
  G = "123".length
}
```

## Enums de união e tipos de membro de enum

Há um subconjunto especial de membros enum constantes que não são calculados: membros enum literais. Um membro enum literal é um membro enum constante sem valor inicializado ou com valores que são inicializados para:

- qualquer string literal (por exemplo, "foo", "bar," baz ")
- qualquer literal numérico (por exemplo, 1, 100)
- um negativo unário aplicado a qualquer literal numérico (por exemplo, -1, -100)

Quando todos os membros em um enum têm valores enum literais, algumas semânticas especiais entram em cena.

A primeira é que os membros enum também se tornam tipos! Por exemplo, podemos dizer que certos membros podem ter apenas o valor de um membro enum:

```typescript
enum ShapeKind {
  Circle,
  Square
}

interface Circle {
  kind: ShapeKind.Circle;
  radius: number;
}

interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}

let c: Circle = {
  kind: ShapeKind.Square, // Erro o tipo 'ShapeKind.Square' não pode ser atribuído ao tipo 'ShapeKind.Circle'.
  radius: 100
};
```

A outra mudança é que os próprios tipos de enum tornam-se efetivamente uma união de cada membro de enum. Com os enums de união, o sistema de tipos pode aproveitar o fato de saber o conjunto exato de valores que existem no próprio enum. Por causa disso, o TypeScript pode detectar bugs nos quais podemos estar comparando valores incorretamente. Por exemplo:

```typescript
enum E {
  Foo,
  Bar
}

function f(x: E) {
  if (x !== E.Foo || x !== E.Bar) { // Essa condição sempre retornará 'true', pois os tipos 'E.Foo' e 'E.Bar' não têm sobreposição.
    // ...
  }
}
```

Nesse exemplo, primeiro verificamos se x não era E.Foo. Se essa verificação for bem-sucedida, então nosso `||` entrará em curto-circuito e o corpo do `if` funcionará. No entanto, se a verificação não foi bem-sucedida, então x só pode ser E.Foo, então não faz sentido ver se é igual a E.Bar.

## Enums em tempo de execução

Enums são objetos reais que existem em tempo de execução. Por exemplo, o seguinte enum

```typescript
enum E { X, Y, Z }
```

pode realmente ser passado para funções

```typescript
enum E {
  X,
  Y,
  Z
}

function f(obj: { X: number }) {
  return obj.X;
}

// Funciona, pois 'E' tem uma propriedade chamada 'X' que é um número.
f(E);
```

## Enums em tempo de compilação

Mesmo que Enums sejam objetos reais que existem em tempo de execução, a palavra-chave ***`keyof`*** funciona de maneira diferente do que você pode esperar para objetos típicos. Em vez disso, use ***`keyof typeof`*** para obter um tipo que representa todas as chaves Enum como strings.

```typescript
enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG
}

// Isso é equivalente a: type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
type LogLevelStrings = keyof typeof LogLevel;

function printImportant(key: LogLevelStrings, message: string) {
  const num = LogLevel[key];

  if (num <= LogLevel.WARN) {
    console.log('Log level key is:', key);
    console.log('Log level value is:', num);
    console.log('Log level message is:', message);
  }
}

printImportant('ERROR', 'This is a message');
```

### Mapeamentos reversos

Além de criar um objeto com nomes de propriedade para membros, os membros de enums numéricos também obtêm um mapeamento reverso de valores de enum para nomes de enum. Por exemplo:

```typescript
enum Enum { A }

let a = Enum.A;
let nameOfA = Enum[a]; // "A"
```
O TypeScript compila isso no seguinte JavaScript:

```typescript
"use strict";
var Enum;
(function (Enum) {
    Enum[Enum['A'] = 0] = 'A';
})(Enum || (Enum = {}));

let a = Enum.A;
let nameOfA = Enum[a]; // "A"
```

Nesse código gerado, um enum é compilado em um objeto que armazena mapeamentos de encaminhamento (nome -> valor) e reversos (valor -> nome). As referências a outros membros enum são sempre emitidas como acessos de propriedade e nunca embutidos.

Lembre-se de que os membros da string enum não recebem um mapeamento reverso gerado.

### const enums

Na maioria dos casos, enums são uma solução perfeitamente válida. No entanto, às vezes os requisitos são mais restritos. Para evitar o custo de código extra gerado e indireção adicional ao acessar valores enum, é possível usar enums const. Enums Const são definidos usando o modificador const em nossos enums:

```typescript

```

```typescript
const enum Enum {
  A = 1,
  B = A * 2
}
```
Os enums constantes só podem usar expressões enum constantes e, ao contrário dos enums regulares, são completamente removidos durante a compilação. Os membros do Const enum são incluídos nos sites de uso. Isso é possível porque enums constantes não podem ter membros computados.

```typescript
const enum Direction {
  Up,
  Down,
  Left,
  Right
}

let directions = [
  Direction.Up,
  Direction.Down,
  Direction.Left,
  Direction.Right
];
```

no código gerado se tornará:

```typescript
"use strict";
let directions = [
  0 /* Up */,
  1 /* Down */,
  2 /* Left */,
  3 /* Right */
];
```

## Enums ambientais

Enums de ambiente são usados para descrever a forma de tipos de enum já existentes.

```typescript
declare enum Enum {
  A = 1,
  B,
  C = 2
}
```
Uma diferença importante entre enums ambientes e não ambientes é que, em enums regulares, os membros que não têm um inicializador serão considerados constantes se seu membro de enum anterior for considerado constante. Em contraste, um membro de enum ambiente (e não const) que não tem o inicializador é sempre considerado computado.
