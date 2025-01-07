var jsonDomGlobal = require('jsdom-global')();
var jsdom = require('jsdom');
var assert = require('assert');
const { expect } = require("chai");
const index = require('./index.js');

describe('html-to-java', function () {
//  describe('#htmlToJava()', function () {
//    it('<div></div> should return div()', function () {
//      assert.equal(index.htmlToJava('<div></div>'), 'div()');
//    });
//  });

  describe("#capitalize", () => {
    it('converts a into A', () => {
      assert.equal(index.capitalize("a"), "A");
    });
  });

  describe("#renderAttr", () => {
  let document;
    before(function () {
        document = new jsdom.JSDOM(`<!DOCTYPE html><html><body></body></html>`)
          .window.document;
    });

    it('converts a=b into .attr("a", "b")', () => {
      const htmlString = `<div class="container" a="b"></div>`;
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlString;
      const element = tempDiv.firstElementChild;
      const attr = Array.from(element.attributes)[1];
      assert.equal(index.renderAttr(attr, 0), `.attr("a", "b")`);
    });

    it('converts a=b (indent=1) into \t.attr("a", "b")', () => {
      const htmlString = `<div class="container" a="b"></div>`;
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlString;
      const element = tempDiv.firstElementChild;
      const attr = Array.from(element.attributes)[1];
      assert.equal(index.renderAttr(attr, 1), `\t.attr("a", "b")`);
    });
  });
});