const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    gender: {
        type: String,
    },
    age: {
        type: Number,
    },
    weight: {
        type: Number
    },
    height: {
        type: Number,
    },
    targetCalory: {
        type: Number
    }

}, { timestamps: true })


userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
})

userSchema.methods.comparePassword = async function (condidatePassword) {
    return bcrypt.compare(condidatePassword, this.password).catch(e => false)
}

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id, name: this.name, email: this.email, gender: this.gender, age: this.age, height: this.height, weight: this.weight, targetCalory: this.targetCalory }, process.env.SECRET_KEY, {
            expiresIn: 7 * 24 * 60 * 60 // 1 week 
        })
        return token;
    } catch (error) {
        console.log(error)
    }
}

const User = mongoose.models.User || mongoose.model('User', userSchema)

module.exports = User