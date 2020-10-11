# Tipo de dado: any

O TypeScript tem um tipo especial, ***any***, que você pode usar sempre que não quiser que um determinado valor cause erros de verificação de tipo.

Quando um valor é do tipo ***any***, você pode acessar quaisquer propriedades dele (que por sua vez serão do tipo ***any***), chamá-lo como uma função, atribuí-lo a (ou de) um valor de qualquer tipo ou praticamente qualquer outra coisa isso é sintaticamente legal:

```typescript
let obj: any = { x: 0 };

// Nenhuma dessas linhas de código são erros
obj.foo();
obj();
obj.bar = 100;
obj = "hello";
const n: number = obj;
```

O tipo ***any*** é útil quando você não deseja escrever um tipo longo apenas para convencer o TypeScript de que uma determinada linha de código está bem.

Em algumas situações, nem todas as informações de tipo estão disponíveis ou sua declaração exigiria um esforço inadequado. Isso pode ocorrer para valores de código que foi escrito sem TypeScript ou uma biblioteca de terceiros. Nesses casos, podemos desejar cancelar a verificação de tipo. Para fazer isso, rotulamos esses valores com tipo ***any***:

```typescript
declare function getValue(key: string): any;
// OK, o valor de retorno de 'getValue' não foi verificado
const str: string = getValue("myString");
```

O tipo ***any*** é uma maneira poderosa de trabalhar com o JavaScript existente, permitindo que você gradualmente aceite e desative a verificação de tipo durante a compilação.

Ao contrário do tipo ***unknow***, as variáveis do tipo ***any*** permitem que você acesse propriedades arbitrárias, mesmo aquelas que não existem. Essas propriedades incluem funções e o TypeScript não verificará sua existência ou tipo:

```typescript
let looselyTyped: any = 4;
// OK, ifItExists pode existir em tempo de execução
looselyTyped.ifItExists();
// OK, toFixed existe (mas o compilador não verifica)
looselyTyped.toFixed();

let strictlyTyped: unknown = 4;
strictlyTyped.toFixed();
```

> O objeto é do tipo 'unknown'.

O ***any*** continuará a se propagar por meio de seus objetos:

```typescript
let looselyTyped: any = {};
let d = looselyTyped.a.b.c.d;
//  ^ = let d: any
```

Afinal, lembre-se de que toda a comodidade de qualquer um vem com o custo de perder a segurança do tipo. A segurança de tipo é uma das principais motivações para usar o TypeScript e você deve tentar evitar o uso quando não for necessário.

## noImplicitAny

Quando um tipo não é especificado e não pode ser inferido a partir do contexto, o TypeScript normalmente será padronizado como ***any***. Como quaisquer valores não se beneficiam da verificação de tipo, geralmente é desejável evitar essas situações. O sinalizador do compilador ***noImplicitAny*** fará com que qualquer ***any*** implícito seja sinalizado como um erro.
