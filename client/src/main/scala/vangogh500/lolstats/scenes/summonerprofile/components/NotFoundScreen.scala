package vangogh500.lolstats
package scenes.summonerprofile.components

import japgolly.scalajs.react._
import japgolly.scalajs.react.vdom.html_<^._
import scalacss.ScalaCssReact._

import styling.{Coloring, Zindex, Spacing, Typography}

/**
 * Not found screen
 */
object NotFoundScreen {
  /**
   * React component
   */
  private val component = ScalaComponent.static("404Screen")(
    <.div(^.className := "d-flex flex-grow-1 justify-content-center align-items-center flex-row",
      <.img(^.src := "https://orig00.deviantart.net/8719/f/2013/215/a/4/teemo_pixel_art___league_of_legends_by_deviant_mell-d6gjn2n.png"),
      <.div(^.className := "ml-5",
        <.h1("404"),
        <.p("Oops! We couldn't find the summoner here.")
      )
    )
  )
  /**
   * Returns an instance of react component
   */
  def apply() = component()
}
