const { createSession, removeSession } = require("../service/session.service");

let session = {

    create: async (req, res) => {
        const credentials = req.body
        try {
            const token = await createSession(credentials);
            if (!token) res.status(400).send({ msg: 'Invalid Credentials' })
            else
                res.status(201).send({ token: token });
        } catch (error) {
            console.error(error)
            res.status(400).send({ msg: "Couldn't make request" })
        }
    },
};

module.exports = session;