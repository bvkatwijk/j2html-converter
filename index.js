const inputId = "id-input-area"
const outputId = "id-output-area"

function convert() {
  clearWarning();
  clearOutput();
  var input = getInputArea().value;
  var result = parse(input);
  if (result.sucess) {
    getOutputArea().innerHTML = result.value;
    hljs.highlightAll();
  } else {
    setWarning(result.value);
  }
}

function copyOutput() {
  var copyText = document.getElementById(outputId);
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
}

function validate() {}

function getOutputArea() {
  return document.getElementById(outputId);
}

function getInputArea() {
  return document.getElementById(inputId);
}

function setDefaultInput() {
  getInputArea().innerHTML = getDefault();
  convert();
}

function htmlToJava(html) {
    const parser = new window.DOMParser();
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

function parse(html) {
  try {
    return {
      sucess: true,
      value: htmlToJava(html),
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

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    htmlToJava,
    capitalize
  };
}
