const express = require("express")
const logger = require("morgan")
const mongoose = require("mongoose")
var bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const moment = require("moment")
var axios = require ("axios");
const cheerio = require("cheerio");
const app = express();
// console.log(moment())
app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');
app.use(logger("dev"));

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/robert"
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });



// Configure middleware


// Use morgan logger for logging requests
app.use(logger("dev"));





// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Make public a static folder
app.use(express.static("public"));



// api routes


// require("./routes/api_routes")(app)

require("./routes/routers")(app)



// Connect to the Mongo DB
mongoose.connect(MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true })


// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.listen(PORT, () => console.log("App running on port " + PORT + "!"))