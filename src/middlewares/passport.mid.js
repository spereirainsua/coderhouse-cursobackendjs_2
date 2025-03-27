import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"

passport.use("register", new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    (req, email, password, done) => {
        
     }
))
passport.use("login", new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    (req, email, password, done) => {
        
     }
))
