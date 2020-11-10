const test = require('tape');
const preset = require('../../index.js');

function assertPresetConfig(presetConfig, t){
    t.ok(typeof presetConfig === 'object', 'the presetConfig is an object');
    t.ok(typeof presetConfig.parserOpts === 'object', 'the presetConfig has the parser options');
    t.ok(typeof presetConfig.writerOpts === 'object', 'the presetConfig has the writer options');
    t.ok(typeof presetConfig.gitRawCommitsOpts === 'object', 'the presetConfig has the raw commit options');
    t.ok(typeof presetConfig.conventionalChangelog === 'object', 'the presetConfig has the conventionalChangelog options');
    t.ok(typeof presetConfig.recommendedBumpOpts === 'object', 'the presetConfig has the recommendedBump options');
    t.ok(typeof presetConfig.recommendedBumpOpts.whatBump === 'function', 'the whatBump function is available');
}

test('get preset config without parameter', t => {
    t.plan(7);
    return preset().then(presetConfig => {
        assertPresetConfig(presetConfig, t);
    });
});


test('get preset with a callback function', t => {
    t.plan(8);
    preset( function(err, presetConfig){
        t.equal(err, null, 'No error returned');
        assertPresetConfig(presetConfig, t);
        t.end();
    });
});

test('get preset augmented preset', t => {
    t.plan(9);
    return preset({ foo : 'bar' }).then(presetConfig => {
        assertPresetConfig(presetConfig, t);
        t.equal(presetConfig.parserOpts.foo, 'bar', 'the parser options are augmented');
        t.equal(presetConfig.recommendedBumpOpts.foo, 'bar', 'the parser options are augmented');
    });
});

