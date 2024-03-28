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
              name="bio"
              placeholder="Enter html..."
              aria-label="Professional short bio"></textarea>
        </div>
        <div>
          <textarea class="code code-input" name="read-only" readonly placeholder="Java will appear here..."></textarea>
        </div>
      </div>
    </main>
  """

  setupCounter(dom.document.getElementById("counter"))
end Main

def setupCounter(element: dom.Element): Unit =
  var counter = 0

  def setCounter(count: Int): Unit =
    counter = count
    element.innerHTML = s"count is $counter"

  element.addEventListener("click", e => setCounter(counter + 1))
  setCounter(0)
end setupCounter
