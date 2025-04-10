import { usersManager } from "../data/UsersManager.js"
import { decodeToken } from "../helpers/jwt.helper.js"

const isAuthenticated = async (req, res, next) => {
    try {
        if (!req.cookies?.token) {
            req.user = null
        } else {
            const data = decodeToken(req?.cookies?.token)
            const user = await usersManager.readById(data.user_id)
            req.user = user
        }
        next()
    } catch (error) {
        next(error)
    }
}

export default isAuthenticated