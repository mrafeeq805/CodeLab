const express = require('express');
const router = express.Router();


const projectController = require('../controllers/projectController');

//projects

router.post('/addproject',projectController.addproject)

module.exports = router