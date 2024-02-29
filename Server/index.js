const express = require('express')
const app = express()
const cors = require("cors")
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.get('/',(req,res)=>{
    res.send("de")
})
app.post('/addproject',(req,res)=>{
    console.log(req.body);
    res.json(req.body.name)
})

app.listen(4000,()=>{
    console.log("started");
})