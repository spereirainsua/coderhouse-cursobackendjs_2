import CustomRouter from "../custom.router.js"
import passport from "../../middlewares/passport.mid.js"
import passportCallback from "../../middlewares/passportCallback.mid.js"
import { register, login, online, signout, badAuth, google, verifyEmail, passwordRecovery, changePassword } from "../../controllers/auth.controller.js"

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
    this.read("/verify/:email/code/:verifyCode", ["PUBLIC"], verifyEmail)
    this.read("/passwordRecovery/:email", ["PUBLIC"], passwordRecovery)
    this.update("/changePassword", ["PUBLIC"], changePassword)
  }
}

const authRouter = new AuthRouter()

export default authRouter.getRouter()