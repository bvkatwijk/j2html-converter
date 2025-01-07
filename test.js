const test = require('uvu').test;
const index = require('./index.js');
const assert = require('uvu/assert');

//test("asJava", () => assert.equal(index.asJava('<div></div>'), 'div()'));

test("capitalize", () => assert.equal(index.capitalize("a"), "A"));
test.run();