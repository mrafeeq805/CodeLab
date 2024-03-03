const express = require('express');
const router = express.Router();


const projectController = require('../controllers/projectController');
const userController = require('../controllers/userController');

//projects
router.get('/getdevelopers',projectController.getTopDevelopers)
router.post('/getfavorite',projectController.getFavoriteProjects)
router.get('/getDeveloperProjects',projectController.getDeveloperProjects)
router.get('/getlatest',projectController.getLatestList)
router.post('/addproject',projectController.addproject)
router.get('/description/:project_id',projectController.getDescription)

//login & signup

router.post('/createaccount',userController.createaccount)
router.post('/login',userController.login)

module.exports = router