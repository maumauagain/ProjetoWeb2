const Product = require("../models/ProductModel");

class ProductController {
  async index(req, res) {
    if (req.session.login) {
      const prod = await Product.find();
      return res.render('listaProd', { prod: prod });
    }
    return res.redirect('/');

  }
  async store(req, res) {
    if (req.session.login) {
      var key;
      if (req.body.file) {
        key = req.body.file;
      } else {
        key = "";
      }
      await Product.create({
        name: req.body.name,
        price: req.body.price,
        key: key,
        url: "",
      });
      return res.redirect('/prod');
    }
    return res.redirect('/')
  }

  async show(req, res) {
    if (req.session.login) {
      const prod = await Product.find();
      var search = (prod.filter((item) => {
        if (item.name.includes(req.query.name)) {
          return item
        }
      }));
      return res.render('searchProd', { prod: search });
    }
    return res.redirect('./');
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