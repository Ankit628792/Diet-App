const jwt = require('jsonwebtoken')

function decode(req, res) {
    console.log(req.header);
    const token = req.header('token')
    // console.log(token)
    if (!token) {
        res.status(402).send({ msg: 'token required' })
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        return { valid: true, expired: false, decoded }
    } catch (e) {
        console.error({ e })
        return {
            decoded: null
        }
    }
}

const requiresUser = async (req, res, next) => {
    const { decoded } = decode(req, res)
    req.user = decoded
    return next()
}
module.exports = requiresUser