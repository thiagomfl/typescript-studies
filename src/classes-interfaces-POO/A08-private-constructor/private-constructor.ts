/* eslint-disable no-useless-constructor */

// Singleton && Factory
export class Database {
  private static database: Database

  private constructor(
    private host: string,
    private user: string,
    private pwd: string
  ) { }

  connect() {
    console.log(`Connected with ${this.host} ${this.user} ${this.pwd}`)
  }

  static getDatabase(host: string, user: string, pwd: string): Database {
    if (Database.database) {
      console.log('Returning instance created!')
      return Database.database
    }

    console.log('Creating new instance...')
    Database.database = new Database(host, user, pwd)
    return Database.database
  }
}

const db1 = Database.getDatabase('localhost', 'root', 'qwerty')
db1.connect()

const db2 = Database.getDatabase('localhost', 'root', '123456')
db2.connect()

console.log(db1 === db2)
