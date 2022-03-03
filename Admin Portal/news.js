
const News = require('./models/news');
const  ObjectID = require('mongodb').ObjectId;
var newsdatamodel = { title: "", description: "", id: "", error: "" }
var express = require('express'),
    router = express.Router();

router.get('/add-news/:id?', function (req, res) {

    var id = req.params.id;

    if (!id) { return res.render("addnews", { data: newsdatamodel }); }

    else {
        News.findOne({ _id: id }, function (err, data) {

            if (data)
                return res.render('addnews', { data: data });

            else
                return res.render('addnews', { data: newsdatamodel });
        });

    }
});


router.post('/add-news/:id?', function (req, res) {

    if (req.body.id) {
        //{ $set: { title: news.title, description: news.description, imageurl: news.imageurl }
        var news = new News(req.body);

        news.update({ _id: ObjectID(news.id)}, {
            $set: { title: news.title, description: news.description, imageurl: news.imageurl },
            function(err) {
                if (err) {
                    console.log(err);

                }
                else {
                    return res.redirect("/dashboard");
                }
            }
        })
    }
    else {
        var news = new News(req.body);
        news.save(function (err) {
            if (err) {
                console.log(err);
            }
            else {
                return res.redirect("/dashboard");
            }
        })

    }

});


module.exports = router;
