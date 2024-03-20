const userSchema = require("../models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.authVerify = (req, res,next) => {
  const token = req.cookies.admin_token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
        
      
      if (req.session.admin) {
        next()
        //return res.json({ status: true, user: user.username })
        
      }else {
        return res.json({ status: false })
      }
    }
  })
}