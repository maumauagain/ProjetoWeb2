require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const routes = require("./src/routes");
var session = require("express-session");
const http = require("http");
const path = require("path");
const morgan = require("morgan");

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

app.use(express.static(path.join(__dirname, 'src', 'views')));
app.use('/files', express.static(path.resolve(__dirname, "tmp", "uploads")));

mongoose.connect(
  process.env.MONGO_URL, {
  useNewUrlParser: true
});

app.set('views', path.join(__dirname, "src/views"));
app.set('view engine', 'hbs');

app.use("/", routes);
app.use(express.urlencoded({ extended: true }));  

http.createServer(app).listen(8080);