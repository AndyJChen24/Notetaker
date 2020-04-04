const express = require("express");
const app = express();
var path = require("path");
app.use(express.static('public'))
const fs = require("fs");

const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require("./public/assets/routes/htmlRoutes")(app);
require("./public/assets/routes/apiRoutes")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});