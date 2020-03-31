function xmlJsonToBlog (json) {
    const tumblr = json.tumblr;
    if (tumblr) {
        const name = tumblr.tumblelog && tumblr.tumblelog[0] && tumblr.tumblelog[0].$
              && tumblr.tumblelog[0].$.name;
        if (name) {
            const postsXmlJson = tumblr.posts && tumblr.posts[0] && tumblr.posts[0].post;
            if (postsXmlJson && postsXmlJson.map) {
                console.log(`got ${postsXmlJson.length} posts`);
                const posts = postsXmlJson.map(xmlJsonToPost).filter(x => x !== null);
                return new Blog({ name, posts });
            }
        }
    }
    return null;
}

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
    } else if ($ && $.url) {
        const postUrl = $.url;
        const body = json['regular-body'];
        if (body && body.join) {
            return { body: body.join(''), postUrl };
        }
    }
    console.log('Could not extract data from a post json: ' + JSON.stringify(json));
    return null;
}

if (typeof module !== 'undefined') {
    module.exports = { xmlJsonToBlog, xmlJsonToPost };
}
