/*--
Creating the schema for the MongoDB database.
TASK: Create validations.
--*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;



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
    }
});



const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;