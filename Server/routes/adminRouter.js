const express = require('express');
const router = express.Router();

const loginController = require('../controllers/admin/loginController');
const projectController = require('../controllers/admin/projectController');
const userController = require('../controllers/admin/customerController');
const categoryController = require('../controllers/admin/categoryController');


//login
router.post('/login',loginController.Login)

//projects
router.get('/getallprojects',projectController.getAllProjects)
router.post('/getprojectdetails',projectController.getProjectDetails)
router.post('/deleteproject',projectController.deleteProject)
router.post('/approveproject',projectController.approveProject)
router.post('/rejectproject',projectController.rejectProject)
//customers
router.get('/getallusers',userController.getAllUsers)
router.post('/deleteuser',userController.deleteUser)
router.post('/updateuser',userController.updateUser)

//categories
router.post('/deletecategory',categoryController.deleteCategory)
router.get('/getallcategories',categoryController.getCategories)
router.post('/addcategory',categoryController.addCategory)

module.exports = router