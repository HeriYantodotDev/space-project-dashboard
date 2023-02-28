const mongoose = require('mongoose');

const planetsSchemas = new mongoose.Schema({
    keplerName : {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Planet', planetsSchemas);