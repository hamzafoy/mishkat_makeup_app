/*::::::::::::::::::::::::::::::::::::::::
::::::::  Required Dependencies  :::::::::
::::::::::::::::::::::::::::::::::::::::*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;



/*::::::::::::::::::::::::::::::::::::::::
::::::::  Schema for MongoDB dB  :::::::::
::::::::::::::::::::::::::::::::::::::::*/

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



/*::::::::::::::::::::::::::::::::::::::::
::::::::::  Exporting Models  ::::::::::::
::::::::::::::::::::::::::::::::::::::::*/

const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;