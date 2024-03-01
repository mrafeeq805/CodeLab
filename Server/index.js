const express = require('express')
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const { getStorage, ref, uploadBytes, uploadString } = require("firebase/storage");

const multer = require('multer');
const firebase = require("firebase/app")

const { FirebaseError, initializeApp } = require("firebase/app") 
const firebaseConfig = {
    apiKey: "AIzaSyCtvC3uDcF6gaftbArQBpzvOZGSbpEfFL4",
    authDomain: "codelab-95a3d.firebaseapp.com",
    projectId: "codelab-95a3d",
    storageBucket: "codelab-95a3d.appspot.com",
    messagingSenderId: "109412438316",
    appId: "1:109412438316:web:b4b6acec0e7062599e9c89",
    measurementId: "G-TKNFEJ7WHE"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = getStorage();

const upload = multer({storage : multer.memoryStorage()})
const metadata = {
    contentType : "image/*"
}

// 'file' comes from the Blob or File API
function base64ImageToBlob(str) {
    // extract content type and base64 payload from original string
    var pos = str.indexOf(';base64,');
    var type = str.substring(5, pos);
    var b64 = str.substr(pos + 8);
  
    // decode base64
    var imageContent = atob(b64);
  
    // create an ArrayBuffer and a view (as unsigned 8-bit)
    var buffer = new ArrayBuffer(imageContent.length);
    var view = new Uint8Array(buffer);
  
    // fill the view, using the decoded base64
    for(var n = 0; n < imageContent.length; n++) {
      view[n] = imageContent.charCodeAt(n);
    }
  
    // convert ArrayBuffer to Blob
    var blob = new Blob([buffer], { type: type });
  
    return blob;
  }


app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.get('/',(req,res)=>{
    res.send("de")
})
app.post('/addproject',upload.single("screenshots"),(req,res)=>{

    console.log(base64ImageToBlob(req.body.thumbnail));
    const fileList = req.body.screenshots
    // fileList.map((item) => {
    //     const file = base64ImageToBlob(item)
    //     const storageRef = ref(storage, 'screenshots/'+Date.now()+'.'+file.type.split('/')[1]);
    //     uploadBytes(storageRef, file).then((snapshot) => {
    //        console.log('Uploaded file!');
    //      });
   
    // })
    
    res.json(req.body.name)
})

app.listen(4000,()=>{
    console.log("started");
})