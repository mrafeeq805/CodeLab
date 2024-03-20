const { createSecretToken } = require("../../util/secretToken");

module.exports = {
	Login: async (req, res) => {
		try {
			const { email, password } = req.body;
			if (email === "admin@gmail.com" && password === "admin123@") {
				req.session.admin = email;
				const token = createSecretToken(email);
				res.cookie("admin_token", token, {
					withCredentials: true,
					httpOnly: false,
				});
				res.json({
                    token : token,
					status: "success",
				});
			} else {
				res.json({
					status: "failed",
				});
			}
		} catch (error) {
			console.log(error);
			res.json({
				status: "failed",
			});
		}
	},
	Logout: async (req, res) => {
		try {
            console.log('lo');
			req.session.email = null;
            res.clearCookie("admin_token");
            console.log('succes');
			res.json({
				status: "success",
			});
		} catch (error) {
			res.json({
				status: "failed",
			});
		}
	},
};
