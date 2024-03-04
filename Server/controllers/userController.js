const userSchema = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const {
	getStorage,
	ref,
	uploadBytes,
	getDownloadURL,
} = require("firebase/storage");

const firebase = require("firebase/app");

const { FirebaseError, initializeApp } = require("firebase/app");
const firebaseConfig = {
	apiKey: "AIzaSyCtvC3uDcF6gaftbArQBpzvOZGSbpEfFL4",
	authDomain: "codelab-95a3d.firebaseapp.com",
	projectId: "codelab-95a3d",
	storageBucket: "codelab-95a3d.appspot.com",
	messagingSenderId: "109412438316",
	appId: "1:109412438316:web:b4b6acec0e7062599e9c89",
	measurementId: "G-TKNFEJ7WHE",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = getStorage();

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
		const { name, headline, bio , email , avatar } = req.body;
		const file = base64ImageToBlob(avatar);
		const storageRef = ref(
			storage,
			"avatar/" + Date.now() + "." + file.type.split("/")[1]
		);

		uploadBytes(storageRef, file).then((snapshot) => {
			console.log("Uploaded file!");
			getDownloadURL(snapshot.ref).then(async (item) => {
				thumbnailLink = item;
				try{
					const user = await userSchema.findOneAndUpdate({ email: email },{
						name : name,
						bio : bio,
						title : headline,
						avatar : item
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
			})
		})
		
	},
	getProfile : async (req,res) =>{
        try{
            const data = await userSchema.find({email : req.body.email})
			console.log(data)
            res.json(data)
        }catch(error){
            console.log(error);

        }
    },

};


function base64ImageToBlob(str) {
	// extract content type and base64 payload from original string
	var pos = str.indexOf(";base64,");
	var type = str.substring(5, pos);
	var b64 = str.substr(pos + 8);

	// decode base64
	var imageContent = atob(b64);

	// create an ArrayBuffer and a view (as unsigned 8-bit)
	var buffer = new ArrayBuffer(imageContent.length);
	var view = new Uint8Array(buffer);

	// fill the view, using the decoded base64
	for (var n = 0; n < imageContent.length; n++) {
		view[n] = imageContent.charCodeAt(n);
	}

	// convert ArrayBuffer to Blob
	var blob = new Blob([buffer], { type: type });

	return blob;
}

