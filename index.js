/**
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2020 Open Assessment Technologies SA;
 */
const parser = require('./parser.js');
const bumper = require('./bumper.js');
const writer = require('conventional-changelog-conventionalcommits/writer-opts.js');

/**
 * Loads and aggregate the preset options
 * @param {Object?} presetConfig - default configuration
 * @returns {Promise<Object>} resolves with the preset configuration
 */
function loadPresetOptions(presetConfig = {}) {
    return Promise.all([
        parser(presetConfig),
        writer(presetConfig),
        bumper(presetConfig)
    ]).then(
        ([parserOpts, writerOpts, bumpOpts]) => ({
            conventionalChangelog: { parserOpts, writerOpts },
            gitRawCommitsOpts: { noMerges: null },
            parserOpts,
            writerOpts,
            recommendedBumpOpts: { parserOpts, whatBump: bumpOpts.whatBump }
        })
    );
}

/**
 * Get the preset configuration.
 * Module signature is expected as a conventional changelog preset
 * @param {Function|Object} presetParameter - either a callback or a default config
 * @returns {Promise<Object>} resolves with the configuration
 */
module.exports = function getPresetConfiguration(presetParameter) {
    if (typeof presetParameter === 'function') {
        return loadPresetOptions({})
            .then(presetData => presetParameter(null, presetData))
            .catch(err => presetParameter(err));
    }
    return loadPresetOptions(presetParameter || {});
};
