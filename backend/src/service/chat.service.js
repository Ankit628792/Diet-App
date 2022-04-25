const Chat = require('../model/chat.model');
const Message = require('../model/message.model');

let chatService = {
    getAllChat: async () => {
        try {
            return await Chat.find().sort({ updatedAt: -1 }).lean();
        } catch (error) {
            throw new Error(error)
        }
    },
    newMessage: async (input) => {
        try {
            const message = new Message(input);
            return await message.save()
        } catch (error) {
            throw new Error(error)
        }
    },
    getAllMessages: async (query) => {
        try {
            return await Message.find(query).populate({ path: 'sender', select: 'name' }).lean();
        } catch (error) {
            throw new Error(error)
        }
    },
    getChat: async (query) => {
        try {
            return await Chat.findOne(query, { _v: 0 }).lean();
        } catch (error) {
            throw new Error(error)
        }
    },
    newChat: async (input) => {
        try {
            const chat = new Chat(input);
            return await chat.save()
        } catch (error) {
            throw new Error(error)
        }
    },
    updateChat: async (_id, input) => {
        try {
            return await Chat.findByIdAndUpdate({ _id: _id }, input, { new: true })
        } catch (error) {
            throw new Error(error)
        }
    },
    deleteChat: async (_id) => {
        try {
            const data = await Chat.findByIdAndDelete({ _id: _id })
            return data
        } catch (error) {
            throw new Error(error)
        }
    }
};

module.exports = chatService;