function convert() {
  clearWarning();
  clearOutput();
  var input = getInputArea().value;
  var result = parse(input);
  if (result.sucess) {
    getInputArea().value = JSON.stringify(result.value, null, 2);
    var java = asJava(result.value);
    getOutputArea().innerHTML = java;
    hljs.highlightAll();
  } else {
    setWarning(result.value);
  }
}

function toPrettyJsonString(json) {
    return JSON.stringify(json, null, 2);
}

function copyOutput() {
  var copyText = document.getElementById("json-output");
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices
  navigator.clipboard.writeText(copyText.value);
}

function validate() {}

function getOutputArea() {
  return document.getElementById("json-output");
}

function getInputArea() {
  return document.getElementById("json-input");
}

function setDefaultInput() {
  getInputArea().innerHTML = toPrettyJsonString(getDefaultJson());
  convert();
}

function htmlToJava(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return traverseNode(doc.body)
      .replace(/^body\(/, "").replace(/\)$/, "");
}

function traverseNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent.trim() ? `"${node.textContent.trim()}"` : "";
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
        const tagName = node.tagName.toLowerCase();
        const attributes = Array.from(node.attributes)
            .map(attr => `${attr.name}="${attr.value}"`)
            .join(", ");
        const children = Array.from(node.childNodes)
            .map(child => traverseNode(child))
            .filter(Boolean)
            .join(", ");
        return `${tagName}(${attributes}${attributes && children ? ", " : ""}${children})`;
    }
    return "";
}

function getDefault() {
  return `<div class="container">
      <h1>Hello, World!</h1>
      <p>This is a <strong>sample</strong> paragraph.</p>
  </div>`;
}

function getDefaultJson() {
  return {
    glossary: {
      title: "example glossary",
      GlossDiv: {
        title: "S",
        GlossList: {
          GlossEntry: {
            ID: "SGML",
            SortAs: "SGML",
            GlossTerm: "Standard Generalized Markup Language",
            Acronym: "SGML",
            Abbrev: "ISO 8879:1986",
            GlossDef: {
              para: "A meta-markup language, used to create markup languages such as DocBook.",
              GlossSeeAlso: ["GML", "XML"],
            },
            GlossSee: "markup",
          },
        },
      },
    },
  };
}

function parse(jsonString) {
  try {
    return {
      sucess: true,
      value: JSON.parse(jsonString),
    };
  } catch (e) {
    return {
      sucess: false,
      value: e,
    };
  }
}

function getWarningCard() {
  return document.getElementById("warning-card");
}

function clearWarning() {
  getWarningCard().innerHTML = null;
}

function clearOutput() {
  getOutputArea().innerHTML = null;
}

function setWarning(error) {
  getWarningCard().innerHTML =
    '<div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>Parsing Error</strong>\n' +
    error +
    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
}

function asJava(json) {
    var keys = Object.keys(json)
        .map(it => '\n\t\t.put("' + it + '", instance.get' + capitalize(it) + '())');
  return (
    "private static JSONObject json(Instance instance) {" +
    "\n\treturn new JSONObject()" +
    keys +
    ";" +
    "\n}"
  );
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    asJava,
    capitalize
  };
}
