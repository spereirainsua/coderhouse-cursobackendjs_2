import express from "express"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"

const app = express()
//para recibir datos en formato json
app.use(express.json())
//para recibir envios desde un formulario
app.use(express.urlencoded( { extended: true } ))

//routes
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

app.listen( 8080 , () => console.log("Servidor iniciado en: http://localhost:8080"))
