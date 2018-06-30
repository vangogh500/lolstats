package vangogh500.lolstats
package components

import japgolly.scalajs.react._
import japgolly.scalajs.react.vdom.html_<^._
import scalacss.ScalaCssReact._

import styling.{Coloring, Spacing, Zindex}

/**
 * Secondary nav bar
 */
object SecondaryNavBar {
  /**
   * React component
   */
  private val component = ScalaComponent.static("SecondaryNavBar")(
    <.div(^.className := "w-vw-100", Coloring.bg("Secondary", 0.5), Spacing.mb(-40), Zindex(5),
      <.div(^.className := "container",
        <.nav(^.className := "nav",
          <.a(^.className := "nav-item nav-link text-light active", ^.href := "/",
            "Summoner"
          ),
          <.a(^.className := "nav-item nav-link text-light", ^.href := "/",
            "Champion"
          ),
          <.a(^.className := "nav-item nav-link text-light", ^.href := "/",
            "Leaderboard"
          )
        )
      )
    )
  )

  /**
   * Returns instance of react component
   */
  def apply() = component()
}
