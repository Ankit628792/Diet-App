const jwt = require('jsonwebtoken')

function decode(req, res) {
    const token = req.header('token')
    // console.log(token)
    if (!token) {
        return res.status(402).send({ msg: 'Invalid token or token Expired!' })
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        return { valid: true, expired: false, decoded }
    } catch (e) {
        console.error({ e })
        res.status(401).send('User unauthorized')
        return {
            decoded: null
        }
    }
}

const requiresUser = async (req, res, next) => {
    const { decoded } = decode(req, res)
    if (!decoded) {
        res.status(401).send('User unauthorized')
    }
    req.user = decoded
    return next()
}
module.exports = requiresUser