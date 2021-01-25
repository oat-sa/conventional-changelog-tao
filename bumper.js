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
const addBangNotes = require('conventional-changelog-conventionalcommits/add-bang-notes.js');

/**
 * Get bumper configuration
 *
 * @see https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-recommended-bump#options
 *
 * @param {Object} config - the default configuration
 * @returns {Promise<Object>} resolves with the bumper configuration
 */
module.exports = function bumper(config = {}) {
    return Object.assign(
        {
            /**
             * calculate the bump
             * @param {Object[]} commits - the commit to evaluate
             * @returns {Object} with the level and the reason
             */
            whatBump(commits) {

                //Levels are '2' for fix, '1' for feature, '0' for breaking
                let level = 2;
                let breakings = 0;
                let features = 0;
                let fixes = 0;

                //console.log(commits);
                commits.forEach(commit => {
                    if(commit.merge === null){
                        addBangNotes(commit); //add notes if breaking change or with "!"

                        //it looks like in cc preset it's the way to detect breaking change.
                        //if other notes types are added, it would be better to add a "breaking" property to the commit
                        if (commit.notes.length > 0) {
                            breakings++;
                            level = 0;
                        }
                        if (commit.type === 'feat' || commit.type === 'feature') {
                            features++;
                            if (level === 2) {
                                level = 1;
                            }
                        } else if (commit.type === 'fix') {
                            fixes++;
                        }
                    }
                });

                if (config.preMajor && level < 2) {
                    level++;
                }

                return {
                    level: level,
                    reason: getReason(breakings, features, fixes),
                    stats: {
                        commits: commits.length,
                        breakings,
                        features,
                        fixes,
                        merge: commits.filter(({ merge }) => !!merge).length,
                        unset: commits.filter(({ type, merge }) => !type && !merge).length
                    }
                };
            }
        },
        config
    );
};

/**
 * Get the reason of the bump
 * @param {number} breakings - number of breaking changes
 * @param {number} features - number of features
 * @param {number} fixes - number of fixes
 * @returns {string} reason message
 */
function getReason(breakings = 0, features = 0, fixes = 0) {
    return [
        `There are ${breakings} BREAKING CHANGE${breakings > 1 ? `S` : ''}`,
        `${features} feature${features > 1 ? 's' : ''}`,
        `${fixes} fix${fixes > 1 ? 'es' : ''}`
    ].join(', ');
}
