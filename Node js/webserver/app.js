require("dotenv").config();
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT;

//Handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials', function (err) {
    if (err) {
        console.log(err);
    }
});

//Servir contenido estatico middleware
app.use(express.static("public"));

app.get('/', function (req, res) {
    res.render('home', {
        title: "Title",
        author: "DOMPIR",
    });
});

app.get('/generic', function (req, res) {
    res.render('generic', {
        title: "Title",
        author: "DOMPIR",
    });
});

app.get('/elements', function (req, res) {
    res.render('elements', {
        title: "Title",
        author: "DOMPIR",
    });
});


app.get('/generic', function (req, res) {
    res.sendFile(__dirname + '/public/generic.html');
});

app.get('/elements', function (req, res) {
    res.sendFile(__dirname + '/public/elements.html');
});

app.get('/otra-ruta', function (req, res) {
    res.send('Hello World')
});

app.get('*', function (req, res) {
    // res.send('404 | Page not fount');
    res.sendFile(__dirname + '/public/404.html');
})

// app.listen(3000)

app.listen(port, () => {
    console.log("", port);
})