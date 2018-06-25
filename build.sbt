version := "0.1"
scalaVersion := "2.12.4"
name := "lolstats"

lazy val client = (project in file("client"))
  .enablePlugins(ScalaJSPlugin)
  .settings(
    scalaJSUseMainModuleInitializer := true
  )
  .settings(
    libraryDependencies ++= {
      val scalajs_react = "1.2.0"
      val scalacss = "0.5.3"
      Seq(
        "com.github.japgolly.scalajs-react" %%% "core" % scalajs_react,
        "com.github.japgolly.scalajs-react" %%% "extra" % scalajs_react,
        "com.github.japgolly.scalacss" %%% "core" % scalacss,
        "com.github.japgolly.scalacss" %%% "ext-react" % scalacss
      )
    }
  )
  .settings(
    Seq(fullOptJS, fastOptJS, packageJSDependencies, packageMinifiedJSDependencies)
      .map(task => crossTarget in (Compile, task) := file("client_server/src/main/resources/js"))
  )

lazy val client_server = (project in file("client_server"))
  .settings(
    libraryDependencies ++= {
      val akka_actors = "2.5.13"
      val akka_http = "10.1.3"
      Seq(
        "com.typesafe.akka" %% "akka-actor" % akka_actors,
        "com.typesafe.akka" %% "akka-stream" % akka_actors,
        "com.typesafe.akka" %% "akka-http" % akka_http
      )
    }
  )
