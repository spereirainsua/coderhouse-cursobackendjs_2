import { Router } from "express"
import { Types } from "mongoose"

class CustomRouter {
    constructor() {
        this.router = Router()
    }

    getRouter = () => this.router

    applyMiddlewares = (arrayCallBacks) => {
        return arrayCallBacks.map(cb => async (req, res, next) => {
            try {
                await cb(req, res, next)
            } catch (error) {
                next(error)
            }
        })
    }

    validateObjectId = (req, res, next, id) => {
        try {
            const isObjectId = Types.ObjectId.isValid(id)
            if (isObjectId) return next()
            const error = new Error("Invalid ID")
            error.statusCode = 400
            throw error
        } catch (error) {
            next(error)
        }
    }

    create = (path, ...arrayCallBacks) => this.router.post(path, this.applyMiddlewares(arrayCallBacks))
    read = (path, ...arrayCallBacks) => this.router.get(path, this.applyMiddlewares(arrayCallBacks))
    update = (path, ...arrayCallBacks) => this.router.put(path, this.applyMiddlewares(arrayCallBacks))
    destroy = (path, ...arrayCallBacks) => this.router.delete(path, this.applyMiddlewares(arrayCallBacks))
    use = (path, ...arrayCallBacks) => this.router.use(path, this.applyMiddlewares(arrayCallBacks))
    validateId = (param) => this.router.param(param, this.validateObjectId)
}

export default CustomRouter