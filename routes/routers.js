var cheerio = require("cheerio");
var db = require("../models");
var axios = require ("axios")



module.exports = function (app) {


    
    app.get("/", function (req, res) {
           
        res.render("home")

        })


app.get("/scrape", function (req, res) {
    var result = [];
    axios.get("https://www.npr.org/sections/news/")
    .then((response) => {
    let $ = cheerio.load(response.data)
    $("article.item").each((i, element) => {
        let src = $(element).find("img").attr("src");
        let info = $(element).find("p.teaser").children("a").text().split("• ")[1]
        let title = $(element).find("h2.title").children("a").text()
        let link = $(element).find("h2.title").children("a").attr("href")
        

    
        let everyThing = {
            src:src,
            info: info,
            title: title,
            link: link
        }


        

        result.push(everyThing)



        db.Article.create(result).then(function (dbArticle) {
            console.log(dbArticle)
        }).catch(function (err) {
            return res.json(err)
        })

    })


    // const hbsObject = {
    //     articles: result
    // }
    // res.render("index", hbsObject)

    res.render("index")
})


})






app.get("/home", (req, res) =>{



    res.render("index")

})



app.get("/save", (req, res) =>{

    db.Article.find({})
        .then(function (dbArticle) {
            


            const hbsObject = {
                dbArticle:dbArticle
            }

            res.render("comments", hbsObject)

        })
        .catch(function (err) {
            res.json(err);
        });

})



//   delect all saved in the data base.

app.delete("/clear", (req, res) =>{
    db.Article.deleteMany({})
    .then(function (dbArticle) {
        const hbsObject = {
            dbArticle:dbArticle
        }

        res.render("comments", hbsObject)
           console.log("its out bro ", dbArticle)
    }).catch(function (err) {
        res.json(err);
    });

})




























}
