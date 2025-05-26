import crypto from "crypto"

const { PERSISTENCE } = process.env

class UserDTO {
    constructor(data) {
        if (PERSISTENCE !== "mongo") {
            this._id = crypto.randomBytes(12).toString("hex")
        }
        this.email = data.email
        this.password = data.password
        this.photo = data.photo || "/img/user_default.png"
        this.role = data.role || "USER"
        this.isVerify = data.isVerify || false
        this.verifyCode = crypto.randomBytes(12).toString("hex")
        if (PERSISTENCE !== "mongo") {
            this.createdAt = new Date()
            this.updatedAt = new Date()
        }
    }
}

export default UserDTO