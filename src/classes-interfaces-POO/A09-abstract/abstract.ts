export abstract class Character {
  protected abstract emoji: string

  constructor(
    protected name: string,
    protected life: number,
    protected power: number
  ) { }

  attack(character: Character) {
    this.warCry()
    character.loseLife(this.power)
  }

  loseLife(power: number) {
    this.life -= power
    console.log(`${this.emoji} - ${this.name} now has ${this.life} of life`)
  }

  abstract warCry(): void
}

export class Warrior extends Character {
  protected emoji = '\u{1F9DD}'

  warCry() {
    console.log(`${this.emoji} WARRIOORRRRR ATTACKING...`)
  }
}

export class Monster extends Character {
  protected emoji = '\u{1F9DF}'

  warCry() {
    console.log(`${this.emoji} MONSTEEERRRRRR ATTACKING...`)
  }
}

const warrior = new Warrior('Warrior', 100, 1000)
const monster = new Warrior('Monster', 85, 1000)

warrior.attack(monster)
warrior.attack(monster)
warrior.attack(monster)

monster.attack(warrior)
monster.attack(warrior)
monster.attack(warrior)
