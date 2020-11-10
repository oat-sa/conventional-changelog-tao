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
