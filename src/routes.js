const express = require("express");
const routes = express.Router();
const fs = require("fs");
const UserController = require("./controllers/UserController");
const ProductController = require("./controllers/ProductController");
const multer = require("multer");
const multerConfig = require("./config/index.js")


routes.get('/', (req,res) => {
    res.render('index');
});
  
routes.get('/sing', (req, res) => {
    res.render('singup')
});
  
routes.get('/cad', (req,res) =>{
    res.render('cadProd')
});

routes.get('/listProd', (req,res) =>{
    var prod = [{name: '1', price: '2'}]
    console.log(ProductController.index);
    res.render('listaProd', {prod: ProductController.index});
})



routes.get("/user", UserController.index);
routes.post("/user", UserController.store);
routes.get("/user/:id", UserController.show);

routes.get("/prod", ProductController.index);
routes.post("/prod", multer(multerConfig).single("file"), ProductController.store);
routes.get("/search", ProductController.show);
routes.delete("/prod/:id", ProductController.destroy);

module.exports = routes;