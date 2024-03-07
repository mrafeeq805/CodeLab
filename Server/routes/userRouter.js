const express = require('express');
const router = express.Router();


const projectController = require('../controllers/projectController');
const userController = require('../controllers/userController');
const { authVerify } = require('../middleware/authJWT');

//projects
router.post('/download',projectController.download)
router.get('/search/:search',projectController.searchProjects)
router.get('/getrelated/:category',projectController.getRelatedProjects)
router.get('/getdevelopers',projectController.getTopDevelopers)
router.post('/getfavorite',projectController.getFavoriteProjects)
router.get('/getDeveloperProjects/:id',projectController.getDeveloperProjects)
router.get('/getMyProjects',authVerify,projectController.getMyProjects)
router.get('/getlatest',projectController.getLatestList)
router.post('/addproject',authVerify,projectController.addproject)
router.post('/editproject',authVerify,projectController.editproject)
router.get('/description/:project_id',projectController.getDescription)
router.get('/editinfo/:project_id',authVerify,projectController.getEdiInfo)

//login & signup ,profile

router.post('/sendotp',userController.sendOtp)
router.post('/verifyotp',userController.verifyOtp)
router.post('/setpassword',userController.setPassword)
router.post('/getprofile',authVerify,userController.getProfile)
router.post('/editprofiledata',userController.editProfile)
router.post('/createaccount',userController.createaccount)
router.post('/login',userController.login)

module.exports = router