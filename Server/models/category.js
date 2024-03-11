const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({

  title : String,
  icon: String,
  main_category : String,
  status : String
})


  
  const category = mongoose.model("categories", categorySchema);

  module.exports = category;