const express = require('express');
const ejs  = require ('ejs');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.get('/index', (req, res) => {
    res.render('index');
})

app.get('/teamcomps', (req, res) => {
    
    res.render('teamcomps');
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000")
})