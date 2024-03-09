const projectSchema = require('../../models/project')

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
}