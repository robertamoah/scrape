const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models/Profile");
const mongojs = require("mongojs");
const moment = require("moment");
const mongoose = require('mongoose');

const express = require("express")
const app = express()

module.exports = function (app) {



    app.post("/submit", (req, res) => {
        console.log(req.body)
        db.Comment.create({
                note: req.body.note,
                time: moment().format('LLLL')
            })
            .then(dataComment => {
                console.log(dataComment._id)
                console.log(moment().format('LLLL'))
                return db.Article.findOneAndUpdate({_id: req.body.article_id
                }, {
                    $push: {
                        notes: dataComment._id,
                        time: moment().format('LLLL')
                    }
                }, {
                    new: true
                }).populate("notes")
            })
            .then(dbArticle => res.json(dbArticle))
            .catch(err => res.json(err))
    })















    app.get("/scrape", (req, res) => {
        let results = []

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

                    results.push(everyThing)

                })
                const hbsObject = {
                    articles: results
                }
                res.render("index", hbsObject)
            })
    })

        }
        
     
        // app.get("/saved-articles", (req, res) => {
        //     db.Article.find({})
        //         .then(dbArticle => {
        //             const hbsObject = {
        //                 articles: dbArticle
        //             }
        //             res.render("comments", hbsObject)
        //         })
        // })
    
        // app.get("/populated/:id", (req, res) => {
        //     db.Article.find({
        //             _id: mongojs.ObjectId(req.params.id)
        //         })
        //         .populate("notes")
        //         .then(dbArticle => res.json(dbArticle[0].notes))
        //         .catch(err => res.json(err))
        // })
    
        // app.delete("/delete-note/:id", (req, res) => {
        //     console.log("ID: " + req.params.id)
        //     db.Note.remove({
        //         _id: mongojs.ObjectId(req.params.id)
        //     }, (err, deleted) => {
        //         if (err) {
        //             console.log(err)
        //         } else {
        //             console.log(deleted)
        //             res.status(200).end()
        //         }
        //     })
        // })
    
        // app.delete("/delete-article/:id", (req, res) => {
        //     db.Article.remove({
        //         _id: mongojs.ObjectId(req.params.id)
        //     }, (err, deleted) => {
        //         if (err) {
        //             console.log(err)
        //         } else {
        //             console.log(deleted)
        //             res.status(200).end()
        //         }
        //     })
        // })
    
    
        // app.get("/", (req, res) => {
        //     res.render("index", {})
        // })
    
        // app.post("/save", (req, res) => {
    
        //     db.Article.find({
        //         title: req.body.title
        //     }, (err, found) => {
        //         if (found.length > 0) {
        //             res.send("already saved")
        //         } else {
        //             const newArticle = {
        //                 title: req.body.title,
        //                 teaser: req.body.teaser,
        //                 link: req.body.link
        //             }
    
        //             db.Article.create(newArticle, (err, inserted) => {
        //                 if (err) {
        //                     console.log(err)
        //                 } else {
        //                     console.log("INSERTED: " + inserted)
        //                     res.status(200).end()
        //                 }
        //             })
        //         }
        //     })
        // })
    





// app.post("/scrape", (req,res) =>{
     

 

// })