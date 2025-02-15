import fs from "fs"

class CartManager {
    cid = 1
    carts = []
    pathFile = ""

    constructor(pathFile) {
        if (CartManager.instance) {
            return CartManager.instance
        }
        this.pathFile = pathFile
        try {
            let data = "[]"
            if (fs.existsSync(pathFile)) {
                data = fs.readFileSync(pathFile, "utf8")
                this.carts = JSON.parse(data)
            } else {
                data = fs.writeFileSync(pathFile, "[]", "utf8")
            }
            if (this.carts.length > 0) {
                for (let cart of this.carts) {
                    if (cart.cid > this.cid) this.cid = cart.cid
                }
                this.cid++
            }
            CartManager.instance = this
            console.log("Se cargaron los datos de carritos correctamente")
        } catch (error) {
            console.log(error)
        }
    }

    createNewCart = () => {
        try {
            const cart = {
                cid: this.cid++,
                products: []
            }
            this.carts.push(cart)
            fs.writeFileSync(this.pathFile, JSON.stringify(this.carts, null, 2), "utf-8")
            return this.carts
        } catch (error) {
            console.error(error)
            return null
        }
    }

    getCarts = () => {
        return this.carts
    }

    getCartById = (cid) => {
        let cartResult = this.carts.filter((cart) => parseInt(cart.cid) == parseInt(cid))
        if (cartResult.length > 0) {
            return cartResult[0]
        } else {
            console.log("Not found")
            return null
        }
    }

    addProductToCart = (cid, pid) => {
        try {
            let cartIndex = this.carts.findIndex((cart) => parseInt(cart.cid) === parseInt(cid))
            let productIndex = this.carts[cartIndex].products.findIndex((product) => parseInt(product.id) === parseInt(pid))
            if (productIndex != -1) {
                this.carts[cartIndex].products[productIndex].quantity++
            } else this.carts[cartIndex].products.push({ id: pid, quantity: 1 })
            fs.writeFileSync(this.pathFile, JSON.stringify(this.carts, null, 2), "utf-8")
            return this.carts[cartIndex]
        } catch (error) {
            console.error(error)
            return null
        }
    }
}

export default CartManager