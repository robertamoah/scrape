var express = require ("express");

var exphbs  = require('express-handlebars');

const bodyParser = require("body-parser")

const mongoose = require('mongoose');

var app = express();

var port = 3000;



 const router = express.Router()


 require("./config/routes")(router)


app.use(express.static(__dirname + "./public"))



 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
 
// app.get('/', function (req, res) {
//     res.render('home');
// });




app.use(bodyParser.urlencoded({
    extended:false

}));



app.use(router)








var db = process.env.MONGODB_URI || 'mongodb://localhost/my_database'


mongoose.connect(db, function(error) {
    if(error){
        console.log(error);
    }
    else{
        console.log("mongoose connection is sucessful")
    }

})









 
app.listen(port, () => console.log(`you are on port ${port}`));