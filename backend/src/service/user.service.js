const User = require('../model/user.model')

let userService = {
    getUser: async (query) => {
        try {
            return await User.findOne(query, { password: 0, _v: 0 }).lean();
        } catch (error) {
            throw new Error(error)
        }
    },
    newUser: async (input) => {
        try {
            const user = new User(input);
            const savedUser = await user.save()
            const token = await savedUser.generateAuthToken();
            return token
        } catch (error) {
            throw new Error(error)
        }
    },
    updateUser: async (_id, input) => {
        try {
            return await User.findOneAndUpdate({ _id: _id }, input, { new: true })
        } catch (error) {
            throw new Error(error)
        }
    },
    deleteUser: async (_id) => {
        try {
            const data = await User.findByIdAndDelete({ _id: _id })
            return data
        } catch (error) {
            throw new Error(error)
        }
    }
};

module.exports = userService;