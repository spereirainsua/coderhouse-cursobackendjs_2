import FileManager from "./Manager.fs.js"

class CartsManager extends FileManager {
  constructor() {
    super("./src/dao/fs/data/carts.json")
  }

  createNewCart = async (data) => {
    return await this.createOne(data)
  }

  getCartById = async (cid) => {
    return [await this.readById(cid)]
  }

  getCartBy = async (filter) => {
    return await this.readBy(filter)
  }

  getAllCartsByUid = async (uid) => {
    return await this.readBy({ user_id: uid })
  }

  updateProductsInCart = async (cid, pid) => {
    const cart = await this.readById(cid)
    const index = cart.products.findIndex((item) => item.productId === pid)
    if (index !== -1) {
      const product = {
        productId: cart.products[index].productId,
        quantity: cart.products[index].quantity + 1
      }
      cart.products[index] = product
      return await this.updateById(cid, { products: cart.products })
    } else {
      const product = {
        productId: pid,
        quantity: 1
      }
      cart.products.push(product)
      return await this.updateById(cid, { products: cart.products })
    }
  }

  deleteProductsInCart = async (cid, pid) => {
    const items = await this._readFile()
    const index = items.findIndex((item) => item._id === cid)
    if (index === -1) return null
    const prodIndex = items[index].products.findIndex((item) => item._id === pid)
    const [deletedItem] = items[index].products.splice(prodIndex, 1)
    await this._writeFile(items)
    return deletedItem
  }

  deleteCart = async (cid) => {
    return await destroyById(cid)
  }
}

export default CartsManager

export const cartsManager = new CartsManager()