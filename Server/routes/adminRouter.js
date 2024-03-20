const express = require('express');
const router = express.Router();

const loginController = require('../controllers/admin/loginController');
const projectController = require('../controllers/admin/projectController');
const userController = require('../controllers/admin/customerController');
const categoryController = require('../controllers/admin/categoryController');
const { authVerify } = require('../middleware/adminAuth');


//login
router.post('/login',loginController.Login)
router.post('/logout',loginController.Logout)

//projects
router.get('/getallprojects',authVerify,projectController.getAllProjects)
router.post('/getprojectdetails',authVerify,projectController.getProjectDetails)
router.post('/deleteproject',authVerify,projectController.deleteProject)
router.post('/approveproject',authVerify,projectController.approveProject)
router.post('/rejectproject',authVerify,projectController.rejectProject)
//customers
router.get('/getallusers',authVerify,userController.getAllUsers)
router.post('/deleteuser',authVerify,userController.deleteUser)
router.post('/updateuser',authVerify,userController.updateUser)

//categories
router.post('/deletecategory',authVerify,categoryController.deleteCategory)
router.get('/getallcategories',authVerify,categoryController.getCategories)
router.post('/addcategory',authVerify,categoryController.addCategory)

module.exports = router