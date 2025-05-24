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
    const response = req.user
    const token = req.token
    res.cookie("token", token, opts).json200()
}

export { register, login, online, signout, badAuth, google }