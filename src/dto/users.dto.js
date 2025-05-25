import crypto from "crypto"

const { PERSISTENCE } = process.env

class UserDTO {
    constructor (data) {
        if (PERSISTENCE !== "mongo") {
            this._id = crypto.randomBytes(12).toString("hex")
        }
        this.email = data.email
        this.password = data.password
        if (PERSISTENCE !== "mongo") this.photo = data.photo || "/img/user_default.png"
        if (PERSISTENCE !== "mongo") this.role = data.role || "USER"

        if (PERSISTENCE !== "mongo") {
            this.createdAt = new Date()
            this.updatedAt = new Date()
        }
    }
}

export default UserDTO