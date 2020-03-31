const api = require('../api');
const Blog = require('../models/blog');
const { xmlJsonToBlog } = require('../helpers/parse');

module.exports = {
    blog: function (req, res) {
        Blog.find().byName(req.params.blog).exec(function (err, blogs) {
            if (err) {
                console.log(err);
            } else if (blogs.length > 0) {
                res.send(blogs[0]);
            } else {
                api.getBlog(req.params.blog, function (xmlJson) {
                    const blog = xmlJsonToBlog(xmlJson);
                    res.send(blog);
                    blog.save();
                });
            }
        });
    }
};
