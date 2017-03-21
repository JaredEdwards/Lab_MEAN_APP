const mongoose = require('./connection.js')

const RecipeSchema = new mongoose.Schema({
    recipe: String,
    ingredients: []
}, {
    timestamps: true
})

const Recipe = mongoose.model('Recipe', RecipeSchema)

module.exports = {
    Recipe
}
