const express = require('express');
const parser = require('body-parser')
const Recipe = require('./db/models.js').Recipe

const app = express();



//this needs to be removed once angular replaces it
app.set("port", process.env.PORT || 3001)
app.set('view engine', 'hbs')
app.use(parser.urlencoded({
    extended: true
}))
app.use(parser.json({ extended: true}))

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
app.get('/api/recipes', (req, res) => {
    Recipe.find({}, (err, recipes) => {
        res.json(recipes)
    });
});
//POST method to create new
app.post('/api/recipes', (req, res) => {
    let ingredients = req.body.recipe.ingredients;
    ingredients.trim(' ');
    ingredients.split(' ');
    const newRecipe = {
        recipe: req.body.recipe.name,
        ingredients: ingredients
    }
    Recipe.create(newRecipe, (err, recipe) => {
        res.json(recipe);
    });
});

// needs to be a get request for a 'show' view
app.get('/api/recipes/:recipe', (req, res) => {
    Recipe.findOne({
        recipe: req.params.recipe
    }).then((recipe) => {
        res.json(recipe)
    });
});

// need to get individual show to work to get this to work
app.post('/api/recipes/:recipe', (req, res) => {
    // console.log(req.body.recipe.ingredients);
    Recipe.findOneAndUpdate({
        recipe: req.body.recipe.name
    }, req.body.recipe, {
        new: true
    }).then((recipe) => {
        res.json(recipe)
    })
})

//delete individual recipes
app.delete('/api/recipes/:recipe', (req, res) => {
    Recipe.findOneAndRemove({
        recipe: req.params.recipe
    }, () => {
        res.json('/recipes')
    })
})