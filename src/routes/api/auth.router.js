import CustomRouter from "../custom.router.js"
import passport from "../../middlewares/passport.mid.js"
import passportCallback from "../../middlewares/passportCallback.mid.js"

const register = async (req, res) => {
  /* passport done(null, response) agrega al objeto req, la propiedad user */
  /* con los datos correspondientes del usuario */
  res.status(201).json({
    response: req.user._id,
    method: req.method,
    url: req.originalUrl,
  })
}

const login = async (req, res) => {
  /* passport done(null, response) agrega al objeto req, la propiedad user */
  /* con los datos correspondientes del usuario */
  const opts = { maxAge: 60 * 60 * 24 * 7, httpOnly: true }
  res.cookie("token", req.token, opts).status(200).json({
    response: req.token,
    method: req.method,
    url: req.originalUrl,
  })
}

const online = async (req, res) => {
  // if (!req.user._id) {
  //   const error = new Error("Invalid credentials")
  //   error.statusCode = 401
  //   throw error
  // }
  res.status(200).json({
    user_id: req.user._id,
    method: req.method,
    url: req.originalUrl,
  })

}

const signout = async (req, res) => {
  res.clearCookie("token").status(200).json({
    message: "Signed out",
    method: req.method,
    url: req.originalUrl,
  })
}

const badAuth = async (req, res) => {
  const error = new Error("Bad auth")
  error.statusCode = 401
  throw error
}

const google = async (req, res) => {
  const opts = { maxAge: 60 * 60 * 24 * 7, httpOnly: true }
  res.cookie("token", req.user.token, opts).status(200).redirect("/")
  // .json({
  //   response: req.user._id,
  //   method: req.method,
  //   url: req.originalUrl,
  // })
}

class AuthRouter extends CustomRouter {
  constructor() {
    super()
    this.init()
  }

  init = () => {
    this.create("/register",
      passport.authenticate("register", {
        session: false,
        failureRedirect: "/api/auth/bad-auth",
      }),
      register)
    this.create("/login", passportCallback("login"), login)
    this.create("/online", passportCallback("current"), online)
    this.create("/signout", passportCallback("current"), signout)
    this.read("/bad-auth", badAuth)
    this.read("/google",
      passport.authenticate("google", {
        scope: ["email", "profile"],
        failureRedirect: "/api/auth/bad-auth"
      }))
    this.read("/google/callback",
      passport.authenticate("google", { session: false, failureRedirect: "/api/auth/bad-auth" }),
      google)
  }
}

const authRouter = new AuthRouter()

export default authRouter.getRouter()