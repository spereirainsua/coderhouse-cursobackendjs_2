import crypto from "crypto"

const { PERSISTENCE } = process.env

class ProductDTO {
    constructor(data) {
        if (PERSISTENCE !== "mongo") {
            this._id = crypto.randomBytes(12).toString("hex")
        }
        this.title = data.title
        this.price = data.price || 1
        this.stock = data.stock || 1
        this.category = data.category || "no_category"
        this.photo = data.photo || "/img/product_default.png"
        if (PERSISTENCE !== "mongo") {
            this.createdAt = new Date()
            this.updatedAt = new Date()
        }
    }
}

export default ProductDTO