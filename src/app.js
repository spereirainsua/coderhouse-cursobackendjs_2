import express from "express"
import http from "http"
import { Server } from "socket.io"
import { engine } from "express-handlebars"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import viewsRouter from "./routes/views.router.js"
import connectMongoDB from "./db/db.js"
import errorHandler from "./middlewares/errorHandler.mid.js"

const PORT = 8080
const app = express()
const server = http.createServer(app)
const io = new Server(server)

// Middlewares
app.use(express.json())
app.use(express.urlencoded( { extended: true } ))
app.use(express.static("public"))

// Declarar motor de plantilla
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

// Routers
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/", viewsRouter(io))
app.use(errorHandler)

// Conexión con DB
connectMongoDB()

server.listen( PORT , () => console.log("Servidor iniciado en: http://localhost:"+PORT))