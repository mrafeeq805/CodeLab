const userSchema = require('../../models/user')

module.exports = {
    getAllUsers : async (req, res) => {
		try {
			const data = await userSchema.find()
            res.json(data)
	
		} catch (error) {
			
            res.json({
                status : "failed"
            })
		}
	},
}