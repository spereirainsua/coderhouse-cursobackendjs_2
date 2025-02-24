import dotenv from "dotenv"
import express from "express"
import http from "http"
import { Server } from "socket.io"
import { engine } from "express-handlebars"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import viewsRouter from "./routes/views.router.js"
import connectMongoDB from "./db/db.js"

dotenv.config()

const PORT = 8080
const app = express()
const server = http.createServer(app)
const io = new Server(server);

//para recibir datos en formato json
app.use(express.json())
//para recibir envios desde un formulario
app.use(express.urlencoded( { extended: true } ))

app.use(express.static("public"))

// Declarar motor de plantilla
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

//routes
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/", viewsRouter(io))

connectMongoDB()

server.listen( PORT , () => console.log("Servidor iniciado en: http://localhost:"+PORT))