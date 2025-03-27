import { genSaltSync, hashSync, compareSync } from "bcrypt"

const createHash = (password) => {
    const salt = genSaltSync(10)
    return hashSync(password, salt)
}

const isValidPass = (reqPass, dbPass) => compareSync(reqPass, dbPass)

export { createHash, isValidPass }