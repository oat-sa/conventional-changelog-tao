const test = require('tape');
const crypto = require('crypto');
const bumper = require('../../bumper.js');

const getCommit = commitData =>
    Object.assign(
        {
            type: null,
            scope: null,
            subject: null,
            id: null,
            source: null,
            merge: null,
            header: '',
            body: null,
            footer: null,
            notes: [],
            references: [],
            mentions: [],
            revert: null,
            hash: crypto.randomBytes(64).toString('hex')
        },
        commitData
    );

test('get bumper options without parameter', t => {
    const options = bumper();
    t.ok(typeof options === 'object', 'the bumper returns an options object');
    t.ok(typeof options.whatBump === 'function', 'the options contains the whatBump function');
    t.end();
});

test('get augmented bumper options', t => {
    const options = bumper({ foo: 'bar' });
    t.ok(typeof options === 'object', 'the bumper returns an options object');
    t.ok(typeof options.whatBump === 'function', 'the options contains a whatBump function');
    t.equals(options.foo, 'bar', 'the options has been augmented');
    t.end();
});

test('whatBump returns correct level, reason and stats with one fix commit', t => {
    const commits = [
        getCommit({
            type: 'fix',
            subject: 'update controller with new bbq master',
            header: 'fix: update controller with new bbq master'
        })
    ];

    const results = bumper().whatBump(commits);

    t.deepEquals(results, {
        level: 2,
        reason: 'There are 0 BREAKING CHANGE, 0 feature, 1 fix',
        stats: {
            commits: 1,
            breakings: 0,
            features: 0,
            fixes: 1,
            unset: 0
        }
    });

    t.end();
});

test('whatBump returns correct level, reason and stats with multiple commits including a feature', t => {
    const commits = [
        getCommit({
            type: 'fix',
            subject: 'update controller with new bbq master',
            header: 'fix: update controller with new bbq master'
        }),
        getCommit({
            type: 'build',
            subject: 'remove version in package.json',
            header: 'build: remove version in package.json'
        }),
        getCommit({
            type: 'fix',
            subject: 'ensure the temperature is correct',
            header: 'fix: ensure the temperature is correct'
        }),
        getCommit({
            type: 'feat',
            subject: 'add a temperature controller',
            header: 'feat: add a temperature controller'
        }),
        getCommit({
            type: 'chore',
            subject: 'update dev dependencies',
            header: 'chore: update dev dependencies'
        })
    ];

    const results = bumper().whatBump(commits);

    t.deepEquals(results, {
        level: 1,
        reason: 'There are 0 BREAKING CHANGE, 1 feature, 2 fixes',
        stats: {
            commits: 5,
            breakings: 0,
            features: 1,
            fixes: 2,
            unset: 0
        }
    });

    t.end();
});

test('whatBump returns correct level, reason and stats with a breaking change in a feature', t => {
    const commits = [
        getCommit({
            id: '106',
            source: 'oat-sa/fix/BBQ-987/cap-grill-temparature',
            merge: 'Merge pull request #106 from oat-sa/fix/BBQ-987/cap-grill-temparature',
            header: 'Fix/bbq 987/cap grill temparature'
        }),
        getCommit({
            type: 'fix',
            subject: 'update controller with new bbq master',
            header: 'fix: update controller with new bbq master'
        }),
        getCommit({
            type: 'build',
            subject: 'remove version in package.json',
            header: 'build: remove version in package.json'
        }),
        getCommit({
            type: 'fix',
            subject: 'ensure the temperature is correct',
            header: 'fix: ensure the temperature is correct'
        }),
        getCommit({
            type: 'feat',
            subject: 'change the temperature controller interface',
            header: 'feat!: change the temperature controller interface'
        }),
        getCommit({
            type: 'chore',
            subject: 'update dev dependencies',
            header: 'chore: update dev dependencies'
        })
    ];

    const results = bumper().whatBump(commits);

    t.deepEquals(results, {
        level: 0,
        reason: 'There are 1 BREAKING CHANGE, 1 feature, 2 fixes',
        stats: {
            commits: 6,
            breakings: 1,
            features: 1,
            fixes: 2,
            unset: 0
        }
    });

    t.end();
});

test('whatBump returns correct level, reason and stats with a single breaking change in the footer', t => {
    const commits = [
        getCommit({
            id: '106',
            source: 'oat-sa/fix/BBQ-987/cap-grill-temparature',
            merge: 'Merge pull request #106 from oat-sa/fix/BBQ-987/cap-grill-temparature',
            header: 'Fix/bbq 987/cap grill temparature'
        }),
        getCommit({
            type: 'feat',
            subject: 'change the temperature controller interface',
            header: 'feat: change the temperature controller interface',
            footer: 'BREAKING CHANGE: be carefull the controller interface has changed',
            notes: [{ text : 'be carefull the controller interface has changed' } ]
        })
    ];

    const results = bumper().whatBump(commits);

    t.deepEquals(results, {
        level: 0,
        reason: 'There are 1 BREAKING CHANGE, 1 feature, 0 fix',
        stats: {
            commits: 2,
            breakings: 1,
            features: 1,
            fixes: 0,
            unset: 0
        }
    });

    t.end();
});

test('whatBump returns correct level, reason and stats without any conv commit', t => {
    const commits = [
        getCommit({
            id: '106',
            source: 'oat-sa/fix/BBQ-987/cap-grill-temparature',
            merge: 'Merge pull request #106 from oat-sa/fix/BBQ-987/cap-grill-temparature',
            header: 'Fix/bbq 987/cap grill temparature'
        }),
        getCommit({
            type: 'fix',
            subject: 'update controller with new bbq master',
            header: 'fix: update controller with new bbq master'
        }),
        getCommit({
            type: 'build',
            subject: 'remove version in package.json',
            header: 'build: remove version in package.json'
        }),
        getCommit({
            type: 'fix',
            subject: 'ensure the temperature is correct',
            header: 'fix: ensure the temperature is correct'
        }),
        getCommit({
            type: 'feat',
            subject: 'change the temperature controller interface',
            header: 'feat!: change the temperature controller interface'
        }),
        getCommit({
            type: 'chore',
            subject: 'update dev dependencies',
            header: 'chore: update dev dependencies'
        })
    ];

    const results = bumper().whatBump(commits);

    t.deepEquals(results, {
        level: 0,
        reason: 'There are 1 BREAKING CHANGE, 1 feature, 2 fixes',
        stats: {
            commits: 6,
            breakings: 1,
            features: 1,
            fixes: 2,
            unset: 0
        }
    });

    t.end();
});
const mergeCommit = getCommit({
    id: '106',
    source: 'oat-sa/fix/BBQ-987/cap-grill-temparature',
    merge: 'Merge pull request #106 from oat-sa/fix/BBQ-987/cap-grill-temparature',
    header: 'Fix/bbq 987/cap grill temparature'
});

const buildCommit = getCommit({
    type: 'build',
    subject: 'remove version in package.json',
    header: 'build: remove version in package.json'
});

const choreCommit = getCommit({
    type: 'chore',
    subject: 'update dev dependencies',
    header: 'chore: update dev dependencies'
});

const fixCommit = getCommit({
    type: 'fix',
    subject: 'update controller with new bbq master',
    header: 'fix: update controller with new bbq master'
});
