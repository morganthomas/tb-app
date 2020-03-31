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

describe('xmlJsonToPost', function () {
    it('produces null when there is no url', function () {
        expect(xmlJsonToPost({ 'photo-caption': ['bar'], 'photo-url': [{ _: 'baz' }] }))
            .toBe(null);

        expect(xmlJsonToPost({ 'photo-caption': ['bar'],
                               'photo-url': [{ _: 'baz' }],
                               $: { } })).toBe(null);
    });

    it('produces null when there is a url and a photo but no caption array', function () {
        expect(xmlJsonToPost({ $: { url: 'abc' },
                               'photo-caption': null,
                               'photo-url': [{ _: 'def' }] })).toBe(null);
    });

    it('produces null when there is a url and a caption but no photo', function () {
        expect(xmlJsonToPost({ $: { url: 'abc' },
                               'photo-caption': ['def'],
                               'photo-url': null })).toBe(null);
    });

    it('produces null when there is nothing but a url', function () {
        expect(xmlJsonToPost({ $: { url: 'abc' } })).toBe(null);
    });

    it('parses if there is a url and a photo', function () {
        expect(xmlJsonToPost({ $: { url: 'abc' },
                               'photo-caption': [],
                               'photo-url': [{ _: 'ghi' }] }))
            .toEqual({ postUrl: 'abc', caption: '', photoUrl: 'ghi' });
    });

    it('parses if there is a url and a body array', function () {
        expect(xmlJsonToPost({ $: { url: 'abc' }, 'regular-body': [] }))
            .toEqual({ postUrl: 'abc', body: '' });
    });
});
