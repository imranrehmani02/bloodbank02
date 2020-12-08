const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const server = express()

const userRouter = require('./server/controller/UserRouter')

server.use(express.static(path.join(__dirname,"dist/MyApp")))
server.use(bodyParser.json())
server.use(cookieParser())
server.use(session({secret:"ratlam43"})) //session secret key

server.use("/user",userRouter)

server.listen(2000,function()
{
    console.log("http://localhost:2000")
})