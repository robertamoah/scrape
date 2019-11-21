const Scrape = require("../scripts/scrape");

const makeDate = require("../scripts/date");

module.exports = {
    fetch : function (cb) {
        Scrape(function(date) {
            const articles  = data;
            for (let i = 0; i < articles.length; i++){
                article[i].data = makeDate();
                articles[i].save = false;
            }

            headline.collection.insertMany(articles, {order:false}, function(err, docs){
                cb(err, docs);
            });
        });
    },

    delete: function (query, cb) {
        Headline.remove(query, cb);
    },
    get: function(query, cb) {
        Headline.find(query)
        .sort({
            _id: -1
        })
        .exec(function(err, cb){
            cb(doc);
        });
    },

    uodate: function(query, cb){
        Headline.update({_id: query>_id}, {
            $set:query
        }, {}, cb);
    }

}