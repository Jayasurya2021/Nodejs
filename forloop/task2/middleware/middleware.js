const authMiddleware = (req, res, next) => {
    console.log("middle ware checked")
    next()
}

const loginMiddleware = (req, res, next) => {
    const login = true
    if (login) {
        console.log("login succesfull")
        next()
    }
}

module.exports = {
    authMiddleware,
    loginMiddleware
}