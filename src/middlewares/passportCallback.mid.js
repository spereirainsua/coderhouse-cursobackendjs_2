import passport from "./passport.mid.js"

const passportCallback = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(
            strategy,
            (error, user, info) => {
                if (error) {
                    return next(error)
                }
                if (!user) {
                    const error = new Error(info.message || "Bad auth from callback")
                    error.statusCode = info.statusCode || 401
                    return next(error)
                }
                req.user = user
                next()
            }
        )(req, res, next)
    }
}

export default passportCallback