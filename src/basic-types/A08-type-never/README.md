# Tipo de dado: never

O tipo ***never*** representa o tipo de valores que nunca ocorrem. Por exemplo, ***never*** é o tipo de retorno para uma expressão de função ou uma expressão de função arrow que sempre lança uma exceção ou uma que nunca retorna. As variáveis também adquirem o tipo ***never*** quando estreitadas por quaisquer proteções de tipo que nunca podem ser verdadeiras.

O tipo ***never*** é um subtipo de, e atribuível a, cada tipo; entretanto, nenhum tipo é um subtipo de, ou atribuível a, ***never*** (exceto nunca ele mesmo). Mesmo qualquer um não pode ser atribuído a nunca.

Alguns exemplos de funções que nunca retornam:

```typescript
// O retorno da função nunca deve ter um ponto final alcançável
function error(message: string): never {
  throw new Error(message);
}

// O tipo de retorno inferido é never
function fail() {
  return error("Something failed");
}

// O retorno da função nunca deve ter um ponto final alcançável
function infiniteLoop(): never {
  while (true) {}
}
```
O tipo ***never*** representa valores que nunca são observados. Em um tipo de retorno, isso significa que a função lança uma exceção ou termina a execução do programa.

***never*** também aparece quando o TypeScript determina que não sobrou nada em uma união.

```typescript
function fn(x: string | number) {
  if (typeof x === "string") {
    // faz alguma coisa
  } else if (typeof x === "number") {
    // faz outra coisa
  } else {
    x; // tem tipo 'never'!
  }
}
```
