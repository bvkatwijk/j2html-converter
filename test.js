var jsdom = require('jsdom');
var assert = require('assert');
const { expect } = require("chai");
const index = require('./index.js');

require('jsdom-global')();

describe('html-to-java', () => {
  describe('#htmlToJava', () => {
    it('should render <div></div> as div()', () => {
      assert.equal(index.htmlToJava('<div></div>'), 'div()');
    });

    it('should render <div a="b"></div> as div()\n\t.attr("a", "b")', () => {
      assert.equal(index.htmlToJava('<div a="b"></div>'), 'div()\n\t.attr("a", "b")');
    });
  });

  describe("#renderAttr", () => {
    function testAttr(attr) {
      return firstAttribute(`<div ${attr}></div>`);
    }

    describe("#style", () => {
      it('converts style="color: red;" into .withStyle("color: red;")', () => {
        assert.equal(index.renderAttr(testAttr('style="color: red;"')), `.withStyle("color: red;")`);
      });
    });

    describe("#src", () => {
      it('converts src="/img/hello.png" into .withSrc("/img/hello.png")', () => {
        assert.equal(index.renderAttr(testAttr('src="/img/hello.png"')), `.withSrc("/img/hello.png")`);
      });
    });

    it('converts a="b" into .attr("a", "b")', () => {
      assert.equal(index.renderAttr(testAttr('a="b"')), `.attr("a", "b")`);
    });

    it('escapes attr containing double quotes', () => {
      assert.equal(index.renderAttr(testAttr('hx-vals="{&quot;page&quot;:&quot;0&quot;}"')), `.attr("hx-vals", "{\\\"page\\\":\\\"0\\\"}")`)
    });

    it('converts class="a" into .withClasses("a")', () => {
      assert.equal(index.renderAttr(testAttr('class="a"')), `.withClasses("a")`);
    });

    it('converts class="a b" into .withClasses("a", "b")', () => {
      assert.equal(index.renderAttr(testAttr('class="a b"')), `.withClasses("a", "b")`);
    });
  });

  describe("#renderChild", () => {
    it("renders quoted string as as .withText(\"data\")", () => {
      assert.equal(index.renderChild("\"data\""), "\n.withText(\"data\")");
    });

    it("renders non-qouted string as as .with(data)", () => {
      assert.equal(index.renderChild("data"), "\n.with(data)");
    });
  });

  describe("#renderText", () => {
    function testText(string) {
      return elementFrom(`<div>${string}</div>`);
    }

    it("renders a as \"a\"", () => {
      assert.equal(index.renderText(testText("a")), "\"a\"");
    });

    it("renders empty text as empty string", () => {
      assert.equal(index.renderText(testText("")), "");
    });
  });
});

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
