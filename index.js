const express = require('express');

const Recipe = require('./db/models.js').Recipe

const app = express();


//this needs to be removed once angular replaces it
app.set('view engine', 'hbs')

app.listen(3000, _ => {
    console.log("Express is started on port 3000");
});

app.get('/', (req, res) => {
    Recipe.find({}, (err, recipes) => {
        res.render('index', {
            recipes
        });
    });
});
