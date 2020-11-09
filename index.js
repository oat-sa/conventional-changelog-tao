const parser = require('./parser.js');
const bumper = require('./bumper.js');
const writer = require('conventional-changelog-conventionalcommits/writer-opts.js');

function loadPresetOptions(presetConfig = {}) {
    return Promise.all([parser(presetConfig), writer(presetConfig), bumper(presetConfig)]).then(
        ([parserOpts, writerOpts, whatBump]) => ({
            conventionalChangelog: { parserOpts, writerOpts },
            gitRawCommitsOpts: { noMerges: null },
            parserOpts,
            writerOpts,
            recommendedBumpOpts: { parserOpts, whatBump }
        })
    );
}

module.exports = function entryPoint(presetParameter) {
    // parameter passed can be either a config object or a callback function
    if (typeof presetParameter === 'function') {
        // parameter is a callback objece
        //
        return loadPresetOptions({})
            .then(presetData => {
                presetParameter(null, presetData);
            })
            .catch(err => presetParameter(err));
    }
    //parameters is an object with user defined config
    return loadPresetOptions(presetParameter || {});
};
