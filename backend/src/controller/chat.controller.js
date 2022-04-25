const { getAllChat, getAllMessages, newMessage } = require("../service/chat.service");
const { newChat, getChat, updateChat, deleteChat } = require("../service/chat.service");

let message = {
    create: async (req, res) => {
        try {
            const data = await newMessage(req.body)
            res.status(201).send({ msg: 'Chat Registered Successfully!', data: data })
        } catch (error) {
            console.error(error)
            res.status(400).send({ msg: "Couldn't make request" })
        }
    },
    findAll: async (req, res) => {
        const { groupId } = req.params;
        if (!groupId) return res.status(404).send({ msg: "Couldn't get chat" })
        const query = { groupId: groupId }
        try {
            const chat = await getAllMessages(query);
            if (chat) {
                res.status(200).send(chat)
            }
            else res.status(404).send({ msg: 'Chat Not found' })
        } catch (error) {
            console.error(error)
            res.status(400).send({ msg: "Couldn't make request" })
        }
    },

};
let group = {
    create: async (req, res) => {
        const { groupName } = req.body
        if (!groupName) return res.status(400).send({ msg: 'Group Name is Required' })
        try {
            if (!(await getChat({ groupName }))) {
                const data = await newChat(req.body)
                res.status(201).send({ msg: 'Group Created Successfully!', data: data })
            } else {
                res.status(403).send({ msg: 'Group already exist with this name' })
            }
        } catch (error) {
            console.error(error)
            res.status(400).send({ msg: "Couldn't make request" })
        }
    },
    update: async (req, res) => {
        const { groupId } = req.body
        try {
            if (await getChat({ _id: groupId })) {
                const data = await updateChat(groupId, req.body)
                res.status(200).send({ msg: 'Joined Group Successfully!', data: data })
            } else {
                res.status(404).send({ msg: "Couldn't update group currently" })
            }
        } catch (error) {
            console.error(error)
            res.status(400).send({ msg: "Couldn't make request" })
        }
    },

    find: async (req, res) => {
        const { groupId } = req.params;
        if (!groupId) return res.status(404).send({ msg: "Couldn't get Details" })

        try {
            const chat = await getChat({ _id: groupId });
            if (!chat) res.status(401).send({ msg: 'Chat no found' })
            else
                res.status(200).send(chat)
        } catch (error) {
            console.error(error)
            res.status(400).send({ msg: "Couldn't make request" })
        }
    },

    findAll: async (req, res) => {
        try {
            const chat = await getAllChat();
            if (chat.length > 0) {
                res.status(200).send(chat)
            }
            else res.status(404).send({ msg: 'Chat Not found' })
        } catch (error) {
            console.error(error)
            res.status(400).send({ msg: "Couldn't make request" })
        }
    },

};

module.exports = { group, message };