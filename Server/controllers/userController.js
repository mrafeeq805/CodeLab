const userSchema = require("../models/user");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const {
	getStorage,
	ref,
	uploadBytes,
	getDownloadURL,
} = require("firebase/storage");
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "codelabzsolutions@gmail.com",
		pass: "oztr esvf zkxw egpc",
	},
});

const firebase = require("firebase/app");

const { FirebaseError, initializeApp } = require("firebase/app");
const { createSecretToken } = require("../util/secretToken");
const { use } = require("../routes/userRouter");
const isBase64 = require("is-base64");
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
			const token = createSecretToken(user._id);
			res.cookie("token", token, {
				withCredentials: true,
				httpOnly: false,
			});
			let lastid;
			const id = await userSchema.find().sort({ _id: -1 }).limit(1);
			if (id.length > 0) {
				lastid = Number(id[0].publisher_id.replace("CD", "")) + 1;
			} else {
				lastid = "CD1";
			}
			console.log(lastid);
			bcrypt.hash(password, saltRounds, async function (err, hash) {
				const newuser = new userSchema({
					name: name,
					email: email,
					password: hash,
					avatar: "",
					projects: [],
					bio: "",
					title: "",
					publisher_id: "CD" + lastid,
					status: "Active",
				});
				newuser.save();
				const user = await userSchema.find({ email: email });
				const token = createSecretToken(user._id);
				res.cookie("token", token, {
					withCredentials: true,
					httpOnly: false,
				});
				req.session.email = email;
				req.session.publisher_id = "CD" + (lastid + 1);
				res.json({
					result: "success",
					token: token,
				});
			});
		} else {
			res.json({
				result: "account aleady exist !",
			});
		}
	},
	login: async (req, res) => {
		const { email, password } = req.body;
		const user = await userSchema.find({ email: email });
		if (user.length === 1) {
			const hash = user[0].password;
			const token = createSecretToken(user._id);
			res.cookie("token", token, {
				withCredentials: true,
				httpOnly: false,
			});
			bcrypt.compare(password, hash, function (err, result) {
				if (result) {
					if (user[0].status === "Blocked")
						return res.json({ result: "user blocked" });
					req.session.email = email;
					req.session.publisher_id = user[0].publisher_id;
					res.json({
						result: "success",
						token: token,
					});
				} else {
					res.json({
						result: "incorrect password",
					});
				}
			});
		} else {
			res.json({
				result: "account not found",
			});
		}
	},
	editProfile: async (req, res) => {
		const { name, headline, bio,email, avatar } = req.body;
		console.log(avatar);
		var file = "";
		const call = async (item) => {
			try {
				const user = await userSchema.findOneAndUpdate(
					{ email: req.session.email },
					{
						name: name,
						bio: bio,
						title: headline,
						avatar: item,
					}
				);
				res.json({
					result: "updated",
				});
			} catch (err) {
				console.log(err);
				res.json({
					result: err,
				});
			}
		};
		if (avatar) {
			if (!isValidUrl(avatar)) {
				file = base64ImageToBlob(avatar);
				const storageRef = ref(
					storage,
					"avatar/" + Date.now() + "." + file.type.split("/")[1]
				);
				uploadBytes(storageRef, file).then((snapshot) => {
					console.log("Uploaded file!");
					getDownloadURL(snapshot.ref).then(async (item) => {
						thumbnailLink = item;
						call(item);
					});
				});
			}else{
				console.log('not base64');
				file = avatar;
				call(file);
			}

			
		} else {
			file = avatar;
			call(file);
		}
		
	},
	getProfile: async (req, res) => {
		try {
			const data = await userSchema.findOne(
				{ email: req.session.email },
				{
					password: 0,
					_id: 0,
					email: 0,
				}
			);
			
			res.json({
				status: true,
				data: data,
			});
		} catch (error) {
			console.log(error);
		}
	},
	sendOtp: async (req, res) => {
		try {
			const { email } = req.body;
			const user = await userSchema.findOne({ email: email });
			if (!user) {
				return res.json({
					result: "user not found",
				});
			}
			req.session.otp = generateOTP();
			req.session.email_entered = email;
			const mailOptions = {
				from: "codelabzsolutions@gmail.com",
				to: email,
				subject: "Reset Password OTP",
				text: `${req.session.otp} is your OTP to reset your account password`,
			};
			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					return res.json({
						result: error,
					});
				} else {
					res.json({
						result: "email sent",
					});
				}
			});
		} catch (error) {
			return res.json({
				result: error,
			});
		}
	},
	verifyOtp: async (req, res) => {
		try {
			const { otp } = req.body;
			const user = await userSchema.findOne({
				email: req.session.email_entered,
			});
			if (!user) {
				return res.json({
					result: "not authorized",
				});
			}
			console.log(req.session.otp);
			if (otp === req.session.otp) {
				req.session.verified = true;
				res.json({
					result: "verified",
				});
			} else {
				res.json({
					result: "invalid otp",
				});
			}
		} catch (error) {
			return res.json({
				result: error,
			});
		}
	},
	setPassword: async (req, res) => {
		try {
			const { password } = req.body;
			const user = await userSchema.findOne({
				email: req.session.email_entered,
			});
			if (!user) {
				return res.json({
					result: "not authorized",
				});
			}
			console.log(req.session.verified);
			if (req.session.verified) {
				bcrypt.hash(password, saltRounds, async function (err, hash) {
					try {
						const user = await userSchema.findOneAndUpdate(
							{
								email: req.session.email_entered,
							},
							{
								password: hash,
							}
						);
						req.session.email_entered = "";
						req.session.verified = false;
						res.json({
							result: "updated",
							email: user.email,
						});
					} catch (err) {
						res.json({
							result: err,
						});
					}
				});
			} else {
				res.json({
					result: "something went wrong !",
				});
			}
		} catch (error) {
			return res.json({
				result: error,
			});
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
function generateOTP() {
	// Declare a digits variable
	// which stores all digits
	let digits = "0123456789";
	let OTP = "";
	for (let i = 0; i < 6; i++) {
		OTP += digits[Math.floor(Math.random() * 10)];
	}
	return OTP;
}
const isValidUrl = (str) => {
	const pattern = new RegExp(
		"^([a-zA-Z]+:\\/\\/)?" + // protocol
			"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
			"((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
			"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
			"(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
			"(\\#[-a-z\\d_]*)?$", // fragment locator
		"i"
	);
	return pattern.test(str);
};
