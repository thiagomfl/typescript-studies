## Structural Type System

Um dos princípios básicos do TypeScript é que a verificação de tipo se concentra na forma que os valores têm. Isso às vezes é chamado de ***`“tipagem de pato”`*** ou ***`“tipagem estrutural”`***.

Em um sistema de tipo estrutural, se dois objetos têm a mesma forma, eles são considerados do mesmo tipo.

```typescript
interface Point {
  x: number;
  y: number;
}

function printPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}

// prints "12, 26"
const point = { x: 12, y: 26 };
printPoint(point);
```

A variável point nunca é declarada como um tipo Point. No entanto, o TypeScript compara a forma do point com a forma do Point na verificação de tipo. Eles têm o mesmo formato, então o código é aprovado.

A correspondência de forma requer apenas um subconjunto dos campos do objeto para corresponder.

```typescript
const point3 = { x: 12, y: 26, z: 89 };
printPoint(point3); // prints "12, 26"

const rect = { x: 33, y: 3, width: 30, height: 80 };
printPoint(rect); // prints "33, 3"

const color = { hex: "#187ABF" };
printPoint(color);

// Argumento do tipo '{ hex: string; } 'não pode ser atribuído ao parâmetro do tipo 'Point'.
// Tipo '{ hex: string; }' está faltando as seguintes propriedades do tipo 'Point': x, y
```

Não há diferença entre como classes e objetos se conformam às formas:

```typescript
class VirtualPoint {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const newVPoint = new VirtualPoint(13, 56);
printPoint(newVPoint); // prints "13, 56"
```

Se o objeto ou classe tiver todas as propriedades necessárias, o TypeScript dirá que elas correspondem, independentemente dos detalhes de implementação.
