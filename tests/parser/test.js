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
const test = require('tape');
const parser = require('../../parser.js');
let noop;

test('get parser options without parameter', t => {
    const options = parser();
    t.ok(typeof options === 'object', 'the parser returns an object');
    t.ok(options.headerPattern instanceof RegExp, 'the options contain the header regexp');
    t.ok(options.breakingHeaderPattern instanceof RegExp, 'the options contain the breaking header regexp');
    t.end();
});

test('get augmented parser options', t => {
    const options = parser({ foo: 'bar' });
    t.ok(typeof options === 'object', 'the parser returns an object');
    t.ok(options.headerPattern instanceof RegExp, 'the options contain the header regexp');
    t.equals(options.foo, 'bar', 'the parser options are augmented');
    t.end();
});

test('the merge detection pattern', t => {
    const options = parser();

    const cases = [
        [
            'Merge pull request #107 from oat-sa/fix/BBQ-567/fix-wrong-dep',
            [noop, noop, '107', 'oat-sa/fix/BBQ-567/fix-wrong-dep', noop, noop]
        ],
        [`Merge branch 'develop' into master`, [`'develop'`, 'master', noop, noop, noop, noop]],
        [
            `Merge branch 'develop' of https://github.com/oat-sa/extension-tao-foo/ into feature/ABC-546/plop`,
            [
                `'develop' of https://github.com/oat-sa/extension-tao-foo/`,
                'feature/ABC-546/plop',
                noop,
                noop,
                noop,
                noop
            ]
        ],
        [
            'Merge BRANCH "develop" and feature/ABC-546/plop into "main"',
            ['"develop" and feature/ABC-546/plop', '"main"', noop, noop, noop, noop]
        ],
        [
            'Merge 1f120f0102b4ec9e035a57f24f0378a034b0e478 into 0fb13d2977e202219a7982cce183a5b91543e6b6',
            [
                noop,
                noop,
                noop,
                noop,
                '1f120f0102b4ec9e035a57f24f0378a034b0e478',
                '0fb13d2977e202219a7982cce183a5b91543e6b6'
            ]
        ]
    ];

    for (let [expression, expected] of cases) {
        t.deepEqual(expression.match(options.mergePattern).slice(1, 7), expected);
    }

    t.equal('fix: foo'.match(options.mergePattern), null);
    t.equal('feat!: some nice feature'.match(options.mergePattern), null);
    t.equal('chore: version bump'.match(options.mergePattern), null);

    t.end();
});
