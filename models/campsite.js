const mongoose = require('mongoose');
const Schema = mongoose.Schema; //shorthand so we can just write Schema

const campsiteSchema = new Schema({ //literally creating an object schema
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true //will add two properties to schema, showing when it was created and when it is updates
});

const Campsite = mongoose.model('Campsite', campsiteSchema); //creating a model from the Schema

module.exports = Campsite;