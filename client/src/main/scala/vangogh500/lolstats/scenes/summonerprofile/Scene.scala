package vangogh500.lolstats
package scenes.summonerprofile

import japgolly.scalajs.react.extra.router.RouterCtl
import japgolly.scalajs.react._
import japgolly.scalajs.react.vdom.html_<^._
import scalacss.ScalaCssReact._

import services.AppRouter.{AppPage}
import services.riot.api.{Static => RiotStaticAPI}
import containers.{Query}
import services.lolstats.types.Summoner._
import services.lolstats.api.{Summoner => LolStatAPI}
import components.{LoadingScreen}
import styling.{Spacing, Layout}

object Scene {
  private val pQuery = Query[NormalizedStats]()
  case class Props(ctl: RouterCtl[AppPage], summonerName: String)

  private val component = ScalaComponent.builder[Props]("Home Page")
    .render_P {
      case Props(ctl, summonerName) =>
        pQuery(LolStatAPI.normalizedStats(summonerName), {
          case (true, _, _) => LoadingScreen()
          case (false, Some(error), _) => <.div()
          case (false, None, Some(data)) => data match {
            case NormalizedStats(id, accountId, Profile(name, profileIconId, level), _) =>
              <.div(Layout.bgCenter, Layout.bgCover, Spacing.pt(40),
                VdomStyle("backgroundImage") := "url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg)",
                <.div(^.className := "container",
                  <.div(^.className := "d-flex flex-row align-items-center my-4",
                    <.img(^.src := RiotStaticAPI.profileIconUrl(profileIconId)),
                    <.h4(^.className := "text-white ml-3", name)
                  )
                )
              )
          }
        })
    }.build
  def apply(ctl: RouterCtl[AppPage], summonerName: String) = component(Props(ctl = ctl, summonerName = summonerName))
}
