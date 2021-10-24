/*::::::::::::::::::::::::::::::::::::::::
::::::::  Required Dependencies  :::::::::
::::::::::::::::::::::::::::::::::::::::*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;



/*::::::::::::::::::::::::::::::::::::::::
::::::::  Schema for MongoDB dB  :::::::::
::::::::::::::::::::::::::::::::::::::::*/

const ReviewSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    src: {
        type: String,
        required: false
    }
});



/*::::::::::::::::::::::::::::::::::::::::
::::::::::  Exporting Models  ::::::::::::
::::::::::::::::::::::::::::::::::::::::*/

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;