package nl.bvkatwijk.j2html.converter

import scala.scalajs.js
import scala.scalajs.js.annotation.*

import org.scalajs.dom

// import javascriptLogo from "/javascript.svg"
@js.native @JSImport("/javascript.svg", JSImport.Default)
val javascriptLogo: String = js.native

@main
def Main(): Unit =
  dom.document.querySelector("#app").innerHTML = s"""
    <main class="container-fluid">
      <h1>j2html converter</h1>
      <div class="grid">
        <div>
          <textarea
            class="code code-input"
            id="code-input"
            name="bio"
            placeholder="<h1>Enter some html!</h1>"
            aria-label="Professional short bio"></textarea>
        </div>
        <div>
          <textarea class="code code-output" id="code-output" name="read-only" readonly placeholder="Java will appear here..."></textarea>
        </div>
      </div>
    </main>
  """

  setupInputListener(dom.document.getElementById("code-input"), dom.document.getElementById("code-output"))
end Main

def setupInputListener(in: dom.Element, out: dom.Element): Unit =
  def convert(html: String): Unit = out.innerHTML = Converter.toJava(html)

  in.addEventListener("input", e => convert(in.innerHTML))
end setupInputListener
