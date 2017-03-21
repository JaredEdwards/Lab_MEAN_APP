const express = require('express');
const parser = require('body-parser')
const Recipe = require('./db/models.js').Recipe

const app = express();


//this needs to be removed once angular replaces it
app.set('view engine', 'hbs')
app.use(parser.urlencoded({
    extended: true
}))
app.use(parser.json())

app.listen(3000, _ => {
    console.log("Express is started on port 3000");
});

app.get('/', (req, res) => {
    Recipe.find({}, (err, recipes) => {
        res.render('welcome');
    });
});

app.get('/recipes', (req, res) => {
    Recipe.find({}, (err, recipes) => {
        res.render('recipes', {
            recipes
        });
    });
});

app.post('/recipes', (req, res) => {
    let ingredients = req.body.recipe.ingredients.split(' ')
    const newRecipe = {
        recipe: req.body.recipe.name,
        ingredients: ingredients
    }
    Recipe.create(newRecipe, (err, url) => {
        res.redirect('/recipes');
    });
});

app.get('/recipes/:recipe', (req, res) => {
    Recipe.findOne({
        recipe: req.params.recipe
    }, (err, recipe) => {
        res.redirect('/recipes/:recipe')
    })
})
// < ---------->
// app.get("/candidates/:name", function(req, res){
//   Candidate.findOne({name: req.params.name}).then(function(candidate){
//     res.render("candidates-show", {
//       candidate: candidate
//     });
//   });
// });
// < ---------->
app.get('/recipes/:recipe/delete', (req, res) => {
    Recipe.remove({
        recipe: req.params.recipe
    }, () => {
        res.redirect('/recipes')
    })
})
