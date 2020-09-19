const express = require("express");
const app = express();

const fetch = require("node-fetch");

app.locals.basedir = __dirname;
app.use("/assets", express.static(__dirname + "/public/assets"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/home.html")
});

app.get("/homebutton", (req, res) => {
    res.sendFile(__dirname + "/public/button.html");
})

app.get("/wallpapers", (req, res) => {
    const notionDocId = "561b38d105ff496a8fe4626df19aefa8";

    fetch("https://potion-api.now.sh/html?id=" + notionDocId)
        .then(res => res.text())
        .then(text => {
            res.send(`
            <!DOCTYPE html>
            <html>
                <head>
                <title>Notion Doc</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link href="https://unpkg.com/@primer/css/dist/primer.css" rel="stylesheet" />
                <style>
                    body {
                        font-family: system-ui, sans-serif;
                    }
    
                    img {
                        max-width: 100%;
                        max-height: 70vh;
                    }

                    main {
                        width: 100vw;
                        max-width: 1000px;
                    }
    
                    /* add your own CSS to make it look how you want */
                </style>
                </head>
                <body>
                <main>${text}</main>
                </body>
            </html>
        `)
        })
})

// app.get("*", (req, res) => {
//     res.sendFile(__dirname + "/public/404.html");
// })

app.listen(100)
module.exports = app;