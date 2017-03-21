const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/recipes', (err) => {
    (err) ? console.log(err): console.log("Mongo's live");
});



module.exports = mongoose;
