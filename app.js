import express from "express"
import http from "http"
import { Server } from "socket.io"
import { engine } from "express-handlebars"
import cookieParser from "cookie-parser"
import connectMongoDB from "./src/helpers/db.js"
import apiRouter from "./src/routes/api.router.js"
import viewsRouter from "./src/routes/views.router.js"
import errorHandler from "./src/middlewares/errorHandler.mid.js"
import pathHandler from "./src/helpers/pathHandler.mid.js"


const PORT = process.env.SERVER_PORT || 8080
const app = express()
const server = http.createServer(app)
const io = new Server(server)

server.listen( PORT , () => console.log("Servidor iniciado en: http://localhost:"+PORT))

// Conexión con DB
connectMongoDB()

// Middlewares
app.use(cookieParser(process.env.COOKIE_KEY))
app.use(express.json())
app.use(express.urlencoded( { extended: true } ))
app.use(express.static("public"))

// Declarar motor de plantilla
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

// Routers
app.use("/api", apiRouter)
app.use("/", viewsRouter)
app.use(errorHandler)
app.use(pathHandler)