const { newDiet, getDiet, deleteDiet } = require("../service/diet.service");

let diet = {

    create: async (req, res) => {
        try {
            const diet = await newDiet(req.body)
            res.status(201).send({ msg: 'Diet Registered Successfully!', data: diet })
        } catch (error) {
            console.error(error)
            res.status(400).send({ msg: "Couldn't make request" })
        }
    },

    find: async (req, res) => {
        const { _id } = req.user;
        if (!_id) return res.status(404).send({ msg: "Couldn't get user" })

        try {
            const diet = await getDiet({ userId: _id });
            if (!diet) return res.status(400).send({ msg: "You've created any diet yet" })
            else
                res.status(200).send(diet)
        } catch (error) {
            console.error(error)
            res.status(400).send({ msg: "Couldn't make request" })
        }
    },

    delete: async (req, res) => {
        const { _id } = req.body;
        if (!_id) return res.status(404).send({ msg: "Couldn't get diet" })
        try {
            if (await getDiet({ _id: _id })) {
                await deleteDiet(_id)
                res.status(200).send({ msg: 'Diet removed Successfully!' })
            } else {
                res.status(404).send({ msg: "Couldn't get diet" })
            }
        } catch (error) {
            console.error(error)
            res.status(400).send({ msg: "Couldn't make a request" })
        }
    }

};

module.exports = diet;