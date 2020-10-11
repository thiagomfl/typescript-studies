## Tipos de interseção

Os tipos de intersecção estão intimamente relacionados aos tipos de união, mas são usados de maneira muito diferente. Um tipo de interseção combina vários tipos em um. Isso permite adicionar tipos existentes para obter um único tipo com todos os recursos de que você precisa. Por exemplo, ***`Person & Serializable & Loggable`*** é um tipo que é totalmente ***`Person`*** e ***`Serializable`*** e ***`Loggable`***. Isso significa que um objeto desse tipo terá todos os membros de todos os três tipos.

Por exemplo, se você tiver solicitações de rede com tratamento de erros consistente, poderá separar o tratamento de erros em seu próprio tipo, que é mesclado com tipos que correspondem a um único tipo de resposta.

```typescript
interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}

interface ArtworksData {
  artworks: { title: string }[];
}

interface ArtistsData {
  artists: { name: string }[];
}

// Essas interfaces são compostas para ter tratamento de erros consistente e seus próprios dados.

type ArtworksResponse = ArtworksData & ErrorHandling;
type ArtistsResponse = ArtistsData & ErrorHandling;

const handleArtistsResponse = (response: ArtistsResponse) => {
  if (response.error) {
    console.error(response.error.message);
    return;
  }

  console.log(response.artists);
};
```

Interfaces nos permitiram construir novos tipos de outros tipos, estendendo-os. O TypeScript fornece outra construção chamada tipos de interseção, que é usada principalmente para combinar tipos de objetos existentes.

Um tipo de interseção é definido usando o operador ***`&`***.

```typescript
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

type ColorfulCircle = Colorful & Circle;
```

Aqui, cruzamos ***`Colorful`*** e ***`Circle`*** para produzir um novo tipo que tem todos os membros de ***`Colorful`*** e ***`Circle`***.

```typescript
function draw(circle: Colorful & Circle) {
  console.log(`Color was ${circle.color}`);
  console.log(`Radius was ${circle.radius}`);
}

// okay
draw({ color: "blue", radius: 42 });

// oops
draw({ color: "red", raidus: 42 });

// Argumento do tipo '{color: string; raidus: number; }' não é atribuível ao parâmetro do tipo 'Colorful & Circle'
// O literal de objeto só pode especificar propriedades conhecidas, mas 'raidus' não existe no tipo 'Colorful & Circle'. Você quis dizer 'radius'?
```

## Interfaces vs. Intersections

Acabamos de ver duas maneiras de combinar tipos que são semelhantes, mas na verdade são sutilmente diferentes. Com interfaces, poderíamos usar uma cláusula extends para estender de outros tipos, e pudemos fazer algo semelhante com interseções e nomear o resultado com um alias de tipo. A principal diferença entre os dois é como os conflitos são tratados, e essa diferença é normalmente um dos principais motivos pelos quais você escolheria um em vez do outro entre uma interface e um alias de tipo de um tipo de interseção. Por exemplo, dois tipos podem declarar a mesma propriedade em uma interface.
