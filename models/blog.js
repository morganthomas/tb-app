const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    photoUrl: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    postUrl: {
        type: String,
        required: true
    }
});

const blogSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    posts: {
        type: [postSchema],
        required: true
    }
});

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;
