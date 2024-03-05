const projectSchema = require("../models/project");
const userSchema = require("../models/user");
const mongoose = require("mongoose");
const multer = require("multer");
const {
	getStorage,
	ref,
	uploadBytes,
	getDownloadURL,
} = require("firebase/storage");
const OpenAI = require("openai");
require('dotenv').config();

const openai = new OpenAI({
	apiKey: process.env.OPEN_AI_API,
});

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

const upload = multer({ storage: multer.memoryStorage() });

module.exports = {
	addproject: async (req, res) => {
		const currentDate = new Date();
		const day = currentDate.getDate();
		const month = currentDate.getMonth() + 1; // Add 1 as months are zero-based
		const year = currentDate.getFullYear();
		const date2 = `${month}-${day}-${year}`;
		let lastid;
		const id = await projectSchema.find().sort({ _id: -1 }).limit(1);
		if (id.length > 0) {
			lastid = id[0].project_id;
		} else {
			lastid = 0;
		}
		//console.log(base64ImageToBlob(req.body.thumbnail));
		const fileList = req.body.screenshots;
		var screenshotsLinks = [];
		var thumbnailLink = "";
		const {
			title,
			category,
			link,
			overview,
			languages,
			db,
			features,
			project_link,
		} = req.body;
		fileList.map((item) => {
			const file = base64ImageToBlob(item);
			const storageRef = ref(
				storage,
				"screenshots/" + Date.now() + "." + file.type.split("/")[1]
			);
			uploadBytes(storageRef, file).then((snapshot) => {
				console.log("uploaded");
				getDownloadURL(snapshot.ref).then((item) => {
					screenshotsLinks.push(item);
				});
			});
		});
		const file = base64ImageToBlob(req.body.thumbnail);
		const storageRef = ref(
			storage,
			"thumbnail/" + Date.now() + "." + file.type.split("/")[1]
		);

		uploadBytes(storageRef, file).then((snapshot) => {
			console.log("Uploaded file!");
			getDownloadURL(snapshot.ref).then(async (item) => {
				thumbnailLink = item;
				const response = await openai.chat.completions.create({
					model: "gpt-3.5-turbo",
					messages: [
						{
							role: "system",
							content:
								"You will be provided with a block of text, and your task is to extract a list of keywords from it. it will be given as comma seperated values..example task,new,store",
						},
						{
							role: "user",
							content: overview,
						},
					],
					temperature: 0.5,
					max_tokens: 64,
					top_p: 1,
				});


				const newProject = new projectSchema({
					title: title,
					project_id : lastid + 1,
					category: category,
					live_link: link,
					overview: overview,
					frameworks_used: languages,
					db_used: db,
					screenshots: screenshotsLinks,
					thumbnail: thumbnailLink,
					features: features,
					project_link: project_link,
					publisher: "rafeeq",
					published_date: date2,
					last_updated: date2,
					views: 0,
					downloads: 0,
					status: "Pending",
					price: "Free",
					keywords: title.split(" ").join(",") +" , "+ response?.choices[0]?.message?.content,
				});
				newProject.save();
				console.log(newProject);
			});
		});

		res.send("done");
	},
	getLatestList: async (req, res) => {
		try {
			const data = await projectSchema.find();
			res.json(data);
		} catch (error) {
			console.log(error);
		}
	},
	getTopDevelopers: async (req, res) => {
		try {
			const data = await userSchema.find();
			res.json(data);
		} catch (error) {
			console.log(error);
		}
	},
	getDescription: async (req, res) => {
		try {
			
			const data = await projectSchema.find({
				project_id: req.params.project_id,
			});
			const views = data?.[0]?.views + 1
			if (!req.session.viewed_posts) {
				req.session.viewed_posts = {};
			}
			if (!req.session.viewed_posts[req.params.project_id]) {
				req.session.viewed_posts[req.params.project_id] = 1; 
				//update session
				//increment post count in posts table with post id
				//update 'viewed_posts' column with new session 
				const update = await projectSchema.findOneAndUpdate({project_id : req.params.project_id},{views:views})
			}
			res.json(data);
		} catch (error) {
			console.log(error);
		}
	},
	getDeveloperProjects: async (req, res) => {
		try {
			const data = await projectSchema.find({ publisher: "rafeeq" });
			res.json(data);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	},
	getFavoriteProjects: async (req, res) => {
		try {
			const data = await projectSchema.find({
				project_id: { $in: req.body.id },
			});
			res.json(data);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	},
	searchProjects: async (req, res) => {
		try {
			const search = req.params.search
			const data = await projectSchema.find({ keywords: { $regex: new RegExp(search, 'i') } });
			res.json(data);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	},
	download: async (req, res) => {
		try {
			const data = await projectSchema.find({
				project_id: req.body.id,
			});
			const downloads = data?.[0]?.downloads + 1
			if (!req.session.downloaded_posts) {
				req.session.downloaded_posts = {};
			}
			if (!req.session.downloaded_posts[req.body.id]) {
				req.session.downloaded_posts[req.body.id] = 1; 
				//update session
				//increment post count in posts table with post id
				//update 'viewed_posts' column with new session 
				const update = await projectSchema.findOneAndUpdate({project_id : req.body.id},{downloads:downloads})
			}
			res.json(data);
		} catch (error) {
			console.log(error);
		}
	}


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
