const express = require('express');
const router = express.Router();

const loginController = require('../controllers/admin/loginController');
const projectController = require('../controllers/admin/projectController');


//login
router.post('/login',loginController.Login)

//projects
router.get('/getallprojects',projectController.getAllProjects)

module.exports = router