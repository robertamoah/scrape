// Require our Dependencies
const express  =  require ("express");


// Set up our Port to be either the host's designated port, or 3000
const PORT = process.env.PORT || 3000;


// Set up an Express Router
const app = express();


// set up an Express Router
var router = express.Router();


// Destinate our public folder as a static directory
app.use(express.static(__dirname + "./public"));

// Have every request go through our router middleware
app.use(router)





// Listen on the port
app.listen (function (){
    console.log(`Listening on port: ${PORT}`)
})