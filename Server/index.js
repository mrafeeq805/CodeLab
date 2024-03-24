const express = require('express')
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const userrouter = require('./routes/userRouter')
const adminrouter = require('./routes/adminRouter')
const mongoose = require("mongoose")
const session = require('express-session');
const cookieParser = require("cookie-parser");

app.use(cors())
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(session({
    secret: process.env.SESSION_KEY, // Change this to a secure random string
    resave: false,
    saveUninitialized: true,
  }));

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("database connected");
})
.catch(() =>{
    console.log("error on connecting db")
})


app.use("/",userrouter)
app.use("/admin",adminrouter)

app.listen(4000,()=>{
    console.log("started");
})