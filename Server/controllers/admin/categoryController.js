const projectSchema = require("../../models/project");
const categorySchema = require("../../models/category");
const nodemailer = require("nodemailer");
const firebase = require("firebase/app");
const {
	getStorage,
	ref,
	uploadBytes,
	getDownloadURL,
} = require("firebase/storage");

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
	getCategories: async (req, res) => {
		try {
			const count = await categorySchema.aggregate([
                {
                  $lookup: {
                    from: "projects",
                    let: { title: "$title" },
                    pipeline: [{ $match: { $expr: { $eq: ["$$title", "$category"] } } }],
                    as: "project_count",
                  },
                },
                { $addFields: { project_count: { $size: "$project_count" } } },
              ]);

            res.json(count)
            console.log(count);
		} catch (error) {
			res.json({
				status: "failed",
			});
		}
	},
	addCategory: async (req, res) => {
		const { title, main, icon, status } = req.body
        
		try {
			const file = base64ImageToBlob(icon);
			const storageRef = ref(
				storage,
				"category/" + Date.now() + "." + file.type.split("/")[1]
			);
			uploadBytes(storageRef, file).then((snapshot) => {
				console.log("uploaded");
				getDownloadURL(snapshot.ref).then(async(item) => {
					const img = item;
                    
                    const newData = new categorySchema({
                        title : title,
                        status : status,
                        icon : img,
                        main_category : main
                    })
                    newData.save().then(async() => {
                        const count = await categorySchema.aggregate([
                            {
                              $lookup: {
                                from: "projects",
                                let: { title: "$title" },
                                pipeline: [{ $match: { $expr: { $eq: ["$$title", "$category"] } } }],
                                as: "project_count",
                              },
                            },
                            { $addFields: { project_count: { $size: "$project_count" } } },
                          ]);
                          res.json(count)
                    }).catch((err) => {
                        console.log(err);
                    })
                    
				}).catch((err) => {
                    
                    res.json({
                        status: err,
                    });
                })
			}).catch((err) => {
                res.json({
                    status: err,
                });
            })
		} catch (error) {
			res.json({
				status: "failed",
			});
		}
	},
    deleteCategory : async (req, res) => {
		try {
			const data = await categorySchema.findByIdAndDelete({_id:req.body.id})
            const newData = await categorySchema.find()
            res.json(newData)
	
		} catch (error) {
			
            res.json({
                status : "failed"
            })
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
