# Generics

Uma parte importante da engenharia de software é construir componentes que não apenas tenham APIs bem definidas e consistentes, mas também sejam reutilizáveis. Componentes que são capazes de trabalhar com os dados de hoje, bem como com os dados de amanhã, fornecerão os recursos mais flexíveis para a construção de grandes sistemas de software.

Em linguagens como C# e Java, uma das principais ferramentas na caixa de ferramentas para a criação de componentes reutilizáveis são os **generics**, ou seja, ser capaz de criar um componente que pode funcionar em uma variedade de tipos ao invés de um único. Isso permite que os usuários consumam esses componentes e usem seus próprios tipos.

## Hello World de Generics

Para começar, vamos fazer o *"hello world"* dos genéricos: a função de identity. A função de identity é uma função que retornará tudo o que for passado. Você pode pensar nisso de maneira semelhante ao comando echo.

Sem os generics, teríamos que dar à função de identity um tipo específico:

```typescript
function identity(arg: number): number {
  return arg;
}
```

Ou podemos descrever a função de identity usando o tipo `any`:

```typescript
function identity(arg: any): any {
  return arg;
}
```

Embora o uso de `any` seja certamente genérico no sentido de que fará com que a função aceite todo e qualquer tipo para o tipo `arg`, na verdade estamos perdendo as informações sobre qual era esse tipo quando a função retorna. Se passarmos um número, a única informação que temos é que qualquer tipo pode ser retornado.

Em vez disso, precisamos de uma forma de capturar o tipo de argumento de tal forma que também possamos usá-lo para denotar o que está sendo retornado. Aqui, usaremos uma `type variable`, um tipo especial de variável que funciona em tipos em vez de valores.

```typescript
function identity<T>(arg: T): T {
  return arg;
}
```

Agora adicionamos uma variável de tipo T à função de identity. Este T nos permite capturar o tipo que o usuário fornece (por exemplo, número), para que possamos usar essa informação mais tarde. Aqui, usamos T novamente como o tipo de retorno. Na inspeção, podemos ver agora que o mesmo tipo é usado para o argumento e o tipo de retorno. Isso nos permite trafegar esse tipo de informação em um lado da função e sair do outro.

Dizemos que essa versão da função de identidade é genérica, pois funciona em uma variedade de tipos. Ao contrário do uso de `any`, também é tão preciso (ou seja, não perde nenhuma informação) quanto a primeira função identity que usou números para o argumento e tipo de retorno.

Depois de escrever a função identity genérica, podemos chamá-la de duas maneiras. A primeira maneira é passar todos os argumentos, incluindo o argumento de tipo, para a função:

```typescript
let output = identity<string>('myString');
//       ^ = let output: string
```

Aqui, definimos explicitamente T como string como um dos argumentos para a chamada de função, denotado usando <> ao redor dos argumentos em vez de ().

A segunda forma também é talvez a mais comum. Aqui, usamos a inferência de argumento de tipo - ou seja, queremos que o compilador defina o valor de T para nós automaticamente com base no tipo de argumento que passamos:

```typescript
let output = identity('myString');
//       ^ = let output: string
```

Observe que não tivemos que passar explicitamente o tipo nos colchetes angulares (<>); o compilador apenas olhou para o valor 'myString' e definiu T para seu tipo. Embora a inferência de argumento de tipo possa ser uma ferramenta útil para manter o código mais curto e legível, você pode precisar passar explicitamente os argumentos de tipo como fizemos no exemplo anterior, quando o compilador falha em inferir o tipo, como pode acontecer em exemplos mais complexos.

## Trabalhando com Variáveis de Tipo Genérico

Quando você começar a usar ***generics***, notará que, ao criar funções genéricas como `identity`, o compilador irá forçar o uso correto de quaisquer parâmetros digitados genericamente no corpo da função. Ou seja, você realmente trata esses parâmetros como se eles pudessem ser todos os tipos.

Vamos pegar nossa função `identity` anterior:

```typescript
function identity<T>(arg: T): T {
  return arg;
}
```

E se quisermos também registrar o comprimento do argumento `arg` no console a cada chamada? Podemos ser tentados a escrever isto:

```typescript
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length);
// Error: Property 'length' does not exist on type 'T'.
  return arg;
}
```

Quando o fizermos, o compilador nos dará um erro de que estamos usando o membro `.length` de `arg`, mas em nenhum lugar dissemos que `arg` tem esse membro. Lembre-se de que dissemos anteriormente que essas variáveis de tipo representam todo e qualquer tipo, portanto, alguém usando essa função poderia ter passado um *número*, que não tem um membro `.length`.

Digamos que pretendemos realmente que essa função funcione em arrays de `T`, em vez de `T` diretamente. Como estamos trabalhando com arrays, o membro `.length `deve estar disponível. Podemos descrever isso da mesma forma que criaríamos arrays de outros tipos:

```typescript
function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}
```

Você pode ler o tipo de `loggingIdentity` como “a função genérica `loggingIdentity` leva um parâmetro de tipo `T` e um argumento `arg` que é um array de `T`s e retorna um array de `T`s”. Se passássemos um array de números, obteríamos um array de números de volta, já que `T` se ligaria a um `number`. Isso nos permite usar nossa variável de tipo genérico `T` como parte dos tipos com os quais estamos trabalhando, em vez do tipo inteiro, o que nos dá maior flexibilidade.

Podemos, alternativamente, escrever o exemplo desta maneira:

```typescript
function loggingIdentity<T>(arg: Array<T>): Array<T> {
  console.log(arg.length); // Array tem um .length, então não há mais erros
  return arg;
}
```

Você já deve estar familiarizado com esse estilo de tipo em outras línguagens. Abaixo, abordaremos como você pode criar seus próprios tipos genéricos como Array <T>.

## Tipos Genéricos

Nas seções anteriores, criamos funções de identidade genéricas que funcionavam em uma variedade de tipos. Nesta seção, exploraremos o tipo das próprias funções e como criar interfaces genéricas.

O tipo de funções genéricas é igual ao das funções não genéricas, com os parâmetros de tipo listados primeiro, de forma semelhante às declarações de função:

```typescript
function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: <T>(arg: T) => T = identity;
```

Também poderíamos ter usado um nome diferente para o parâmetro de tipo genérico no tipo, desde que o número de variáveis de tipo e como as variáveis de tipo são usadas estejam alinhados.

```typescript
function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: <U>(arg: U) => U = identity;
```

Também podemos escrever o tipo genérico como uma assinatura de chamada de um tipo literal de objeto:

```typescript
function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: { <T>(arg: T): T } = identity;
```

O que nos leva a escrever nossa primeira interface genérica. Vamos pegar o objeto literal do exemplo anterior e movê-lo para uma interface:

```typescript
interface GenericIdentityFn {
  <T>(arg: T): T;
}

function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: GenericIdentityFn = identity;
```

Em um exemplo semelhante, podemos querer mover o parâmetro genérico para ser um parâmetro de toda a interface. Isso nos permite ver que tipo (s) somos genéricos (por exemplo, `Dictionary<string>` em vez de apenas `Dictionary`). Isso torna o parâmetro de tipo visível para todos os outros membros da interface.

```typescript
interface GenericIdentityFn<T> {
  (arg: T): T;
}

function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

Observe que nosso exemplo mudou para algo ligeiramente diferente. Em vez de descrever uma função genérica, agora temos uma assinatura de função não genérica que é parte de um tipo genérico. Quando usamos `GenericIdentityFn`, agora também precisamos especificar o argumento de tipo correspondente (aqui: `number`), bloqueando efetivamente o que a assinatura de chamada subjacente usará. Entender quando colocar o parâmetro de tipo diretamente na assinatura da chamada e quando colocá-lo na própria interface será útil para descrever quais aspectos de um tipo são genéricos.

Além de interfaces genéricas, também podemos criar classes genéricas. Observe que não é possível criar enums e namespaces genéricos.

## Classes Genéricas

Uma classe genérica tem uma forma semelhante a uma interface genérica. As classes genéricas têm uma lista de parâmetros de tipo genérico entre colchetes angulares (`<>`) após o nome da classe.

```typescript
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) {
  return x + y;
};
```

Este é um uso bastante literal da classe `GenericNumber`, mas você deve ter notado que nada o está restringindo a usar apenas o tipo `number`. Em vez disso, poderíamos ter usado `string` ou objetos ainda mais complexos.

```typescript
// @strict: false
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}
// ---cut---
let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = '';
stringNumeric.add = function(x, y) {
  return x + y;
};

console.log(stringNumeric.add(stringNumeric.zeroValue, 'test'));
```

Assim como na interface, colocar o parâmetro de tipo na própria classe nos permite ter certeza de que todas as propriedades da classe estão funcionando com o mesmo tipo.

Uma classe tem dois lados em seu tipo: o lado estático e o lado da instância. Classes genéricas são genéricas apenas em seu lado da instância, em vez de em seu lado estático, portanto, ao trabalhar com classes, os membros estáticos não podem usar o parâmetro de tipo da classe.

## Restrições Genéricas

Se você se lembra de um exemplo anterior, às vezes pode querer escrever uma função genérica que funcione em um conjunto de tipos, onde você tem algum conhecimento sobre quais recursos esse conjunto de tipos terá. Em nosso exemplo de `loggingIdentity`, queríamos ser capazes de acessar a propriedade `.length` de `arg`, mas o compilador não conseguiu provar que todos os tipos tinham uma propriedade `.length`, portanto, ele nos avisa que não podemos fazer essa suposição.

```typescript
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length);
// Error: Property 'length' does not exist on type 'T'.
  return arg;
}
```

Em vez de trabalhar com todo e qualquer tipo, gostaríamos de restringir essa função para funcionar com todo e qualquer tipo que também tenha a propriedade `.length`. Contanto que o tipo tenha este membro, nós permitiremos, mas é necessário ter pelo menos este membro. Para fazer isso, devemos listar nosso requisito como uma restrição sobre o que `T` pode ser.

Para fazer isso, criaremos uma interface que descreve nossa restrição. Aqui, criaremos uma interface que possui uma única propriedade `.length` e, em seguida, usaremos essa interface e a palavra-chave `extends` para denotar nossa restrição:

```typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // Agora sabemos que ele tem uma propriedade .length, então não há mais erros
  return arg;
}
```

Como a função genérica agora está restrita, ela não funcionará mais em todos os tipos:

```typescript
loggingIdentity(3);
// Error: O argumento do tipo 'número' não pode ser atribuído ao parâmetro do tipo 'Comprimento'.
```

Em vez disso, precisamos passar valores cujo tipo tenha todas as propriedades necessárias:

```typescript
loggingIdentity({ length: 10, value: 3 });
```

## Usando parâmetros de tipo em restrições genéricas

Você pode declarar um parâmetro de tipo que é restringido por outro parâmetro de tipo. Por exemplo, aqui gostaríamos de obter uma propriedade de um objeto dado seu nome. Gostaríamos de garantir que não estamos pegando acidentalmente uma propriedade que não existe no `obj`, então vamos colocar uma restrição entre os dois tipos:

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, 'a');
getProperty(x, 'm');
// O argumento do tipo '"m"' não é atribuível ao parâmetro do tipo '"a" | "b" | "c" | "d" '.
```

## Usando tipos de classe em genéricos

Ao criar fábricas no TypeScript usando genéricos, é necessário referir-se aos tipos de classe por suas funções construtoras. Por exemplo,

```typescript
function create<T>(c: { new (): T }): T {
  return new c();
}
```

Um exemplo mais avançado usa a propriedade `prototype` para inferir e restringir relacionamentos entre a função do construtor e o lado da instância dos tipos de classe.

```typescript
class BeeKeeper {
  hasMask: boolean;
}

class ZooKeeper {
  nametag: string;
}

class Animal {
  numLegs: number;
}

class Bee extends Animal {
  keeper: BeeKeeper;
}

class Lion extends Animal {
  keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
```