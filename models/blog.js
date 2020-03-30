const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    photoUrl: {
        type: String,
        required: false
    },
    caption: {
        type: String,
        required: false
    },
    body: {
        type: String,
        required: false
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

blogSchema.query.byName = function (name) {
    return this.where({ name });
}

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;
