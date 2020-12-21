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

/**
 * Get the parser configuration
 * @see https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-commits-parser#conventionalcommitsparseroptions
 * @param {Object?} config - default configuration
 * @returns {Object} the parser configuration
 */
module.exports = function parser(config = {}) {
    return Object.assign({
        headerPattern: /^(\w*)(?:\((.*)\))?!?: (.*)$/,
        breakingHeaderPattern: /^(\w*)(?:\((.*)\))?!: (.*)$/,
        headerCorrespondence: ['type', 'scope', 'subject'],
        noteKeywords: ['BREAKING CHANGE'],
        revertPattern: /^(?:Revert|revert:)\s"?([\s\S]+?)"?\s*This reverts commit (\w*)\./i,
        revertCorrespondence: ['header', 'hash'],
        issuePrefixes: ['#'],
        mergePattern: /^Merge (?:(?:.*)?branch(?:es)? (.*) into (.*)|pull request #(\d+) from (.*)|(.*) into (.*))$/i,
        mergeCorrespondence: ['source', 'destination', 'id', 'source']
    }, config);
};
