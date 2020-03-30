const api = require('../api');
const Blog = require('../models/blog');

function xmlJsonToBlog (json) {
    const tumblr = json.tumblr;
    if (tumblr) {
        const name = tumblr.tumblelog && tumblr.tumblelog[0] && tumblr.tumblelog[0].$
              && tumblr.tumblelog[0].$.name;
        if (name) {
            const postsXmlJson = tumblr.posts && tumblr.posts[0] && tumblr.posts[0].post;
            if (postsXmlJson && postsXmlJson.map) {
                const posts = postsXmlJson.map(xmlJsonToPost).filter(x => x !== null);
                return new Blog({ name, posts });
            }
        }
    }
    return null;
}

// this may not work for non-photo posts
function xmlJsonToPost (json) {
    const $ = json.$;
    const captionArray = json['photo-caption'];
    const photoUrlArray = json['photo-url'];
    if ($ && $.url && captionArray && captionArray.join
        && photoUrlArray && photoUrlArray.length > 0) {
        const photoUrl = photoUrlArray[0] && photoUrlArray[0]._;
        const caption = captionArray.join('');
        const postUrl = $.url;
        if (photoUrl) {
            return { photoUrl, caption, postUrl };
        }
    }
    return null;
}

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
