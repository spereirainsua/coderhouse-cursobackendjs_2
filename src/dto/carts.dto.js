import crypto from "crypto"

const { PERSISTENCE } = process.env

class CartsDTO {
    constructor(data) {
        if (PERSISTENCE !== "mongo") {
            this._id = crypto.randomBytes(12).toString("hex")
        }
        this.products = []
        this.user_id = data.user_id
        this.state = "new"
        if (PERSISTENCE !== "mongo") {
            this.createdAt = new Date()
            this.updatedAt = new Date()
        }
    }
}

export default CartsDTO