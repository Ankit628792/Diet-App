const mongoose = require('mongoose')

const DB = process.env.DATABASE_KEY;
mongoose.connect(DB).then(() => {
    console.log('Mongodb Atlas Connected Successfully !')
}).catch((e) => {
    console.log(e)
})