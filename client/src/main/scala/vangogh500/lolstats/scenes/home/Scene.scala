package vangogh500.lolstats.scenes.home

import japgolly.scalajs.react._
import japgolly.scalajs.react.vdom.html_<^._
import scalacss.ScalaCssReact._

object Scene {
  private val component = ScalaComponent.static("No args")(
    <.div(
      Styling.container,
      ^.className := "d-flex flex-grow-1 align-items-center justify-content-center flex-column bg-primary",
      <.h1(
        ^.className := "display-3 text-white mb-5",
        "Begin the Climb"
      )
    )
  )
  def apply() = component()
}
