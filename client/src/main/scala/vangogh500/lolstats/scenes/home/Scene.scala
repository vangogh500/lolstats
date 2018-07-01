package vangogh500.lolstats
package scenes.home

import japgolly.scalajs.react.extra.router.RouterCtl
import japgolly.scalajs.react._
import japgolly.scalajs.react.vdom.html_<^._
import scalacss.ScalaCssReact._

import services.AppRouter.{AppPage, SummonerProfilePage}
import components._
import styling.{Layout}

/**
 * Home page
 */
object Scene {
  /**
   * React component
   */
  private val component = ScalaComponent.builder[RouterCtl[AppPage]]("Home Page")
    .render_P(ctl =>
      <.div(
        VdomStyle("backgroundImage") := "url(\"/img/home_bg.png\")",
        ^.className := "d-flex flex-grow-1 align-items-center justify-content-center flex-column bg-primary",
        Layout.bgCenter, Layout.bgCover,
        <.h1(
          ^.className := "display-3 text-white mb-5",
          "Begin the Climb"
        ),
        SummonerSearchBar { summonerName =>
          ctl.set(SummonerProfilePage(summonerName = summonerName, seasonUrl = "all", queueUrl = "all"))
        }
      )
    ).build

  /**
   * Returns an instance of react component
   * @param ctl Router controller for redirects and links
   */
  def apply(ctl: RouterCtl[AppPage]) = component(ctl)
}
