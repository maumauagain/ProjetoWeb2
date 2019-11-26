const Product = require("../models/ProductModel");

class ProductController {

  async index(req, res) {
    const prod = await Product.find();
    return res.json(prod);
  }
  
  async store(req, res) {
      var key = null;
      console.log(req.file)
      if (req.file) {
        key = req.file.filename;
      } else {
        key = "";
      }
      const product = await Product.create({
        name: req.body.name,
        price: req.body.price,
        key: key,
        url: "",
      });
      console.log("bundinha")
      return res.json(product);

  }

  async show(req, res) {
      const prod = await Product.find();
      var search = (prod.filter((item) => {
        if (item.name.includes(req.query.name)) {
          return item
        }
      }));
      return res.json(search);

  }

  async update(req, res) {
    const prod = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    return res.json(prod);
  }

  async destroy(req, res) {
    await Product.findByIdAndRemove(req.params.id);
    return res.send({ deleted: true });
  }
}

module.exports = new ProductController();