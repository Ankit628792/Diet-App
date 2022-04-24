const { newUser, getUser, updateUser, deleteUser } = require("../service/user.service");

let user = {

    create: async (req, res) => {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(406).send({ msg: 'Fill all the details!' })
        try {
            if (!(await getUser({ email }))) {
                const token = await newUser(req.body)
                res.status(201).send({ msg: 'User Registered Successfully!', token: token })
            } else {
                res.status(403).send({ msg: 'User already exist with this email id' })
            }
        } catch (error) {
            console.error(error)
            res.status(400).send({ msg: "Couldn't make request" })
        }
    },

    find: async (req, res) => {
        const { _id } = req.user;
        if (!_id) return res.status(404).send({ msg: "Couldn't get user" })

        try {
            const user = await getUser({ _id: _id });
            if (!user) return res.status(401).send({ msg: 'User Unauthorised' })
            else
                return res.status(200).send(user)
        } catch (error) {
            console.error(error)
            res.status(400).send({ msg: "Couldn't make request" })
        }
    },

    update: async (req, res) => {
        const { _id, email } = req.user;
        if (!email || !_id) return res.status(406).send({ msg: 'insufficient the details!' });

        try {
            if (await getUser({ _id: _id })) {
                const token = await updateUser(_id, req.body)
                res.status(200).send({ msg: 'User Updated Successfully!', token: token })
            } else {
                res.status(404).send({ msg: "Couldn't update user currently" })
            }
        } catch (error) {
            console.error(error)
            res.status(400).send({ msg: "Couldn't make request" })
        }
    },

    delete: async (req, res) => {
        const { _id } = req.user;
        if (!_id) return res.status(404).send({ msg: "Couldn't get user" })
        try {
            if (await getUser({ _id: _id })) {
                await deleteUser(_id)
                res.status(200).send({ msg: 'User removed Successfully!' })
            } else {
                res.status(404).send({ msg: "Couldn't get user" })
            }
        } catch (error) {
            console.error(error)
            res.status(400).send({ msg: "Couldn't make a request" })
        }
    }

};

module.exports = user;