# Union Types

Ocasionalmente, você encontrará uma biblioteca que espera que um parâmetro seja um number ou uma string. Por exemplo, execute a seguinte função:

```typescript
// Pega uma string e adiciona 'padding' à esquerda.
// Se 'padding' é uma string, então 'padding' é anexado ao lado esquerdo.
// Se 'padding' for um número, então esse número de espaços é adicionado ao lado esquerdo.

function padLeft(value: string, padding: any) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value;
  }

  if (typeof padding === 'string') {
    return padding + value;
  }

  throw new Error(`Expected string or number, got '${padding}'.`);
}

padLeft('Hello world', 4); // returna '    Hello world'
```

O problema com padLeft no exemplo acima é que seu parâmetro de preenchimento é digitado como ***any***. Isso significa que podemos chamá-lo com um argumento que não é um número nem uma string, mas o TypeScript aceitará isso.

```typescript
// passa em tempo de compilação, porém falha em tempo de execução.
let indentedString = padLeft('Hello world', true);
```

No código tradicional orientado a objetos, podemos abstrair os dois tipos criando uma hierarquia de tipos. Embora seja muito mais explícito, também é um pouco exagero. Uma das coisas boas sobre a versão original do padLeft é que pudemos apenas passar primitivos. Isso significava que o uso era simples e conciso. Essa nova abordagem também não ajudaria se estivéssemos apenas tentando usar uma função que já existe em outro lugar.

Em vez do tipo ***any***, podemos usar um tipo de união para o parâmetro de preenchimento:

```typescript
// Pega uma string e adiciona 'padding' à esquerda.
// Se 'padding' é uma string, então 'padding' é anexado ao lado esquerdo.
// Se 'padding' for um número, então esse número de espaços é adicionado ao lado esquerdo.
function padLeft(value: string, padding: string | number) {
  // ...
}

let indentedString = padLeft('Hello world', true); // O argumento do tipo 'boolean' não pode ser atribuído ao parâmetro do tipo 'string | number'.
```

Um tipo de união descreve um valor que pode ser um de vários tipos. Usamos a barra vertical (**`|`**) para separar cada tipo, portanto, number | string | booleano é o tipo de valor que pode ser um número, uma string ou um booleano.

## União de tipos com campos comuns

Se tivermos um valor que é um tipo de união, só podemos acessar membros que são comuns a todos os tipos da união.

```typescript
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

declare function getSmallPet(): Fish | Bird;

let pet = getSmallPet();
pet.layEggs();

// Disponível apenas em um dos dois tipos possíveis
pet.swim();

// A propriedade 'swim' não existe no tipo 'Bird | Fish'.
// A propriedade 'swim' não existe no tipo 'Bird'.
```

Os tipos de união podem ser um pouco complicados aqui, mas é preciso um pouco de intuição para se acostumar. Se um valor tiver o tipo A | B, só sabemos com certeza que ele tem membros que A e B têm. Neste exemplo, Bird tem um membro chamado fly. Não podemos ter certeza se uma variável digitada como Bird | Fish tem um método fly(). Se a variável for realmente um Fish em tempo de execução, chamar pet.fly() ocorrerá falha.

## Discriminando uniões

Uma técnica comum para trabalhar com uniões de tipo é ter um único campo que usa tipos literais que você pode usar para deixar o TypeScript restringir o tipo atual possível. Por exemplo, vamos criar uma união de três tipos que têm um único campo compartilhado.

```typescript
type NetworkLoadingState = {
  state: 'loading';
};

type NetworkFailedState = {
  state: 'failed';
  code: number;
};

type NetworkSuccessState = {
  state: 'success';
  response: {
    title: string;
    duration: number;
    summary: string;
  };
};

// Crie um tipo que represente apenas um dos tipos acima
// mas você ainda não tem certeza de qual é.
type NetworkState =
  | NetworkLoadingState
  | NetworkFailedState
  | NetworkSuccessState;
```

Todos os tipos acima têm um campo denominado ***state*** e também têm seus próprios campos:

| NetworkLoadingState | NetworkFailedState | NetworkSuccessState |
| ------------------- | ------------------ | ------------------- |
| state               | state              | state               |
|                     | code               | response            |

Dado que o campo ***state*** é comum em todos os tipos dentro do ***NetworkState*** - é seguro para seu código acessar sem uma verificação de existência.

Com ***state*** como um tipo literal, você pode comparar o valor de ***state*** com a string equivalente e o TypeScript saberá qual tipo está sendo usado no momento.

| NetworkLoadingState | NetworkFailedState | NetworkSuccessState |
| ------------------- | ------------------ | ------------------- |
| 'loading'           | 'failed'           | 'success'           |

Nesse caso, você pode usar uma instrução ***`switch`*** para restringir qual tipo é representado no tempo de execução:

```typescript
type NetworkState =
  | NetworkLoadingState
  | NetworkFailedState
  | NetworkSuccessState;

function logger(state: NetworkState): string {
  // No momento, o TypeScript não sabe qual dos três o estado de tipos potenciais pode ser.
  // Tentando acessar uma propriedade que não é compartilhada em todos os tipos irá gerar um erro

  state.code;
  // A propriedade 'code' não existe no tipo 'NetworkState'.
  // A propriedade 'code' não existe no tipo 'NetworkLoadingState'.

  // Ao trocar o estado, o TypeScript pode restringir a união na análise do fluxo de código
  switch (state.state) {
    case 'loading':
      return 'Downloading...';
    case 'failed':
      // O tipo deve ser NetworkFailedState aqui, portanto, acessar o campo `code` é seguro
      return `Error ${state.code} downloading`;
    case 'success':
      return `Downloaded ${state.response.title} - ${state.response.summary}`;
  }
}
```

## Verificação de exaustividade da união

Gostaríamos que o compilador nos avisasse quando não cobrimos todas as variantes da união discriminada. Por exemplo, se adicionarmos ***`NetworkFromCachedState`*** a ***`NetworkState`***, precisaremos atualizar o logger também:

```typescript
type NetworkFromCachedState = {
  state: 'from_cache';
  id: string
  response: NetworkSuccessState['response']
}

type NetworkState =
  | NetworkLoadingState
  | NetworkFailedState
  | NetworkSuccessState
  | NetworkFromCachedState;

function logger(s: NetworkState) {
  switch (s.state) {
    case 'loading':
      return 'loading request';
    case 'failed':
      return `failed with code ${s.code}`;
    case 'success':
      return 'got response'
  }
}
```

Existem duas maneiras de fazer isso. A primeira é ativar ***`--strictNullChecks`*** e especificar um tipo de retorno:

```typescript
function logger(s: NetworkState): string {
// A função não tem declaração de retorno final e o tipo de retorno não inclui 'undefined'.
  switch (s.state) {
    case 'loading':
      return 'loading request';
    case 'failed':
      return `failed with code ${s.code}`;
    case 'success':
      return 'got response'
  }
}
```

Como o ***`switch`*** não é mais exaustiva,, o TypeScript está ciente de que a função às vezes pode retornar ***`undefined`***. Se você tiver uma string de tipo de retorno explícito, receberá um erro informando que o tipo de retorno é, na verdade, ***`string`*** | ***`undefined`***. No entanto, este método é bastante sutil e, além disso, ***`--strictNullChecks`*** nem sempre funciona com código antigo.

O segundo método usa o tipo ***`never`*** que o compilador usa para verificar a exaustividade:

```typescript
function assertNever(x: never): never {
  throw new Error('Unexpected object: ' + x);
}

function logger(s: NetworkState): string {
  switch (s.state) {
    case 'loading':
      return 'loading request';
    case 'failed':
      return `failed with code ${s.code}`;
    case 'success':
      return 'got response';
    default:
      return assertNever(s)

  // O argumento do tipo 'NetworkFromCachedState' não pode ser atribuído ao parâmetro do tipo 'never'.
  }
}
```

Aqui, ***assertNever*** verifica se s é do tipo ***`never`*** - o tipo que resta depois que todos os outros casos foram removidos. Se você esquecer um caso, então s terá um tipo real e você obterá um erro de tipo. Este método requer que você defina uma função extra, mas é muito mais óbvio quando você a esquece, porque a mensagem de erro inclui o nome do tipo ausente.
