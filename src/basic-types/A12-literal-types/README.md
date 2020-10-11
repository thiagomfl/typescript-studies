# Tipos literais

Um literal é um subtipo mais concreto de um tipo coletivo. O que isso significa é que ***`'Hello World'`*** é uma ***`string`***, mas uma ***`string`*** não é ***`'Hello World'`*** dentro do sistema de tipos.

Existem três conjuntos de tipos literais disponíveis no TypeScript hoje: strings, números e booleanos; usando tipos literais, você pode permitir um valor exato que uma string, número ou booleano deve ter.

## Estreitamento Literal

Quando você declara uma variável por meio de ***`var`*** ou ***`let`***, está dizendo ao compilador que existe a chance de que essa variável mude seu conteúdo. Em contraste, usar ***`const`*** para declarar uma variável informará ao TypeScript que esse objeto nunca será alterado.

```typescript
const helloWorld = 'Hello World'; // Estamos garantindo que esta variável helloWorld nunca mudará, usando const.
// Portanto, o TypeScript define o tipo como 'Hello World' e não como string

// Por outro lado, um let pode mudar, e então o compilador o declara uma string
let hiWorld = 'Hi World';
```

O processo de ir de um número infinito de casos potenciais (há um número infinito de valores de string possíveis) para um número menor e finito de casos potenciais (no caso da helloWorld: 1) é chamado de estreitamento.

## Tipos literais de string

Na prática, os tipos de literal de string combinam perfeitamente com tipos de união, proteções de tipo e aliases de tipo. Você pode usar esses recursos juntos para obter um comportamento semelhante a enum com strings.

```typescript
type Easing = 'ease-in' | 'ease-out' | 'ease-in-out';

class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    if (easing === 'ease-in') {
      // ...
    } else if (easing === 'ease-out') {
    } else if (easing === 'ease-in-out') {
    } else {
      // É possível que alguém possa fazer isso ignorando seus tipos.
    }
  }
}

let button = new UIElement();
button.animate(0, 0, 'ease-in');
button.animate(0, 0, 'uneasy');
// O argumento do tipo "'uneasy'" não pode ser atribuído ao parâmetro do tipo 'Easing'.
```

Você pode passar qualquer uma das três strings permitidas, mas qualquer outra string apresentará o erro

> O argumento do tipo '"uneasy"' não pode ser atribuído ao parâmetro do tipo '"ease-in" | "ease-out" | "ease-in-out"'

Os tipos de literal de string podem ser usados da mesma maneira para distinguir sobrecargas:

```typescript
function createElement(tagName: 'img'): HTMLImageElement;
function createElement(tagName: 'input'): HTMLInputElement;

// ... mais sobrecargas ...
function createElement(tagName: string): Element {
  // ... o código vai aqui ...
}
```

## Tipos literais numéricos

O TypeScript também possui tipos de literais numéricos, que agem da mesma forma que os literais de string acima.

```typescript
function rollDice(): 1 | 2 | 3 | 4 | 5 | 6 {
  return (Math.floor(Math.random() * 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6;
}

const result = rollDice();
```

Um caso comum de uso é para descrever valores de configuração:

```typescript
interface MapConfig {
  lng: number;
  lat: number;
  tileSize: 8 | 16 | 32;
}

setupMap({ lng: -73.935242, lat: 40.73061, tileSize: 16 });
```

## Tipos literais booleanos

TypeScript também possui tipos literais booleanos. Você pode usá-los para restringir os valores do objeto cujas propriedades estão inter-relacionadas.

```typescript
interface ValidationSuccess {
  isValid: true;
  reason: null;
};

interface ValidationFailure {
  isValid: false;
  reason: string;
};

type ValidationResult =
  | ValidationSuccess
  | ValidationFailure;
```
