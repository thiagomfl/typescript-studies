# Decorators

Com a introdução de Classes no TypeScript e ES6, agora existem certos cenários que requerem recursos adicionais para dar suporte à anotação ou modificação de classes e membros da classe. Decorators fornecem uma maneira de adicionar anotações e uma sintaxe de metaprogramação para declarações de classe e membros. Decorators são uma *proposta de estágio 2* para JavaScript e estão disponíveis como um recurso experimental do TypeScript.

>Decorators são um recurso experimental que pode mudar em versões futuras.

Para habilitar o suporte experimental para decorators, você deve habilitar a opção de compilador `experimentalDecorators` na linha de comando ou em seu `tsconfig.json`:

**Linha de comando:**
```sh
tsc --target ES5 --experimentalDecorators
```

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true
  }
}
```

Um Decorator é um tipo especial de declaração que pode ser anexado a uma ***declaração de classe***, ***método***, ***acessador***, ***propriedade*** ou ***parâmetro***. Os decoradores usam a forma `@expression`, onde a expressão deve ser avaliada como uma função que será chamada em tempo de execução com informações sobre a declaração decorada.

Por exemplo, dado o decorator `@sealed`, podemos escrever a função selada da seguinte maneira:

```typescript
function sealed(target) {
  // faz algo com 'target' ...
}
```

>Você pode ver um exemplo mais detalhado de um decorador em Class Decorators, abaixo.

## Decorator Factories

Se quisermos personalizar como um decorator é aplicado a uma declaração, podemos escrever uma fábrica de decorators. Um Decorator Factory é simplesmente uma função que retorna a expressão que será chamada pelo decorador em tempo de execução.

Podemos escrever uma fábrica de decoradores da seguinte maneira:

```typescript
function color(value: string) {
  // esta é a fábrica de decoradores
  return function (target) {
    // este é o decorador
    // faça algo com 'target' e 'value' ...
  };
}
```

> Você pode ver um exemplo mais detalhado de uma fábrica de decoradores em Method Decorators, abaixo.

## Decorator Composition

Vários decorators podem ser aplicados a uma declaração, como nos exemplos a seguir:

- Em uma única linha:
  ```typescript
  @f @g x
  ```

- Em várias linhas:
  ```typescript
  @f
  @g
  x
  ```

Quando vários decorators se aplicam a uma única declaração, sua avaliação é semelhante à ***composição de funções em matemática***. Neste modelo, ao compor as funções `f` e `g`, o composto resultante `(f ∘ g)(x)` é equivalente a `f(g(x))`.

Assim, as etapas a seguir são executadas ao avaliar vários decoradores em uma única declaração no TypeScript:

1. As expressões para cada decorator são avaliadas de cima para baixo.
2. Os resultados são então chamados de funções de baixo para cima.

Se fôssemos usar fábricas de decoradores, podemos observar esta ordem de avaliação com o seguinte exemplo:

```typescript
function f() {
  console.log('f(): evaluated');

  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('f(): called');
  };
}

function g() {
  console.log('g(): evaluated');

  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('g(): called');
  };
}

class C {
  @f()
  @g()
  method() {}
}
```

Que imprimiria esta saída no console:

```typescript
f(): evaluated
g(): evaluated
g(): called
f(): called
```

## Decorator Evaluation

Há uma ordem bem definida para como os decorators aplicados a várias declarações dentro de uma classe são aplicados:

1. Os ***decoradores de parâmetro***, seguidos de ***método***, ***acessador*** ou ***decoradores de propriedade***, são aplicados a cada membro da instância.
2. Os ***decoradores de parâmetro***, seguidos de ***método***, ***acessador*** ou ***decoradores de propriedade***, são aplicados a cada membro estático.
3. ***Decoradores de parâmetro*** são aplicados ao construtor.
4. ***Decoradores de classes*** são aplicados nas classes.

## Class Decorators

Um decorador de classe é declarado antes de uma declaração de classe. O decorador de classe é aplicado ao construtor da classe e pode ser usado para observar, modificar ou substituir uma definição de classe. Um decorador de classe não pode ser usado em um arquivo de declaração ou em qualquer outro contexto de ambiente (como em uma classe de declaração).

A expressão para o decorador de classe será chamada como uma função em tempo de execução, com o construtor da classe decorada como seu único argumento.

Se o decorador da classe retornar um valor, ele substituirá a declaração da classe pela função construtora fornecida.

> Se você decidir retornar uma nova função de construtor, deve tomar cuidado para manter o protótipo original. A lógica que aplica decoradores em tempo de execução não fará isso para você.

A seguir está um exemplo de um decorador de classe (`@sealed`) aplicado à classe `Greeter`:

```typescript
@sealed
class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    return `Hello, ${this.greeting}`;
  }
}
```

Podemos definir o decorador `@sealed` usando a seguinte declaração de função:

```typescript
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}
```

Quando `@sealed` for executado, ele selará o construtor e seu protótipo.

A seguir, temos um exemplo de como substituir o construtor.

```typescript
function classDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    newProperty = 'new property';
    hello = 'override';
  };
}

@classDecorator
class Greeter {
  property = 'property';
  hello: string;

  constructor(m: string) {
    this.hello = m;
  }
}

console.log(new Greeter('world'));
```

## Method Decorators

Um Decorador de Método é declarado antes de uma declaração de método. O decorador é aplicado ao Descritor de Propriedade para o método e pode ser usado para observar, modificar ou substituir uma definição de método. Um decorador de método não pode ser usado em um arquivo de declaração, em uma sobrecarga ou em qualquer outro contexto de ambiente (como em uma classe de declaração).

A expressão para o decorador do método será chamada como uma função em tempo de execução, com os três argumentos a seguir:

1. A função construtora da classe para um membro estático ou o protótipo da classe para um membro de instância.
2. O nome do membro.
3. O *descritor de propriedade* do membro.

> O descritor de propriedade será `undefined` se o destino do script for menor que `ES5`.

Se o decorador do método retornar um valor, ele será usado como o descritor de propriedade do método.

> O valor de retorno será ignorado se o destino do script for menor que `ES5`.

A seguir está um exemplo de um decorador de método (`@enumerable`) aplicado a um método na classe `Greeter`:

```typescript
class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  @enumerable(false)
  greet() {
    return `Hello, ${this.greeting}`;
  }
}
```

Podemos definir o decorador `@enumerable` usando a seguinte declaração de função:

```typescript
function enumerable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = value;
  };
}
```

O decorador `@enumerable(false)` aqui é uma ***fábrica de decoradores***. Quando o decorador `@enumerable(false)` é chamado, ele modifica a propriedade `enumerable` do descritor de propriedade.

## Accessor Decorators

Um decorador de acessor é declarado antes de uma declaração de acessador. O decorador do acessador é aplicado ao Descritor de Propriedade para o acessador e pode ser usado para observar, modificar ou substituir as definições de um acessador. Um decorador de acesso não pode ser usado em um arquivo de declaração ou em qualquer outro contexto de ambiente (como em uma classe de declaração).

> O TypeScript não permite a decoração do acessador `get` e `set` para um único membro. Em vez disso, todos os decoradores do membro devem ser aplicados ao primeiro acessador especificado na ordem do documento. Isso ocorre porque os decoradores se aplicam a um Descritor de Propriedade, que combina o acessador `get` e `set`, não a cada declaração separadamente.

A expressão para o decorador do acessador será chamada como uma função em tempo de execução, com os três seguintes argumentos:

1. A função construtora da classe para um membro estático ou o protótipo da classe para um membro de instância.
2. O nome do membro.
3. O descritor de propriedade do membro.

> O descritor de propriedade será `undefined` se o destino do script for menor que `ES5`.

Se o decorador do acessador retornar um valor, ele será usado como o Descritor de Propriedade para o membro.

> O valor de retorno será ignorado se o destino do script for menor que `ES5`.

A seguir está um exemplo de um decorador acessador (`@configurable`) aplicado a um membro da classe `Point`:

```typescript
class Point {
  private _x: number;
  private _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  @configurable(false)
  get x() {
    return this._x;
  }

  @configurable(false)
  get y() {
    return this._y;
  }
}
```

Podemos definir o decorador `@configurable` usando a seguinte declaração de função:

```typescript
function configurable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.configurable = value;
  };
}
```

## Property Decorators

Um decorador de propriedade é declarado antes de uma declaração de propriedade. Um decorador de propriedade não pode ser usado em um arquivo de declaração ou em qualquer outro contexto de ambiente (como em uma classe de declaração).

A expressão para o decorador de propriedade será chamada como uma função em tempo de execução, com os dois argumentos a seguir:

1. A função construtora da classe para um membro estático ou o protótipo da classe para um membro de instância.
2. O nome do membro.

> Um descritor de propriedade não é fornecido como um argumento para um decorador de propriedade devido a como os decoradores de propriedade são inicializados no TypeScript. Isso ocorre porque não existe atualmente nenhum mecanismo para descrever uma propriedade de instância ao definir membros de um protótipo e nenhuma maneira de observar ou modificar o inicializador de uma propriedade. O valor de retorno também é ignorado. Dessa forma, um decorador de propriedade só pode ser usado para observar que uma propriedade de um nome específico foi declarada para uma classe.

Podemos usar essas informações para registrar metadados sobre a propriedade, como no exemplo a seguir:

```typescript
class Greeter {
  @format('Hello, %s')
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    let formatString = getFormat(this, 'greeting');
    return formatString.replace('%s', this.greeting);
  }
}
```

Podemos então definir o decorador `@format` e as funções getFormat usando as seguintes declarações de função:

```typescript
import 'reflect-metadata';

const formatMetadataKey = Symbol('format')

function format(formatString: string) {
  return Reflect.metadata(formatMetadataKey, formatString)
}

function getFormat(target: any, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey)
}
```

O decorador `@format('Hello,% s')` aqui é uma ***fábrica de decoradores***. Quando `@format('Hello,% s')` é chamado, ele adiciona uma entrada de metadados para a propriedade usando a função `Reflect.metadata` da biblioteca `reflet-metadata`. Quando `getFormat` é chamado, ele lê o valor de metadados para o formato.

> Este exemplo requer a biblioteca `reflet-metadata`. Consulte ***Metadata*** para obter mais informações sobre a biblioteca `reflet-metadata`.

## Parameter Decorators

Um decorador de parâmetro é declarado antes da declaração de um parâmetro. O decorador de parâmetro é aplicado à função para um construtor de classe ou declaração de método. Um decorador de parâmetro não pode ser usado em um arquivo de declaração, uma sobrecarga ou em qualquer outro contexto de ambiente (como em uma classe de declaração).

A expressão para o decorador de parâmetro será chamada como uma função em tempo de execução, com os três argumentos a seguir:

1. A função construtora da classe para um membro estático ou o protótipo da classe para um membro de instância.
2. O nome do membro.
3. O índice ordinal do parâmetro na lista de parâmetros da função.

> Um decorador de parâmetro só pode ser usado para observar que um parâmetro foi declarado em um método.

O valor de retorno do decorador de parâmetro é ignorado.

A seguir está um exemplo de um decorador de parâmetro (`@required`) aplicado ao parâmetro de um membro da classe `Greeter`:

```typescript
class Greeter {
  greeting: string

  constructor(message: string) {
    this.greeting = message
  }

  @validate
  greet(@required name: string) {
    return `Hello ${name}, ${this.greeting}`
  }
}
```

Podemos então definir os decoradores `@required` e `@validate` usando as seguintes declarações de função:

```typescript
import 'reflect-metadata';

const requiredMetadataKey = Symbol('required');

function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
  existingRequiredParameters.push(parameterIndex);

  Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}

function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
  let method = descriptor.value;

  descriptor.value = function () {
    let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
    if (requiredParameters) {
      for (let parameterIndex of requiredParameters) {
        if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
          throw new Error('Missing required argument.');
        }
      }
    }

    return method.apply(this, arguments);
  };
}
```

O decorador `@required `adiciona uma entrada de metadados que marca o parâmetro conforme necessário. O decorador `@validate` então envolve o método `greet` existente em uma função que valida os argumentos antes de chamar o método original.

> Este exemplo requer a biblioteca `reflet-metadata`. Consulte ***Metadata*** para obter mais informações sobre a biblioteca `reflet-metadata`.

## Metadata

Alguns exemplos usam a biblioteca `reflet-metadata` que adiciona um polyfill para uma ***API de metadados experimental***. Esta biblioteca ainda não faz parte do padrão ECMAScript (JavaScript). No entanto, assim que decoradores forem oficialmente adotados como parte do padrão ECMAScript, essas extensões serão propostas para adoção.

Você pode instalar esta biblioteca via npm:

```sh
npm i reflect-metadata --save
```

O TypeScript inclui suporte experimental para a emissão de certos tipos de metadados para declarações que possuem decoradores. Para ativar esse suporte experimental, você deve definir a opção do compilador `emitDecoratorMetadata` na linha de comando ou em seu `tsconfig.json`:

***Linha de comando***:
```sh
tsc --target ES5 --experimentalDecorators --emitDecoratorMetadata
```

***tsconfig.json***:
```json
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

Quando habilitado, desde que a biblioteca `reflect-metadata` tenha sido importada, informações adicionais de tipo de tempo de design serão expostas no tempo de execução.

Podemos ver isso em ação no seguinte exemplo:

```typescript
import "reflect-metadata";

class Point {
  x: number;
  y: number;
}

class Line {
  private _p0: Point;
  private _p1: Point;

  @validate
  set p0(value: Point) {
    this._p0 = value;
  }
  get p0() {
    return this._p0;
  }

  @validate
  set p1(value: Point) {
    this._p1 = value;
  }
  get p1() {
    return this._p1;
  }
}

function validate<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) {
  let set = descriptor.set;

  descriptor.set = function (value: T) {
    let type = Reflect.getMetadata('design:type', target, propertyKey);

    if (!(value instanceof type)) throw new TypeError('Invalid type.');

    set.call(target, value);
  };
}
```

O compilador TypeScript injetará informações de tipo em tempo de design usando o decorador `@Reflect.metadata`. Você pode considerá-lo o equivalente ao seguinte TypeScript:

```typescript
class Line {
  private _p0: Point;
  private _p1: Point;

  @validate
  @Reflect.metadata('design:type', Point)
  set p0(value: Point) {
    this._p0 = value;
  }
  get p0() {
    return this._p0;
  }

  @validate
  @Reflect.metadata('design:type', Point)
  set p1(value: Point) {
    this._p1 = value;
  }
  get p1() {
    return this._p1;
  }
}
```

> Os metadados do Decorator são um recurso experimental e podem apresentar alterações importantes em versões futuras.
