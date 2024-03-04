const userSchema = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
	createaccount: async (req, res) => {
		const { name, email, password } = req.body;
		const user = await userSchema.find({ email: email });
		if (user.length === 0) {
			bcrypt.hash(password, saltRounds, function (err, hash) {
				const newuser = new userSchema({
					name: name,
					email: email,
					password: hash,
					avatar: "",
					projects: [],
					bio: "",
					title: "",
				});
				newuser.save();
				res.json({
					result : "success"
				});
			});
		}else{
			res.json({
				result : "account aleady exist !"
			})
		}
	},
    login : async (req, res) => {
		const { email, password } = req.body;
		const user = await userSchema.find({ email: email });
		if (user.length === 1) {
            const hash = user[0].password
			bcrypt.compare(password, hash, function(err, result) {
                if(result){
                    res.json({
						result : "success",
					})
                }else{
					res.json({
						result : "incorrect password",
					})
				}
            });
		}else{
			res.json({
				result : "account not found",
			})
		}
	},
	editProfile : async (req, res) => {
		const { name, headline, bio , email } = req.body;
		try{
			const user = await userSchema.findOneAndUpdate({ email: email },{
				name : name,
				bio : bio,
				title : headline
			});
			res.json({
				result : "updated"
			})
		}catch (err){
			console.log(err);
			res.json({
				result : err
			})
		}
	}
};
