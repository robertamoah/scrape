const express = require("express")
const logger = require("morgan")
const mongoose = require("mongoose")
const Handlebars = require('handlebars');
const exphbs = require("express-handlebars");
const moment = require("moment")
var axios = require ("axios");
const cheerio = require("cheerio");
// console.log(moment())

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/robert"
const app = express();

// Configure middleware


// Use morgan logger for logging requests
app.use(logger("dev"));





// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Make public a static folder
app.use(express.static("public"));



// api routes


require("./routes/api_routes")(app)


// Connect to the Mongo DB
mongoose.connect(MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true })


// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.listen(PORT, () => console.log("App running on port " + PORT + "!"))