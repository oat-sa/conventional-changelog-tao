
const test = require('tape');
const parser = require('../../parser.js');

test('get parser options without parameter', t => {
    const options = parser();
    t.ok(typeof options === 'object', 'the parser returns an options object');
    t.ok(options.headerPattern instanceof RegExp, 'the options contains the header regexp');
    t.ok(options.breakingHeaderPattern instanceof RegExp, 'the options contains the breaking header regexp');
    t.end();
});

test('get augmented parser options', t => {
    const options = parser({ foo: 'bar'});
    t.ok(typeof options === 'object', 'the parser returns an options object');
    t.ok(options.headerPattern instanceof RegExp, 'the options contains the header regexp');
    t.equals(options.foo, 'bar', 'the options has been augmented');
    t.end();
});


