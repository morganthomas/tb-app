const { xmlJsonToBlog, xmlJsonToPost } = require('../helpers/parse.js');

describe('xmlJsonToBlog', function () {
    it('produces null when there is no tumblr property', function () {
        expect(xmlJsonToBlog({})).toBe(null);
    });
});
