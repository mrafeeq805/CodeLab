const userSchema = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;




module.exports = {
	createaccount: async (req, res) => {
        const {name,email,password} = req.body
        bcrypt.hash(password, saltRounds, function(err, hash) {
            const newuser = new userSchema({
                name : name,
                email : email,
                password : hash,
                avatar : '',
                projects : [],
                bio : '', 
                title : ''
            })
            newuser.save()
            res.json()
        });
        
        
		
	},
    
};


