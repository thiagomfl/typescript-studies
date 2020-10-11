# Type Aliases

Os aliases de tipo criam um novo nome para um tipo. Aliases de tipo às vezes são semelhantes a interfaces, mas podem nomear primitivas, uniões, tuplas e quaisquer outros tipos que você teria que escrever à mão.

```typescript
type Second = number;

let timeInSecond: number = 10;
let time: Second = 10;
```

O aliasing não cria um novo tipo - ele cria um novo nome para se referir a esse tipo. Criar apelidos para um primitivo não é muito útil, embora possa ser usado como uma forma de documentação.

Assim como as interfaces, os aliases de tipo também podem ser genéricos - podemos apenas adicionar parâmetros de tipo e usá-los no lado direito da declaração do alias:

```typescript
type Container<T> = { value: T };
```

Também podemos fazer com que um alias de tipo se refira a si mesmo em uma propriedade:

```typescript
type Tree<T> = {
  value: T;
  left?: Tree<T>;
  right?: Tree<T>;
};
```

Juntamente com os tipos de interseção, podemos fazer alguns tipos bem alucinantes:

```typescript
type LinkedList<Type> = Type & { next: LinkedList<Type> };

interface Person {
  name: string;
}

let people = getDriversLicenseQueue();
people.name;
people.next.name;
people.next.next.name;
people.next.next.next.name;
//                  ^ = (property) next: LinkedList
```

## Interfaces vs. Type Aliases

Como mencionamos, os aliases de tipo podem agir como interfaces; no entanto, existem algumas diferenças sutis.

Quase todos os recursos de uma interface estão disponíveis em tipo, a principal diferença é que um tipo não pode ser reaberto para adicionar novas propriedades em vez de uma interface que é sempre extensível.

- Interface:

  ```typescript
  // Estendendo uma interface
  interface Animal {
    name: string
  }

  interface Bear extends Animal {
    honey: boolean
  }

  const bear = getBear()
  bear.name
  bear.honey

  // Adicionando novos campos a uma interface existente
  interface Window {
    title: string
  }

  interface Window {
    ts: import('typescript')
  }

  const src = 'const a = "Hello World"';
  window.ts.transpileModule(src, {});
  ```

- Type

  ```typescript
  // Extensão de um tipo por meio de interseções
  type Animal = {
    name: string
  }

  type Bear = Animal & {
    honey: Boolean
  }

  const bear = getBear();
  bear.name;
  bear.honey;

  // Um tipo não pode ser alterado após ser criado
  type Window = {
    title: string
  }

  type Window = {
    ts: import("typescript")
  }

  // Erro: identificador duplicado 'Window'.
  ```

Como uma interface mapeia mais de perto como o objeto JavaScript funciona ao ser aberta à extensão, recomendamos o uso de uma interface em vez de um alias de tipo, quando possível.

Por outro lado, se você não consegue expressar alguma forma com uma interface e precisa usar um tipo de união ou tupla, os aliases de tipo geralmente são o caminho a percorrer.
