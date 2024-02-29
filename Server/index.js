const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.send("de")
})

app.listen(4000,()=>{
    console.log("started");
})