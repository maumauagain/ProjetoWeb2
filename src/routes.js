const express = require("express");
const routes = express.Router();
const fs = require("fs");
const UserController = require("./controllers/UserController");
const ProductController = require("./controllers/ProductController");
const multer = require("multer");
const multerConfig = require("./config/index.js")

routes.get("/list", (req, res, next) => {
    if(req.session && req.session.login) {
        res.render('list', {
        });
        return;
    }
    res.redirect('./user');
});

routes.get("/user", UserController.index);
routes.post("/user", UserController.store);
routes.get("/user/:id", UserController.show);

routes.get("/prod", ProductController.index);
routes.post("/prod", multer(multerConfig).single("file"), ProductController.store);
routes.get("/prod/:name", ProductController.show);

module.exports = routes;