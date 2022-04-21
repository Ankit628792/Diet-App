require('dotenv').config()
const cors = require('cors');
const express = require("express");

const app = express();
const port = process.env.PORT || 5000;
require('./db')

app.use(express.json({ limit: '10mb' }))
app.use(cors())

const user = require('./api/user.route')
const session = require('./api/session.route')

app.use('/api/user', user)
app.use('/api/session', session)
app.get('/login', (req,res) => {
    console.log('hello from server')
})

app.listen(port, () => {
    console.log("Server is running is port: " + port);
});