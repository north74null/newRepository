
var express = require("express");
var app = express();
import main from "./script"

app.get("/", function (req, res) {
    app.use(express.static("newRepository"))
    res.send(main)
    
});


app.listen(4000);