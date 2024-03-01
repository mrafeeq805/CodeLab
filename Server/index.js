const express = require('express')
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const userrouter = require('./routes/userRouter')
const mongoose = require("mongoose")
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

mongoose.connect('mongodb://127.0.0.1:27017/codelab')
.then(() => {
    console.log("database connected");
})
.catch(() =>{
    console.log("error on connecting db")
})

app.use("/user",userrouter)

app.get('/',(req,res)=>{
    res.send("de")
})



app.listen(4000,()=>{
    console.log("started");
})