module.exports = {
    Login : async (req, res) => {
		try {
			const {email,password} = req.body
			if(email === 'admin@gmail.com' && password === 'admin123@'){
                res.json({
                    status : "success"
                })
            }else{
                res.json({
                    status : "failed"
                })
            }
		} catch (error) {
			console.log(error);
            res.json({
                status : "failed"
            })
		}
	},
}