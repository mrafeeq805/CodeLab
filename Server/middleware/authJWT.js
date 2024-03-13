const userSchema = require("../models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.authVerify = (req, res,next) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
        
      const user = await userSchema.find({email : req.session.email})
      if (user && req.session.email) {
        next()
        //return res.json({ status: true, user: user.username })
        
      }else {
        return res.json({ status: false })
      }
    }
  })
}