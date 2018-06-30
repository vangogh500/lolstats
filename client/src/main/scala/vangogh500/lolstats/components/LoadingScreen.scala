package vangogh500.lolstats
package components

import japgolly.scalajs.react._
import japgolly.scalajs.react.vdom.html_<^._
import scalacss.ScalaCssReact._

import styling.{Coloring, Zindex, Spacing, Typography}

/**
 * Loading screen
 */
object LoadingScreen {
  /**
   * React component
   */
  private val component = ScalaComponent.builder[Boolean]("LoadingScreen")
    .render_P(hidden => {
      val baseClassName = "position-fixed w-100 h-100 d-flex justify-content-center align-items-center flex-column"
      <.div(^.className := (if(hidden) baseClassName + " animated fadeOutUp" else baseClassName ),
        Zindex(5), Coloring.bg("Primary"),
        <.div(
          <.img(^.src := "https://streamlabs.com/images/gallery/default.gif"),
          <.h5(^.className := "text-white text-center mt-4", Typography.ff("VT323"),
            "Contacting HQ..."
          )
        )
      )
    }).build

  /**
   * Returns instance of react component
   * @param hidden Whether the loading screen should be hidden or not
   */
  def apply(hidden: Boolean) = component(hidden)
}
