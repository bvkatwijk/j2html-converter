package nl.bvkatwijk.j2html.converter

object Converter:
  def toJava(html: String): String =
    """
      body(
        h1("Hello, World!"),
        img().withSrc("/img/hello.png")
      )
    """
