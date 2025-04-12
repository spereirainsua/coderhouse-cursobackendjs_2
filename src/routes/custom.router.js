import { Router } from "express"
import { Types } from "mongoose"
import setupResponses from "../middlewares/setupResponses.mid.js"
import setupPolicies from "../middlewares/setupPolicies.mid.js"

class CustomRouter {
    constructor() {
        this.router = Router()
        this.use(setupResponses)
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

    validateObjectId = (req, res, next, value, paramName) => {
        try {
            const isObjectId = Types.ObjectId.isValid(value)
            if (isObjectId) return next()
            const error = new Error("Invalid ID "+paramName)
            error.statusCode = 400
            throw error
        } catch (error) {
            next(error)
        }
    }

    create = (path, policies, ...arrayCallBacks) => this.router.post(path, setupPolicies(policies), this.applyMiddlewares(arrayCallBacks))
    read = (path, policies, ...arrayCallBacks) => this.router.get(path, setupPolicies(policies), this.applyMiddlewares(arrayCallBacks))
    update = (path, policies, ...arrayCallBacks) => this.router.put(path, setupPolicies(policies), this.applyMiddlewares(arrayCallBacks))
    destroy = (path, policies, ...arrayCallBacks) => this.router.delete(path, setupPolicies(policies), this.applyMiddlewares(arrayCallBacks))
    use = (path, ...arrayCallBacks) => this.router.use(path, this.applyMiddlewares(arrayCallBacks))
    validateId = (param) => this.router.param(param, this.validateObjectId)
}

export default CustomRouter