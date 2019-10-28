const Product = require("../models/ProductModel");

class ProductController {
  async index(req, res) {
    const prod = await Product.find();
    console.log(prod)
    return res.json(prod);
  }
  async store(req, res) {
    const prod = await Product.create(req.body);
    return res.json(prod);
  }
  async show(req, res) {
    const prod = await Product.find();
    return res.json(prod.filter((item) => {
      if(item.name.includes(req.params.name)){
        return item;
      }
    }));  
  }
  async update(req, res) {
    const prod = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    return res.json(prod);
  }
}

module.exports = new ProductController();