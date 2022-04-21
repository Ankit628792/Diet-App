const User = require('../model/user.model');

let sessionService = {

    createSession: async (credentials) => {
        try {
            const user = await User.findOne({ email: credentials.email })
            if (!user) return false
            const isValid = await user.comparePassword(credentials.password)
            if (!isValid) return false
            const token = await user.generateAuthToken();
            return token
        } catch (error) {
            throw new Error(error)
        }
    },

    removeSession: async () => {
        console.log('Remove session')
    }

};

module.exports = sessionService;