import dao from "../dao/index.factory.js"
import sendEmail from "../helpers/registerEmail.helper.js"
import { createHash } from "../helpers/hash.helper.js"
import crypto from "crypto"

const { usersManager } = dao

const register = async (req, res) => {
    res.json201()
}

const login = async (req, res) => {
    const opts = { maxAge: 60 * 60 * 24 * 7, httpOnly: true }
    res.cookie("token", req.token, opts).json200()
}

const online = async (req, res) => {
    res.json200(req.user._id)
}

const signout = async (req, res) => {
    res.clearCookie("token").json200(null, "Signed out")
}

const badAuth = async (req, res) => {
    res.json401("Bad auth from redirect")
}

const google = async (req, res) => {
    const opts = { maxAge: 60 * 60 * 24 * 7, httpOnly: true }
    req.token = req.user.token
    const token = req.token
    res.cookie("token", token, opts).redirect("/")
}

const verifyEmail = async (req, res) => {
    const { email, verifyCode } = req.params
    const user = await usersManager.readBy({ email, verifyCode })
    if (!user) res.json401()
    await usersManager.updateById(user._id, { isVerify: true })
    res.json200("Verified!")
}

const passwordRecovery = async (req, res) => {
    const { email } = req.params
    const user = await usersManager.readBy({ email })
    if (!user) res.json401()
    const verificationUrl = `${req.protocol}://${req.get('host')}/resetPassword/${user.verifyCode}`
    await sendEmail.ofRecovery({ email, verificationUrl })
    res.json200("OK!")
}

const changePassword = async (req, res) => {
    const { newPassword, verifyCode } = req.body
    const user = await usersManager.readBy({ verifyCode })
    if (!user) res.json403("Bad user code")
    const password = createHash(newPassword)
    const newVerifyCode = crypto.randomBytes(12).toString("hex")
    const response = await usersManager.updateById(user._id, { password, verifyCode: newVerifyCode })
    res.json200()
}

export { register, login, online, signout, badAuth, google, verifyEmail, passwordRecovery, changePassword }