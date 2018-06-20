version := "0.1"
scalaVersion := "2.12.4"
name := "lolstats"

lazy val client = project
  .enablePlugins(ScalaJSPlugin)
  .settings(
    scalaJSUseMainModuleInitializer := true
  )
  .settings(
    libraryDependencies ++= {
      val scalajs_react = "1.2.0"
      Seq(
        "com.github.japgolly.scalajs-react" %%% "core" % scalajs_react
      )
    }
  )
  .settings(
    Seq(fullOptJS, fastOptJS, packageJSDependencies, packageMinifiedJSDependencies)
      .map(task => crossTarget in (Compile, task) := file("dist/client/js"))
  )
