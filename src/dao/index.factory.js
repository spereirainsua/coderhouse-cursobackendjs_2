import connectMongoDB from "../helpers/db.js"

const { PERSISTENCE } = process.env

let dao = {}

switch (PERSISTENCE) {
    case "fs":
        const { usersManager } = await import("./fs/Manager.fs.js")
        const { productsManager } = await import("./fs/ProductsManager.fs.js")
        const { cartsManager } = await import("./fs/CartsManager.fs.js")
        dao = { usersManager, productsManager, cartsManager }
        break;

    default: {
        // Conexión con DB
        connectMongoDB(process.env.URI_MONGODB)
        const { usersManager } = await import("./mongo/UsersManager.js")
        const { productsManager } = await import("./mongo/ProductsManager.js")
        const { cartsManager } = await import("./mongo/CartsManager.js")
        dao = { usersManager, productsManager, cartsManager }
    }
        break;
}

export default dao