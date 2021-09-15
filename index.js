const express = require("express");
const app = express();


app.locals.basedir = __dirname;
app.use("/assets", express.static(__dirname + "/public/assets"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/home.html");
});

app.all("/dashboard", (req, res) => {
    if (req.headers.cookie && req.headers.cookie.includes(`data=${process.env.PASSWORD}`)) {
        res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        //res.sendFile(__dirname + "/public/dashboard.html");
    } else {
        res.redirect("/login?bad");
    }
});

app.get("/support", (req, res) => {
    res.sendFile(__dirname + "/public/support.html");
});

app.get("/homebutton", (req, res) => {
    res.sendFile(__dirname + "/public/button.html");
});

app.get("/competition-2020", (req, res) => {
    res.sendFile(__dirname + "/public/setup-comp-2020.html");
});

app.get("/data/parts", (req, res) => {
    res.sendFile(__dirname + "/clubdata/partlists.json");
});

app.get("/sitemap.xml", (req, res) => {
    res.sendFile(__dirname + "/sitemap.xml");
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
});

app.get("/ml", (req, res) => {
    res.sendFile(__dirname + "/public/ml.html");
});

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/public/404.html");
});


app.listen(100);
console.log("\n========[ Webiste deployed ] ========");
console.log(" [§] To access the site locally: \x1b[33mlocalhost:100\x1b[0m");
console.log(` [§] To access the site externally: \x1b[32m${require("ip").address()}:100\x1b[0m`);
require("dotenv").config();
module.exports = app;