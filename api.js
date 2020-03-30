const { https } = require('follow-redirects');
const parseString = require('xml2js').parseString;

function getBlog(blog, callback) {
    const url = `https://${blog}.tumblr.com/api/read`;
    console.log('getting ' + url);
    https.get(url, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            parseString(data, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    callback(result);
                }
            });
        });
    });
}

module.exports = { getBlog };
