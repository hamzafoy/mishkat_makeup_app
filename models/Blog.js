/*--
Creating the schema for the MongoDB database.
TASK: Create validations.
--*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const BlogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    entry: {
        type: String,
        required: true
    }
});



const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;