const { https } = require('follow-redirects');

function getBlog(blog, callback) {
    const url = `https://${blog}.tumblr.com/api/read`;
    console.log('getting ' + url);
    https.get(url, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            console.log(data);
        });
    });
}

module.exports = { getBlog };
