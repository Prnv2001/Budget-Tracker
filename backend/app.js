const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const bodyparser = require('body-parser')
const helmet = require('helmet')
const app = express()
const passport = require('passport')
const passportConfig = require('./passport')

require('dotenv').config()

const PORT = 5000

//middlewares
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))
app.use(cors())


//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()