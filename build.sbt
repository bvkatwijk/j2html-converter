import org.scalajs.linker.interface.ModuleSplitStyle

lazy val converter = project.in(file("."))
  .enablePlugins(ScalaJSPlugin)
  .settings(
    scalaVersion := "3.3.1",
    scalaJSUseMainModuleInitializer := true,
    scalaJSLinkerConfig ~= {
      _.withModuleKind(ModuleKind.ESModule)
        .withModuleSplitStyle(
          ModuleSplitStyle.SmallModulesFor(List("nl.bvkatwijk.j2html.converter")))
    },
    libraryDependencies += "org.scala-js" %%% "scalajs-dom" % "2.4.0",
  )