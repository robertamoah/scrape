var request = require("request");

var cheerio = require("cheerio")



var scrape = function (cb)  {

request("http://www.nytimes.com", (err, res , body) =>{    

const $ =cheerio.load(body)

const articles = [];


$(".them-summay").each((i, elemet) =>{
    const head = $(this).children(".story-heading").text().trim();
    const sum = $(this).children(".summary").text().trim();

    if(head && sum) {
        const headNeat =head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        const SumNeat =sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        const dataToAdd ={
            headline: headNeat,
            summary: sumNeat
        };
        articles.push(dataToAdd);
    }

}); 

    cb(articles);

});


};


module.exports = scrape;