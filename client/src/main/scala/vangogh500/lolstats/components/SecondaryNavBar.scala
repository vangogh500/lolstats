package vangogh500.lolstats.components

import japgolly.scalajs.react._
import japgolly.scalajs.react.vdom.html_<^._
import scalacss.ScalaCssReact._
import vangogh500.lolstats.styling.{Coloring, Spacing, Zindex}

object SecondaryNavBar {
  private val component = ScalaComponent.static("SecondaryNavBar")(
    <.div(^.className := "w-vw-100", Coloring.bg(Coloring.colors("Secondary"), 0.5), Spacing.mb(-40), Zindex(5),
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
  def apply() = component()
}
