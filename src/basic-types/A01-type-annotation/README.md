# Type Annotations

## Anotações de tipo em variáveis
Ao declarar uma variável usando const, var ou let, você pode opcionalmente adicionar uma anotação de tipo para especificar explicitamente o tipo da variável:

```typescript
let myName: string = "Alice";
```
> O TypeScript não usa declarações no estilo “tipos à esquerda” como int x = 0; As anotações de tipo sempre irão após o que está sendo digitado.

Na maioria dos casos, porém, isso não é necessário. Sempre que possível, o TypeScript tenta inferir automaticamente os tipos em seu código. Por exemplo, o tipo de uma variável é inferido com base no tipo de seu inicializador:

```typescript
// Nenhuma anotação de tipo necessária - 'myName' inferida como tipo 'string'
let myName = "Alice";
```

Na maior parte, você não precisa aprender explicitamente as regras de inferência. Se você está começando, tente usar menos anotações de tipo do que você pensa - você pode se surpreender com o quão poucas você precisa para TypeScript para entender completamente o que está acontecendo.

## Anotações de tipo de parâmetro

Ao declarar uma função, você pode adicionar anotações de tipo após cada parâmetro para declarar quais tipos de parâmetros a função aceita. As anotações de tipo de parâmetro vêm após o nome do parâmetro:

```typescript
// Anotação de tipo de parâmetro
function greet(name: string) {
  console.log("Hello, " + name.toUpperCase() + "!!");
}
```
Quando um parâmetro tem uma anotação de tipo, as chamadas para essa função serão validadas:

```typescript
// Seria um erro de execução se executado!
greet(42);
```
> O argumento do tipo 'número' não pode ser atribuído ao parâmetro do tipo 'string'.

## Anotações de tipo de retorno

Você também pode adicionar anotações de tipo de retorno. As anotações de tipo de retorno aparecem após a lista de parâmetros:

```typescript
function getFavoriteNumber(): number {
  return 26;
}
```

Muito parecido com as anotações de tipo de variável, você geralmente não precisa de uma anotação de tipo de retorno porque o TypeScript inferirá o tipo de retorno da função com base em suas instruções de retorno. A anotação de tipo no exemplo acima não muda nada. Algumas bases de código especificarão explicitamente um tipo de retorno para fins de documentação, para evitar alterações acidentais ou apenas para preferência pessoal.
