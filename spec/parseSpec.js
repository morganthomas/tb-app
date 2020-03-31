const { xmlJsonToBlog, xmlJsonToPost } = require('../helpers/parse.js');

describe('xmlJsonToBlog', function () {
    it('produces null when there is no tumblr property', function () {
        expect(xmlJsonToBlog({})).toBe(null);
    });

    it('produces null when there is no name', function () {
        expect(xmlJsonToBlog({ tumblr: { posts: []
                                       , tumblelog: [ { $: { } } ] } })).toBe(null);
        expect(xmlJsonToBlog(
            { tumblr: {
                posts: [],
                tumblelog: [ ] } })).toBe(null);

        expect(xmlJsonToBlog({ tumblr: { posts: [] } })).toBe(null);
    });

    it('produces null when there is no post array', function () {
        expect(xmlJsonToBlog({ tumblr: { tumblelog: [ { $: { name: 'foo' } } ] } })).toBe(null);

        expect(xmlJsonToBlog({ tumblr: {
            tumblelog: [ { $: { name: 'foo' } } ],
            posts: [] } })).toBe(null);

        expect(xmlJsonToBlog({ tumblr: {
            tumblelog: [ { $: { name: 'foo' } } ],
            posts: [ { } ] } })).toBe(null);
    });

    it('produces null when post is not an array', function () {
        expect(xmlJsonToBlog({ tumblr: {
            posts: [ { post: null } ],
            tumblelog: [ { $: { name: 'foo' } } ] } })).toBe(null);
    });

    it('parses an xml json with no posts', function () {
        expect(xmlJsonToBlog({
            tumblr: {
                posts: [ { post: [] } ],
                tumblelog: [ { $: { name: 'foo' } } ] } }))
            .toEqual({ name: 'foo', posts: [] });

    });
});
