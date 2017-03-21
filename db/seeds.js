const Recipe = require('./models.js').Recipe

const seedData = require('./seedData')

Recipe.remove({}, _ => {
    Recipe.create(seedData, _ => {
        console.log("Seeded DB and killing Process");
        process.exit();
    })
})
