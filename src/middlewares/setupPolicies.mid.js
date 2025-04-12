import { decodeToken } from "../helpers/jwt.helper.js"

const setupPolicies = (policies) => async (req, res, next) => {
    try {
        if (policies.includes("PUBLIC")) return next()
        if (!req.cookies.token) {
            res.json401()
        }
        const token = req?.cookies?.token
        const data = decodeToken(token)
        const { role, user_id } = data
        if (!role || !user_id) return res.json401()
        const roles = {
            USER: policies.includes("USER"),
            ADMIN: policies.includes("ADMIN"),
        }
        if (roles[role]) {
            req.user = data
            return next()
        } else {
            res.json403()
        }
    } catch (error) {
        next(error)
    }
}

export default setupPolicies