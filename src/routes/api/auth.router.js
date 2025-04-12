import CustomRouter from "../custom.router.js"
import passport from "../../middlewares/passport.mid.js"
import passportCallback from "../../middlewares/passportCallback.mid.js"

const register = async (req, res) => {
  /* passport done(null, response) agrega al objeto req, la propiedad user */
  /* con los datos correspondientes del usuario */
  res.json201()
  
  // .status(201).json({
  //   response: req.user._id,
  //   method: req.method,
  //   url: req.originalUrl,
  // })
}

const login = async (req, res) => {
  /* passport done(null, response) agrega al objeto req, la propiedad user */
  /* con los datos correspondientes del usuario */
  const opts = { maxAge: 60 * 60 * 24 * 7, httpOnly: true }
  res.cookie("token", req.token, opts).json200()
  
  // .status(200).json({
  //   response: req.token,
  //   method: req.method,
  //   url: req.originalUrl,
  // })
}

const online = async (req, res) => {
  res.json200(req.user._id)
  
  // .status(200).json({
  //   user_id: req.user._id,
  //   method: req.method,
  //   url: req.originalUrl,
  // })
}

const signout = async (req, res) => {
  res.clearCookie("token").json200(null, "Signed out")
  
  // .status(200).json({
  //   message: "Signed out",
  //   method: req.method,
  //   url: req.originalUrl,
  // })
}

const badAuth = async (req, res) => {
  res.json401("Bad auth from redirect")
}

const google = async (req, res) => {
  const opts = { maxAge: 60 * 60 * 24 * 7, httpOnly: true }
  res.cookie("token", req.user.token, opts).json200().redirect("/")
}

class AuthRouter extends CustomRouter {
  constructor() {
    super()
    this.init()
  }

  init = () => {
    this.create("/register", ["PUBLIC"],
      passport.authenticate("register", {
        session: false,
        failureRedirect: "/api/auth/bad-auth",
      }),
      register)
    this.create("/login", ["PUBLIC"], passportCallback("login"), login)
    this.create("/online", ["USER", "ADMIN"], passportCallback("current"), online)
    this.create("/signout", ["USER", "ADMIN"], passportCallback("current"), signout)
    this.read("/bad-auth", ["PUBLIC"], badAuth)
    this.read("/google", ["PUBLIC"],
      passport.authenticate("google", {
        scope: ["email", "profile"],
        failureRedirect: "/api/auth/bad-auth"
      }))
    this.read("/google/callback", ["PUBLIC"],
      passport.authenticate("google", { session: false, failureRedirect: "/api/auth/bad-auth" }),
      google)
  }
}

const authRouter = new AuthRouter()

export default authRouter.getRouter()