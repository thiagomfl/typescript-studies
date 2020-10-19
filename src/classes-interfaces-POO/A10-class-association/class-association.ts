export abstract class Tool {
  constructor(private _name: string) {}

  abstract write(): void

  get name() {
    return this._name
  }
}

export class Writer {
  private _tool: Tool | null = null

  constructor(private name: string) {}

  get tool(): Tool | null {
    return this._tool
  }

  set tool(tool: Tool | null) {
    this._tool = tool
  }

  write() {
    if (this.tool === null) {
      console.log('I can\'t write without the tool')
    }
  }
}

export class Pen extends Tool {
  write() {
    console.log(`${this.name} is typing...`)
  }
}

export class Typewriter extends Tool {
  write() {
    console.log(`${this.name} is typing...`)
  }
}

const pen = new Pen('Montblanc')
const typewriter = new Typewriter('Continental')

console.log(pen.name)
console.log(typewriter.name)
