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

/*--
div
  label(for="makeupname") Makeup Name:
  input(type="text", name="makeupname" value=review.name)
div
  label(for="brand") Brand:
  input(type="text", name="brand" value=review.brand)
div
  label(for="type") Type of Makeup:
  input(type="text", name="type" value=review.type)
div
  label(for="price") Price (per container):
  input(type="text", name="price" value=review.price)
div
  label(for="description") Description:
  input(type="text", name="description" value=review.description)
input(type="submit")
--*/