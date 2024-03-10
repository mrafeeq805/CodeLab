const projectSchema = require('../../models/project')
const userSchema = require('../../models/user')
const nodemailer = require('nodemailer');

module.exports = {
    getAllProjects : async (req, res) => {
		try {
			const data = await projectSchema.find()
            res.json(data)
	
		} catch (error) {
			
            res.json({
                status : "failed"
            })
		}
	},
    getProjectDetails : async (req, res) => {
		try {
			const data = await projectSchema.findOne({project_id:req.body.id})
            res.json(data)
	
		} catch (error) {
			
            res.json({
                status : "failed"
            })
		}
	},
    deleteProject : async (req, res) => {
		try {
			const data = await projectSchema.findOneAndDelete({project_id:req.body.project_id})
            const newData = await projectSchema.find()
            res.json(newData)
	
		} catch (error) {
			
            res.json({
                status : "failed"
            })
		}
	},
    approveProject : async (req, res) => {
		try {
			const data = await projectSchema.findOneAndUpdate({project_id:req.body.project_id},{status:"Approved"})
            const newData = await projectSchema.find()
            res.json(newData)
	
		} catch (error) {
			
            res.json({
                status : "failed"
            })
		}
	},
    rejectProject : async (req, res) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'codelabzsolutions@gmail.com',
              pass: 'oztr esvf zkxw egpc'
            }
          });
		try {
			const data = await projectSchema.findOneAndUpdate({project_id:req.body.project_id},{status:"Rejected"})
            const {email} = await userSchema.findOne({publisher_id:req.body.publisher_id})
            const newData = await projectSchema.find()
            const mailOptions = {
				from: 'codelabzsolutions@gmail.com',
				to: email,
				subject: 'Project Rejection',
				text: `Your Submitted Project (id = ${req.body.project_id} ) is rejected due to ${req.body.reason}. you can edit and resubmit it on my projects in profile page with corrected details`
			  };
            transporter.sendMail(mailOptions, function(error, info){
				if (error) {
                res.json(newData)
				} else {
				  res.json(newData)
				}
			  });
            
            
	
		} catch (error) {
			
            res.json({
                status : "failed"
            })
		}
	},
}