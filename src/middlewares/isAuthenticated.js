import dao from "../dao/index.factory.js"
import { decodeToken } from "../helpers/jwt.helper.js"

const { usersManager } = dao

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