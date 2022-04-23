const mongoose = require('mongoose')

const dietSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId },
    slot: { type: String },
    day: { type: String },
    type: { type: String },
    items: { type: Array }
}, { timestamps: true })

const Diet = mongoose.models.Diet || mongoose.model('Diet', dietSchema)

module.exports = Diet