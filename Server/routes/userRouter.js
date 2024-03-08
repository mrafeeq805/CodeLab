const express = require('express');
const router = express.Router();


const projectController = require('../controllers/projectController');
const userController = require('../controllers/userController');
const { authVerify } = require('../middleware/authJWT');
const { auth } = require('../middleware/auth');

//projects
router.post('/download',auth,projectController.download)
router.get('/search/:search',auth,projectController.searchProjects)
router.get('/getrelated/:category',auth,projectController.getRelatedProjects)
router.get('/getdevelopers',auth,projectController.getTopDevelopers)
router.post('/getfavorite',auth,projectController.getFavoriteProjects)
router.get('/getDeveloperProjects/:id',auth,projectController.getDeveloperProjects)
router.get('/getMyProjects',auth,authVerify,projectController.getMyProjects)
router.get('/getlatest',auth,projectController.getLatestList)
router.get('/getpopular',auth,projectController.getPopularList)
router.post('/addproject',auth,authVerify,projectController.addproject)
router.post('/editproject',auth,authVerify,projectController.editproject)
router.get('/description/:project_id',auth,projectController.getDescription)
router.get('/editinfo/:project_id',auth,authVerify,projectController.getEdiInfo)

//login & signup ,profile

router.post('/sendotp',auth,userController.sendOtp)
router.post('/verifyotp',auth,userController.verifyOtp)
router.post('/setpassword',auth,userController.setPassword)
router.post('/getprofile',auth,authVerify,userController.getProfile)
router.post('/editprofiledata',auth,userController.editProfile)
router.post('/createaccount',auth,userController.createaccount)
router.post('/login',auth,userController.login)

module.exports = router