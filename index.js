const inputId = "id-input-area"
const outputId = "id-output-area"

function convert() {
  clearWarning();
  clearOutput();
  var input = getInputArea().value;
  var result = parse(input);
  if (result.success) {
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
    return traverseNode(doc.body.firstChild, 0)
}

function traverseNode(node, indent) {
    if (node.nodeType === Node.TEXT_NODE) {
        return renderText(node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        return renderNode(node, indent);
    } else {
      return "";
    }
}

function renderText(node) {
  const text = node.textContent.trim();
  return text ? `"${text}"` : ""
}

function renderNode(node, indent) {
  const tagName = node.tagName.toLowerCase();
  const attributes = renderAttrsOf(node, indent);
  const children = renderChildrenOf(node, indent);
  return `${tagName}()${attributes}${children}`;
}

function renderAttrsOf(node, indent) {
  return Array.from(node.attributes)
    .map(attr => "\n" + "\t".repeat(indent + 1) + renderAttr(attr))
    .join("");
}

function renderAttr(attr) {
  return `.attr("${attr.name}", "${attr.value}")`;
}

function renderChildrenOf(node, indent) {
  return Array.from(node.childNodes)
     .map(child => traverseNode(child, indent + 1))
     .filter(Boolean)
     .map(child => renderChild(child, indent + 1))
     .join("");
}

function renderChild(child, indent) {
  return "\n"+ "\t".repeat(indent) + `.with(${child})`;
}

function getDefault() {
  return `<div class="container" a="b">
      <h1>Hello, World!</h1>
      <p>This is a <strong>sample</strong> paragraph.</p>
  </div>`;
}

function parse(html) {
  try {
    return {
      success: true,
      value: htmlToJava(html),
    };
  } catch (e) {
    return {
      success: false,
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

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    htmlToJava,
    renderAttr,
    renderText
  };
}
