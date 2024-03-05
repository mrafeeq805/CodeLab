const express = require('express')
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const userrouter = require('./routes/userRouter')
const mongoose = require("mongoose")
const session = require('express-session');

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(session({
    secret: 'your-secret-key', // Change this to a secure random string
    resave: false,
    saveUninitialized: true,
  }));

mongoose.connect('mongodb://127.0.0.1:27017/codelab')
.then(() => {
    console.log("database connected");
})
.catch(() =>{
    console.log("error on connecting db")
})

app.use("/",userrouter)

app.listen(4000,()=>{
    console.log("started");
})