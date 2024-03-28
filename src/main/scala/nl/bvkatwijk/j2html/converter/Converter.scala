package nl.bvkatwijk.j2html.converter

import org.scalajs.dom.{DOMParser, MIMEType}

object Converter:
  def toJava(html: String): String =
    println("Parsing: " + html)
    DOMParser().parseFromString(html, MIMEType.`text/html`)
      .firstElementChild
      .children(1)
      .innerHTML
