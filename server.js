var express = require('express');
var app = express();
var server = require('http').createServer(app);




app.get('/', function (req, res) {
    app.use(express.static("."));
    res.redirect('index.html');

});

server.listen(3000);

// var express = require("express");

// var app = express();


// app.get("/", function (req, res) {
//     app.use(express.static("newRepository"))
//     res.send("Hello")
    
// });


// app.listen(4000);