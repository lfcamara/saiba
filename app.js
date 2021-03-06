require('./dados/database')();
var Data = require('./models/dado');

//==========LIBS==========

var express = require("express"),
    app = express(),
    bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

//==========ROUTES==========

app.use(express.static("public"));

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/result", function(req, res) {
    var search = req.query.search;
    var type = req.query.dataType;
    console.log(type)
    Data.find({
        [type]: search
    }, function(err, results) {
        if (err) {
            console.log(err);
        } else {
            res.render("result", { data: { results: results, search: search, type: req.query.dataType } });
        }
    });
});

app.listen(5000, function() {
    console.log("Server is Running!");
});