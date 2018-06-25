package vangogh500.lolstats.components

import japgolly.scalajs.react._
import japgolly.scalajs.react.vdom.html_<^._
import scalacss.ScalaCssReact._
import vangogh500.lolstats.styling.{Coloring, Zindex}

object PrimaryNavBar {
  private val component = ScalaComponent.static("PrimaryNavBar")(
    <.nav(^.className := "navbar navbar-expand-sm navbar-dark", Coloring.bg(Coloring.colors("Primary")), Zindex(5),
      <.div(^.className := "container",
        <.a(^.className := "navbar-brand text-uppercase", ^.href := "/",
          "LoL Stats"
        ),
        <.ul(^.className := "navbar-nav ml-auto",
          <.li(^.className := "nav-item",
            <.a(^.className := "nav-link",
              <.i(^.className := "material-icons align-middle", "place"),
              <.span(^.className := "align-middle", "NA")
            )
          )
        )
      )
    )
  )
  def apply() = component()
}
