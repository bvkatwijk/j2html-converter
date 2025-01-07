const test = require('uvu').test;
const index = require('./index.js');
const assert = require('uvu/assert');

test("asJava", () => assert.equal(index.asJava('<div></div>'), 'div()'));

test.run();