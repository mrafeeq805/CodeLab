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
		//console.log(base64ImageToBlob(req.body.thumbnail));
		const fileList = req.body.screenshots;
		var screenshotsLinks = [];
		var thumbnailLink = "";
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
			getDownloadURL(snapshot.ref).then((item) => {
				thumbnailLink = item;
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

				const newProject = new projectSchema({
					title: title,
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
					published_date: new Date().toLocaleDateString(),
					last_updated: new Date().toLocaleDateString(),
					views: 0,
					downloads: 0,
					status: "Pending",
					price: "Free",
				});
                newProject.save()
                console.log(newProject);
			});
		});

		

		res.send("done");
	},
    getLatestList : async (req,res) =>{
        try{
            const data = await projectSchema.find()
            res.json(data)
        }catch(error){
            console.log(error);

        }
    },
	getTopDevelopers : async (req,res) =>{
        try{
            const data = await userSchema.find()
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
