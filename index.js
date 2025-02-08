const inputId = "id-input-area";
const outputId = "id-output-area";
const indentation = "\t";

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
    return traverseNode(doc.body.firstChild, 0);
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
    .map(attr => "\n" + indentation.repeat(indent + 1) + renderAttr(attr))
    .join("");
}

function copyInput() {
  navigator.clipboard.writeText(
    document.getElementById(inputId)
      .textContent
    );
}

function copyOutput() {
  navigator.clipboard.writeText(
    document.getElementById(outputId)
      .textContent
    );
}

function renderAttr(attr) {
  const escapedValue = attr.value.replace(/"/g, '\\\"');
  switch (attr.name) {
    case "class": return attrClass(escapedValue.split(" "));
    case "style": return `.withStyle("${escapedValue}")`;
    case "src": return `.withSrc("${escapedValue}")`;
    default: return `.attr("${attr.name}", "${escapedValue}")`;
  }
}

function attrClass(values) {
  const v = values.map(v => `"${v}"`).join(", ");
  return values.length >= 1
    ? `.withClasses(${v})`
    : `.withClass(${v})`;
}

function renderChildrenOf(node, indent) {
  const childIndent = indent + 1;
  return Array.from(node.childNodes)
     .map(child => traverseNode(child, childIndent))
     .filter(Boolean)
     .map(child => renderChild(child, childIndent))
     .join("");
}

function renderChild(child, indent) {
  return "\n"+ "\t".repeat(indent) + prefixWith(child);
}

function prefixWith(child) {
  if (child.startsWith('"')) {
    return `.withText(${child})`;
  } else {
    return `.with(${child})`;
  }
}

function getDefault() {
  return `<div class="container" a="b" style="color: red;">
    <h1>Hello, World!</h1>
    <img src="/img/hello.png">
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
    renderChild,
    renderText
  };
}
