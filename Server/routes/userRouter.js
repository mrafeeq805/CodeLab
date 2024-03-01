const express = require('express');
const router = express.Router();


const projectController = require('../controllers/projectController');
const userController = require('../controllers/userController');

//projects

router.get('/getlatest',projectController.getLatestList)
router.post('/addproject',projectController.addproject)

//login & signup

router.post('/createaccount',userController.createaccount)

module.exports = router