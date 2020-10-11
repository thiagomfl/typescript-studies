# Tipo de dado: object

Além dos primitivos, o tipo mais comum de tipo que você encontrará é um tipo de objeto. Isso se refere a qualquer valor JavaScript com propriedades, que é quase todos eles! Para definir um tipo de objeto, simplesmente listamos suas propriedades e seus tipos.

Por exemplo, aqui está uma função que pega um objeto semelhante a um ponto:

```typescript
// A anotação de tipo do parâmetro é um tipo de objeto
function printCoord(pt: { x: number; y: number }) {
  console.log('O valor das coordenadas x é ' + pt.x);
  console.log('O valor das coordenadas y é ' + pt.y);
}

printCoord({ x: 3, y: 7 });
```

Aqui, anotamos o parâmetro com um tipo com duas propriedades - ***x e y*** - que são ambas do tipo ***number***. Você pode usar, ou; para separar as propriedades, e o último separador é opcional de qualquer maneira.

A parte do tipo de cada propriedade também é opcional. Se você não especificar um tipo, será considerado qualquer um.

## Propriedades Opcionais

Os tipos de objeto também podem especificar que algumas ou todas as suas propriedades são opcionais. Para fazer isso, adicione um ***?*** após o nome da propriedade:

```typescript
function printName(obj: { first: string; last?: string }) {
  // ...
}

// Ambos OK
printName({ first: 'Bob' });
printName({ first: 'Alice', last: 'Alisson' });
```

Em JavaScript, se você acessar uma propriedade que não existe, obterá o valor ***undefined*** em vez de um erro de tempo de execução. Por isso, ao ler uma propriedade opcional, você terá que verificar se há ***undefined*** antes de usá-lo.

```typescript
function printName(obj: { first: string; last?: string }) {
  // Erro - pode falhar se 'obj.last' não foi fornecido!
  console.log(obj.last.toUpperCase());
  // O objeto está possivelmente 'indefinido'.

  // OK
  if (obj.last !== undefined) console.log(obj.last.toUpperCase());
}
```
>