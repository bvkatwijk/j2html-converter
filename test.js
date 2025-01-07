var jsonDomGlobal = require('jsdom-global')();
var jsdom = require('jsdom');
var assert = require('assert');
const { expect } = require("chai");
const index = require('./index.js');

describe('html-to-java', function () {
  describe('#htmlToJava', function () {
    it('should render <div></div> as div()', function () {
      assert.equal(index.htmlToJava('<div></div>'), 'div()');
    });

    it('should render <div a="b"></div> as div()\n\t.attr("a", "b")', function () {
      assert.equal(index.htmlToJava('<div a="b"></div>'), 'div()\n\t.attr("a", "b")');
    });
  });

  describe("#renderAttr", () => {
    function elementFrom(html) {
        document = new jsdom.JSDOM(`<!DOCTYPE html><html><body></body></html>`)
          .window.document;
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        return tempDiv.firstElementChild;
    }

    function firstAttribute(htmlString) {
      return Array.from(elementFrom(htmlString).attributes)[0];
    }

    it('converts a=b into .attr("a", "b")', () => {
      const attr = firstAttribute(`<div a="b"></div>`);
      assert.equal(index.renderAttr(attr, 0), `.attr("a", "b")`);
    });

    it('converts a="b" (indent=1) into \t.attr("a", "b")', () => {
      const attr = firstAttribute(`<div a="b"></div>`);
      assert.equal(index.renderAttr(attr, 1), `\t.attr("a", "b")`);
    });
  });
});
