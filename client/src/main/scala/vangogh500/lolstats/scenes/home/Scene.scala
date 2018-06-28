package vangogh500.lolstats.scenes.home

import japgolly.scalajs.react.extra.router.RouterCtl
import vangogh500.lolstats.services.AppRouter.{AppPage, SummonerProfilePage}
import japgolly.scalajs.react._
import japgolly.scalajs.react.vdom.html_<^._
import scalacss.ScalaCssReact._
import vangogh500.lolstats.scenes.home.components._

object Scene {
  private val component = ScalaComponent.builder[RouterCtl[AppPage]]("Home Page")
    .render_P(ctl =>
      <.div(
        Styling.container,
        ^.className := "d-flex flex-grow-1 align-items-center justify-content-center flex-column bg-primary",
        <.h1(
          ^.className := "display-3 text-white mb-5",
          "Begin the Climb"
        ),
        SummonerSearchBar { summonerName =>
          ctl.set(SummonerProfilePage(summonerName = summonerName, seasonId = "all", queueId = "all"))
        }
      )
    ).build
  def apply(ctl: RouterCtl[AppPage]) = component(ctl)
}
