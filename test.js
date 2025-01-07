require('jsdom-global')();
var assert = require('assert');
const index = require('./index.js');

describe('html-to-java', function () {
  describe('#htmlToJava()', function () {
    it('<div></div> should return div()', function () {
      assert.equal(index.htmlToJava('<div></div>'), 'div()');
    });
  });

  describe("#capitalize", () => {
    it('converts a into A', () => {
      assert.equal(index.capitalize("a"), "A");
    });
  });
});