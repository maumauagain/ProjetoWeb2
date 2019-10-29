const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  key: {
    type: String
  },
  url: {
      type: String
  }
});

ProductSchema.pre('save', function() {
  if(!this.url){
     this.url = `${process.env.APP_URL}/files/${this.key}`
  }
});

module.exports = mongoose.model("Product", ProductSchema);