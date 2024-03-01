const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title:String,
  project_id: Number,
  overview: String,
  screenshots:[],
  features : String,
  thumbnail : String,
  live_link : String,
  category : String,
  project_link : String,
  publisher : String,
  price : String,
  status : String,
  published_date : String,
  last_updated : String,
  db_used : String,
  frameworks_used : String,
  views : Number,
  downloads : Number
})


  
  const projects = mongoose.model("projects", projectSchema);

  module.exports = projects;