type Colors = typeof colorsObj
type ColorsKey = keyof Colors

const colorsObj = {
  blue: 'Azul',
  green: 'Verde',
  red: 'Vermelho'
}

function translateColor(color: 'Azul' | 'Verde' | 'Vermelho', colors: typeof Colors) {
  return colors[color]
}

console.log(translateColor('Vermelho', colorsObj))
