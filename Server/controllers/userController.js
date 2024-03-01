const userSchema = require("../models/user");
const mongoose = require("mongoose");


module.exports = {
	createaccount: async (req, res) => {
        const {name,email,password} = req.body
        const newuser = new userSchema({
            name : name,
            email : email,
            password : password
        })
        newuser.save()
        res.json()
		
	},
    
};


