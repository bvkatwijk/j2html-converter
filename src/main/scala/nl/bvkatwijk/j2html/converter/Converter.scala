package nl.bvkatwijk.j2html.converter

import org.scalajs.dom.{DOMParser, MIMEType}

object Converter:
  def toJava(html: String): String =
    DOMParser().parseFromString(html, MIMEType.`text/html`)
      .firstElementChild
      .toString
