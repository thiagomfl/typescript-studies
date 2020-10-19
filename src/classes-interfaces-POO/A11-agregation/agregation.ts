export class Cart {
  private readonly products: Product[] = []

  insertProducts(...products: Product[]) {
    for (const product of products) {
      this.products.push(product)
    }
  }

  productQty() {
    return this.products.length
  }

  totalValue() {
    return this.products.reduce((acc, product) => acc + product.price, 0)
  }
}

export class Product {
  constructor(public name: string, public price: number) {}
}

const product1 = new Product('Tshirt', 49.99)
const product2 = new Product('Cup', 9.99)
const product3 = new Product('Pen', 1.99)
console.log(product1)

const cart = new Cart()
cart.insertProducts(product1)
cart.insertProducts(product2)
cart.insertProducts(product3)
