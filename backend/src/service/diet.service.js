const Diet = require('../model/diet.model')

let dietService = {
    getDiet: async (query) => {
        try {
            return await Diet.find(query, { _v: 0 }).lean();
        } catch (error) {
            throw new Error(error)
        }
    },
    newDiet: async (input) => {
        try {
            const diet = new Diet(input);
            return await diet.save()
        } catch (error) {
            throw new Error(error)
        }
    },
    deleteDiet: async (_id) => {
        try {
            const data = await Diet.findByIdAndDelete({ _id: _id })
            return data
        } catch (error) {
            throw new Error(error)
        }
    }
};

module.exports = dietService;