const projectSchema = require("../models/project");
const userSchema = require("../models/user");
const categorySchema = require("../models/category");
const mongoose = require("mongoose");
const multer = require("multer");
var isBase64 = require("is-base64");
const sharp = require("sharp");
const fs = require("fs");
const {
	getStorage,
	ref,
	uploadBytes,
	getDownloadURL,
} = require("firebase/storage");
const OpenAI = require("openai");
require("dotenv").config();

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
			frameworks_used,
			db,
			features,
			project_link,
		} = req.body;

		await Promise.all(fileList.map(async (item) => {
			const file = base64ImageToBlob(item)
			
			const storageRefScreenshot = ref(
				storage,
				"screenshots/" + Date.now() + "." + file.type.split("/")[1]
			);
			try {
				const upload = await uploadBytes(storageRefScreenshot, file);
				const upload_url = await getDownloadURL(upload.ref);
				screenshotsLinks.push(upload_url);
			} catch (err) {
				console.log(err);
				res.json({ result: false });
			}
		}));
		const file = base64ImageToBlob(req.body.thumbnail)
		const storageRef = ref(
			storage,
			"thumbnail/" + Date.now() + "." + file.type.split("/")[1]
		);
		try {
			const upload = await uploadBytes(storageRef, file);
			const upload_url = await getDownloadURL(upload.ref);
			thumbnailLink = upload_url
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
				publisher_id: req.session.publisher_id,
				title: title,
				project_id: lastid + 1,
				category: category,
				live_link: link,
				overview: overview,
				frameworks_used: frameworks_used,
				db_used: db,
				screenshots: screenshotsLinks,
				thumbnail: thumbnailLink,
				features: features,
				project_link: project_link,
				publisher: req.session.publisher,
				published_date: date2,
				last_updated: date2,
				views: 0,
				downloads: 0,
				status: "Pending",
				price: "Free",
				keywords:
					title.split(" ").join(",") +
					" , " +
					frameworks_used.join(",") +
					" , " +
					response?.choices[0]?.message?.content,
			});
			newProject.save();
			res.json({ result: true });
		} catch (err) {
			console.log(err);
			res.json({ result: false });
		}

	},
	getLatestList: async (req, res) => {
		try {
			const data = await projectSchema
				.find({ status: "Approved" })
				.sort({ _id: -1 });
			res.json(data);
		} catch (error) {
			console.log(error);
		}
	},
	getPopularList: async (req, res) => {
		try {
			const data = await projectSchema
				.find({ status: "Approved" })
				.sort({ views: -1 });
			res.json(data);
		} catch (error) {
			console.log(error);
		}
	},
	getCategoryList: async (req, res) => {
		try {
			const data = await categorySchema.find({ status: "Listed" });
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
			const data = await projectSchema.findOne({
				project_id: req.params.project_id,
			});
			const publisher = await userSchema.findOne(
				{
					publisher_id: data?.publisher_id,
				},
				{ _id: 0, email: 0, password: 0, title: 0 }
			);
			const views = data?.views + 1;
			if (!req.session.viewed_posts) {
				req.session.viewed_posts = {};
			}
			if (!req.session.viewed_posts[req.params.project_id]) {
				req.session.viewed_posts[req.params.project_id] = 1;

				const update = await projectSchema.findOneAndUpdate(
					{ project_id: req.params.project_id },
					{ views: views }
				);
			}
			res.json({
				details: data,
				publisher: publisher,
			});
		} catch (error) {
			console.log(error);
		}
	},
	getEdiInfo: async (req, res) => {
		try {
			const publisher = await projectSchema.findOne(
				{
					publisher_id: req.session.publisher_id,
					project_id: req.params.project_id,
				},

				{ _id: 0, email: 0, password: 0, title: 0 }
			);
			if (!publisher) {
				return res.json({
					status: "unauthorized",
				});
			}
			const data = await projectSchema.findOne({
				project_id: req.params.project_id,
			});
			res.json({
				status: "ok",
				details: data,
				publisher: publisher,
			});
		} catch (error) {
			console.log(error);
		}
	},
	getDeveloperProjects: async (req, res) => {
		try {
			const data = await projectSchema.find({
				publisher_id: req.params.id,
				status: "Approved",
			});
			const userDetails = await userSchema.find(
				{ publisher_id: req.params.id },
				{ name: 1, title: 1, bio: 1, avatar: 1, _id: 0 }
			);

			const stacks_used = Array.from(
				new Set(data.map((item) => item.frameworks_used).flat())
			);
			const images = await categorySchema.find(
				{ title: { $in: stacks_used } },
				{ icon: 1 }
			);

			const user = await projectSchema.aggregate([
				{
					$match: {
						publisher_id: req.params.id,
					},
				},
				{
					$group: {
						_id: null,
						totalViews: { $sum: "$views" },
						projectsCount: { $sum: 1 },
					},
				},
				{ $unset: ["_id"] },
			]);
			
			res.json({
				projects: data,
				details: userDetails[0],
				views: user[0]?.totalViews || 0,
				projectsCount: user[0]?.projectsCount || 0,
				stacks_used: images,
			});
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
		} catch (error) {
			console.log(error);
		}
	},
	searchProjects: async (req, res) => {
		try {
			const search = req.params.search;
			const data = await projectSchema.find({
				keywords: { $regex: new RegExp(search, "i") },
				status: "Approved",
			});
			res.json(data);
		} catch (error) {
			console.log(error);
		}
	},
	download: async (req, res) => {
		try {
			const data = await projectSchema.find({
				project_id: req.body.id,
			});
			const downloads = data?.[0]?.downloads + 1;
			if (!req.session.downloaded_posts) {
				req.session.downloaded_posts = {};
			}
			if (!req.session.downloaded_posts[req.body.id]) {
				req.session.downloaded_posts[req.body.id] = 1;
				//update session
				//increment post count in posts table with post id
				//update 'viewed_posts' column with new session
				const update = await projectSchema.findOneAndUpdate(
					{ project_id: req.body.id },
					{ downloads: downloads }
				);
			}
			res.json(data);
		} catch (error) {
			console.log(error);
		}
	},
	getRelatedProjects: async (req, res) => {
		try {
			const data = await projectSchema.find({
				frameworks_used: req.params.category,
				status: "Approved",
			});
			
			res.json(data);
		} catch (error) {
			console.log(error);
		}
	},
	getMyProjects: async (req, res) => {
		try {
			const data = await projectSchema.find(
				{ publisher_id: req.session.publisher_id },
				{
					_id: 0,
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
	editproject: async (req, res) => {
		const {
			title,
			category,
			live_link,
			overview,
			frameworks_used,
			db_used,
			features,
			project_link,
			project_id,
		} = req.body;
		const publisher = await projectSchema.findOne(
			{
				publisher_id: req.session.publisher_id,
				project_id: project_id,
			},

			{ _id: 0, email: 0, password: 0, title: 0 }
		);
		if (!publisher) {
			return res.json({
				status: "unauthorized",
			});
		}

		const currentDate = new Date();
		const day = currentDate.getDate();
		const month = currentDate.getMonth() + 1; // Add 1 as months are zero-based
		const year = currentDate.getFullYear();
		const date2 = `${month}-${day}-${year}`;

		const fileList = req.body.screenshots;
		var screenshotsLinks = [];
		var thumbnailLink = "";

		await Promise.all(fileList.map(async (item) => {
			if (!isValidUrl(item)) {
				const file = base64ImageToBlob(item);
				const storageRef = ref(
					storage,
					"screenshots/" + Date.now() + "." + file.type.split("/")[1]
				);
		
				try {
					const uploadTask = await uploadBytes(storageRef, file);
					const url = await getDownloadURL(uploadTask.ref);
					screenshotsLinks.push(url); // Push the URL into screenshotsLinks array
					console.log('in');
					if (!thumbnailLink) {
						thumbnailLink = url;
					}
				} catch (error) {
					console.error("Error uploading image:", error);
				}
			}
		}));
		// if (screenshotsLinks.length > 0) {
		// 	screenshotsLinks = [...screenshotsLinks, ...fileList];
		// } else {
		// 	screenshotsLinks = fileList;
		// }
		console.log('out');

		if (!isValidUrl(req.body.thumbnail)) {
			const file = base64ImageToBlob(req.body.thumbnail);
			const storageRef = ref(
				storage,
				"thumbnail/" + Date.now() + "." + file.type.split("/")[1]
			);
			const upload = await uploadBytes(storageRef, file)
			const url = await getDownloadURL(upload.ref)
			thumbnailLink = url;
			callUpdate();
				
		} else {
			thumbnailLink = req.body.thumbnail;
			callUpdate();
		}
		async function callUpdate() {
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
			const exist = await projectSchema.findOne({ project_id: project_id });

			const update = await projectSchema.updateOne(
				{ project_id: project_id },
				{
					title: title === "" ? exist.title : title,
					category: category,
					status : 'Pending',
					live_link: live_link,
					overview: overview === "" ? exist.overview : overview,
					frameworks_used:
						frameworks_used === "" ? exist.frameworks_used : frameworks_used,
					db_used: db_used,
					screenshots:
						screenshotsLinks.length === 0
							? exist.screenshots
							: screenshotsLinks,
					thumbnail: thumbnailLink === "" ? exist.thumbnail : thumbnailLink,
					features: features === "<p><br></p>" ? exist.features : features,
					project_link: project_link === "" ? exist.project_link : project_link,
					last_updated: date2,
					keywords:
						title === "" || overview === ""
							? exist.keywords
							: title.split(" ").join(",") +
							  " , " +
							  response?.choices[0]?.message?.content,
				}
			);

			res.json({
				status: "ok",
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

