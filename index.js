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

// Welcome page and add one form
app.get('/', (req, res) => {
    Recipe.find({}, (err, recipes) => {
        res.render('welcome');
    });
});
// index or GET all recipes
app.get('/recipes', (req, res) => {
    Recipe.find({}, (err, recipes) => {
        res.render('recipes', {
            recipes
        });
    });
});
//POST method to create new
app.post('/recipes', (req, res) => {
    let ingredients = req.body.recipe.ingredients;
    ingredients.trim(' ');
    ingredients.split(' ');
    const newRecipe = {
        recipe: req.body.recipe.name,
        ingredients: ingredients
    }
    Recipe.create(newRecipe, (err, url) => {
        res.redirect('/recipes');
    });
});

// needs to be a get request for a 'show' view
app.get('/recipes/:recipe', (req, res) => {
    Recipe.findOne({
        recipe: req.params.recipe
    }).then((recipe) => {
        res.render('recipe', {
            recipe: recipe
        });
    });
});

// need to get individual show to work to get this to work
app.post('/recipes/:recipe', (req, res) => {
    // console.log(req.body.recipe.ingredients);
    Recipe.findOneAndUpdate({
        recipe: req.body.recipe.name
    }, req.body.recipe, {
        new: true
    }).then((recipe) => {
        res.redirect(`/recipes/${recipe.recipe}`)
    })
})

//delete individual recipes
app.get('/recipes/:recipe/delete', (req, res) => {
    Recipe.remove({
        recipe: req.params.recipe
    }, () => {
        res.redirect('/recipes')
    })
})
