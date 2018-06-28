package vangogh500.lolstats
package components

import japgolly.scalajs.react._
import japgolly.scalajs.react.vdom.html_<^._
import scalacss.ScalaCssReact._

import styling.{Coloring, Zindex, Spacing, Typography}

object LoadingScreen {
  private val component = ScalaComponent.static("LoadingScreen")(
    <.div(^.className := "position-fixed w-100 h-100 d-flex flex-grow-1 justify-content-center align-items-center flex-column",
      Zindex(5), Coloring.bg("Primary"),
      <.div(
        <.img(^.src := "https://streamlabs.com/images/gallery/default.gif"),
        <.h5(^.className := "text-white text-center mt-4", Typography.ff("VT323"),
          "Contacting HQ..."
        )
      )
    )
  )
  def apply() = component()
}
