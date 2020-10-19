export class Car {
  private readonly engine = new Engine()

  turnOn() {
    this.engine.turnOn()
  }

  speed() {
    this.engine.speed()
  }

  stop() {
    this.engine.stop()
  }

  turnOff() {
    this.engine.turnOff()
  }
}

export class Engine {
  turnOn() {
    console.log('Engine is on')
  }

  speed() {
    console.log('Engine is accelerating')
  }

  stop() {
    console.log('Engine is stopping')
  }

  turnOff() {
    console.log('Engine is off')
  }
}

const car = new Car()
car.turnOn()
car.speed()
car.stop()
car.turnOff()
