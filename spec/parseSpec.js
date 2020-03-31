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

    it('parses an xml json with two posts which parse and one post which does not parse', function () {
        expect(xmlJsonToBlog({
            tumblr: {
                tumblelog: [ { $: { name: 'foo' } } ],
                posts: [ { post: [
                    { },
                    { $: { url: 'foo' },
                      'photo-caption': [ 'b', 'ar' ],
                      'photo-url': [ { _: 'baz' } ] },
                    { $: { url: 'bletch' },
                      'regular-body': [ 's', 'n', 'arf' ] } ] } ] } }))
            .toEqual({ name: 'foo',
                       posts: [ { postUrl: 'foo', caption: 'bar', photoUrl: 'baz' },
                                { postUrl: 'bletch', body: 'snarf' } ] });
    });
});
