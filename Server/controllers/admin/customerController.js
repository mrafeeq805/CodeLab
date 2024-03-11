const projectSchema = require("../../models/project");
const userSchema = require("../../models/user");

module.exports = {
	getAllUsers: async (req, res) => {
		try {
			const count = await userSchema.aggregate([
				{
					$lookup: {
						from: "projects",
						let: { publisher_id: "$publisher_id" },
						pipeline: [
							{
								$match: { $expr: { $eq: ["$$publisher_id", "$publisher_id"] } },
							},
						],
						as: "project_count",
					},
				},
				{ $addFields: { project_count: { $size: "$project_count" } } },
			]);
			res.json(count);
		} catch (error) {
			res.json({
				status: "failed",
			});
		}
	},
	deleteUser: async (req, res) => {
		try {
      const user = await userSchema.findByIdAndDelete({_id:req.body.id})
      const data = await userSchema.find()
			res.json(data);
		} catch (error) {
			res.json({
				status: "failed",
			});
		}
	},
  updateUser: async (req, res) => {
		try {
      const user = await userSchema.findByIdAndUpdate({_id:req.body.id},{status : req.body.status})
      const count = await userSchema.aggregate([
				{
					$lookup: {
						from: "projects",
						let: { publisher_id: "$publisher_id" },
						pipeline: [
							{
								$match: { $expr: { $eq: ["$$publisher_id", "$publisher_id"] } },
							},
						],
						as: "project_count",
					},
				},
				{ $addFields: { project_count: { $size: "$project_count" } } },
			]);
			res.json(count);
		} catch (error) {
			res.json({
				status: "failed",
			});
		}
	},
};
