const addBangNotes = require('conventional-changelog-conventionalcommits/add-bang-notes.js');

module.exports = function (config) {
    return {
        whatBump: commits => {
            let level = 2;
            let breakings = 0;
            let features = 0;
            let fixes = 0;

            commits.forEach(commit => {
                // adds additional breaking change notes
                // for the special case, test(system)!: hello world, where there is
                // a '!' but no 'BREAKING CHANGE' in body:
                addBangNotes(commit);
                if (commit.notes.length > 0) {
                    breakings += commit.notes.length;
                    level = 0;
                } else if (commit.type === 'feat' || commit.type === 'feature') {
                    features += 1;
                    if (level === 2) {
                        level = 1;
                    }
                } else if (commit.type === 'fix'){
                    fixes++;
                }
            });

            if (config.preMajor && level < 2) {
                level++;
            }

            return {
                level: level,
                reason: getReason(breakings, features, fixes)
            };
        }
    };
};

function getReason(breakings, features, fixes) {
    return [
        breakings > 1 ? `There are ${breakings} BREAKING CHANGES` : 'There is no breaking change',
        `${features} feature${features > 1 ? 's' : ''}`,
        `${fixes} fix${fixes > 1 ? 'es' : ''}`
    ].join(', ');
}
