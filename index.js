const express = require("express");
const mongoose = require("mongoose");
const routes = require("./src/routes");
var session = require("express-session");
const http = require("http");
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");
var html, css;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(session({
      secret: 'sectumsempra',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }
}));

mongoose.connect("mongodb://localhost:27017/web2", {
  useNewUrlParser: true
});

app.set('views', path.join(__dirname, "src/views"));
app.set('view engine', 'hbs');

app.use("/api", routes);
app.use(express.urlencoded({ extended: true }));  
app.listen(8080);

http.createServer( (req,res) =>{
  switch (req.url) {

    case '/login':
      html = "./src/views/index.hbs";
      css = "./src/views/css/main.css";
      break;
    case '/singup':
      html = "./src/views/singup.hbs";
      css = "./src/views/css/main.css";
      break;
    case '/register':
      html = "./src/views/cadProd.hbs";
      css = "./src/views/css/main.css";
      break;
  }

  if(req.headers['accept'].search('text/html') >= 0){
    fs.readFile(html, function(err,data){
      res.setHeader('Content-type', 'text/html');
      res.write(data);
      res.end();
    })
  } else {
    fs.readFile(css, function(err,data){
      res.setHeader('Content-type', 'text/css');
      res.write(data);
      res.end();
    })
  }
}).listen(9999);