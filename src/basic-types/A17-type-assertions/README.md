# Type assertions

Às vezes, você acabará em uma situação em que saberá mais sobre um valor do que o TypeScript. Normalmente, isso acontecerá quando você souber que o tipo de alguma entidade pode ser mais específico do que seu tipo atual.

Asserções de tipo são uma forma de dizer ao compilador 'confie em mim, eu sei o que estou fazendo.' Uma asserção de tipo é como uma conversão de tipo em outras linguagens, mas não executa nenhuma verificação especial ou reestruturação de dados. Ele não tem impacto no tempo de execução e é usado exclusivamente pelo compilador. O TypeScript pressupõe que você, o programador, tenha executado todas as verificações especiais necessárias.

As asserções de tipo têm duas formas.

Uma é a sintaxe ***`as`***:

```typescript
let someValue: unknown = 'this is a string';
let strLength: number = (someValue as string).length;
```

A outra versão é a sintaxe de “colchetes angulares”:

```typescript
let someValue: unknown = 'this is a string';
let strLength: number = (<string>someValue).length;
```

As duas amostras são equivalentes. Usar um em vez do outro é principalmente uma escolha de preferência; no entanto, ao usar TypeScript com JSX, apenas as afirmações de estilo são permitidas.

## Uma nota sobre let

Você deve ter notado que, até agora, usamos a palavra-chave ***`let`*** em vez da palavra-chave ***`var`*** do JavaScript, com a qual você deve estar mais familiarizado. A palavra-chave ***`let`*** é, na verdade, uma construção JavaScript mais recente que o TypeScript disponibiliza. Você pode ler no Manual de Referência sobre Declarações de Variáveis mais sobre como ***`let`*** e const consertam muitos dos problemas com ***`var`***.

## Sobre Number, String, Boolean, Symbol and Object

Pode ser tentador pensar que os tipos ***`Number`***, ***`String`***, ***`Boolean`***, ***`Symbol`*** ou ***`Object`*** são iguais às versões em minúsculas recomendadas acima. Esses tipos não se referem aos primitivos de linguagem, entretanto, e quase nunca devem ser usados como um tipo.

```typescript
function reverse(s: String): String {
  return s.split('').reverse().join('');
}

reverse('hello world');
```

Em vez disso, use os tipos ***`Number`***, ***`String`***, ***`Boolean`***, ***`Symbol`*** ou ***`Object`***.

```typescript
function reverse(s: string): string {
  return s.split('').reverse().join('');
}

reverse('hello world');
```

Às vezes, você terá informações sobre o tipo de valor que o TypeScript não pode conhecer.

Por exemplo, se você estiver usando ***`document.getElementById`***, o TypeScript saberá apenas que isso retornará algum tipo de ***`HTMLElement`***, mas você deve saber que sua página sempre terá um ***`HTMLCanvasElement`*** com um determinado ID.

Nessa situação, você pode usar uma asserção de tipo para especificar um tipo mais específico:

```typescript
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```

Como uma anotação de tipo, as asserções de tipo são removidas pelo compilador e não afetam o comportamento de tempo de execução do seu código.

Você também pode usar a sintaxe de colchetes angulares (exceto se o código estiver em um arquivo ***`.tsx`***), que é equivalente:

```typescript
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

> ***Lembrete***: como eles são removidos em tempo de compilação, não há verificação de tempo de execução associada a uma asserção de tipo. Não haverá uma exceção ou ***`null`*** gerado se a asserção de tipo estiver errada.

O TypeScript permite apenas asserções de tipo que se convertem em uma versão mais específica ou menos específica de um tipo. Esta regra evita coerções ***“impossíveis”*** como:

```typescript
const x = "hello" as number;
// A conversão do tipo 'string' para 'number' pode ser um erro porque nenhum dos tipos se sobrepõe suficientemente ao outro. Se isso foi intencional, converta a expressão para 'unknown' primeiro.
```

Às vezes, essa regra pode ser muito conservadora e não permitirá coerções mais complexas que possam ser válidas. Se isso acontecer, você pode usar duas asserções, primeiro para ***`any`*** ou ***`unknown`***, e depois para o tipo desejado:

```typescript
const a = (expr as any) as T;
```
