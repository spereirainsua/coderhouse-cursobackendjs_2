import { config } from "dotenv"
import args from "./arguments.helper.js"

const { mode } = args
const path = ".env" + (mode && "." + mode)
config({ path })
const URI_MONGODB = process.env.URI_MONGODB
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const JWT_SECRET = process.env.JWT_SECRET
const SERVER_PORT = process.env.SERVER_PORT
const COOKIE_KEY = process.env.COOKIE_KEY
const GOOGLE_EMAIL = process.env.GOOGLE_EMAIL
const GOOGLE_PASS = process.env.GOOGLE_PASS
const PERSISTENCE = process.env.PERSISTENCE

const env = {
    URI_MONGODB,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    JWT_SECRET,
    SERVER_PORT,
    COOKIE_KEY,
    GOOGLE_EMAIL,
    GOOGLE_PASS,
    PERSISTENCE
}

export default env