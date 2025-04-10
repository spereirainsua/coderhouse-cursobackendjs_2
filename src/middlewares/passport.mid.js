import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { Strategy as GoogleStrategy } from "passport-google-oauth2"
import { Strategy as JwrStrategy, ExtractJwt } from "passport-jwt"
import { usersManager } from "../data/UsersManager.js"
import { createHash, isValidPass } from "../helpers/hash.helper.js"
import { createToken } from "../helpers/jwt.helper.js"

// Estas variables deben llamarse tal cual están acá para que funcione la estrategia de Google
const clientID = process.env.GOOGLE_CLIENT_ID
const clientSecret = process.env.GOOGLE_CLIENT_SECRET
const callbackURL = "http://localhost:8080/api/auth/google/callback"

passport.use("register", new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
        try {
            let user = await usersManager.readBy({ email })
            if (user) {
                const error = new Error("Usuario ya se encuentra registrado")
                error.statusCode = 401
                throw error
            }
            req.body.password = createHash(password)
            user = await usersManager.createOne(req.body)
            done(null, user)
        } catch (error) {
            done(error)
        }
    }
))

passport.use("login", new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
        try {
            let user = await usersManager.readBy({ email })
            if (!user) {
                return done(null, null, { message: "User not found", statusCode: 401 })
            }
            const verifyPassword = isValidPass(password, user.password)
            if (!verifyPassword) {
                return done(null, null, { message: "Invalid credentials", statusCode: 401 })
            }
            let data = {
                user_id: user._id,
                email: user.email,
                role: user.role,
            }
            const token = createToken(data)
            req.token = token
            done(null, user)
        } catch (error) {
            done(error)
        }
    }
))

passport.use("google",
    new GoogleStrategy(
        { clientID, clientSecret, callbackURL },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // CONVENCION
                // Si un usuario se registra desde el formulario el campo email es el del formulario
                // en cambio si se registra desde google/tercero, el campo email de el id provisto
                const email = profile.id
                let user = await usersManager.readBy({ email })
                if (!user) {
                    user = {
                        photo: profile.picture,
                        email: profile.id,
                        password: createHash(profile.id)
                    }
                    user = await usersManager.createOne(user)
                }
                let data = {
                    user_id: user._id,
                    email: user.email,
                    role: user.role,
                }
                const token = createToken(data)
                user = {
                    ...user,
                    token
                }
                done(null, user)
            } catch (error) {
                done(error)
            }
        }
    )
)
// Verificar que el usuario es parte de nuestra app
passport.use("current", new JwrStrategy(
    { 
        jwtFromRequest: ExtractJwt.fromExtractors([req=> req?.cookies?.token]),
        secretOrKey: process.env.JWT_SECRET 
    },
    async (data, done) => {
        try {
            const { user_id } = data
            const user = await usersManager.readById(user_id)
            if (!user) {
                return done(null, null, { message: "Bad auth", statusCode: 401 })
            }
            done(null, user)
        } catch (error) {
            done(error)
        }
    }
))
//Verificar si el usuario es admin
passport.use("admin", new JwrStrategy(
    { 
        jwtFromRequest: ExtractJwt.fromExtractors([req=> req?.cookies?.token]),
        secretOrKey: process.env.JWT_SECRET 
    },
    async (data, done) => {
        try {
            const { user_id } = data
            const user = await usersManager.readById(user_id)
            if (!user) {
                return done(null, null, { message: "Bad auth", statusCode: 401 })
            }
            if (user.role !== "ADMIN") {
                return done(null, null, { message: "Forbidden", statusCode: 403 })
            }
            done(null, user)
        } catch (error) {
            done(error)
        }
    }
))

export default passport