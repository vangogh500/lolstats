package vangogh500.lolstats
package scenes.summonerprofile

import japgolly.scalajs.react.extra.router.RouterCtl
import japgolly.scalajs.react._
import japgolly.scalajs.react.vdom.Attr
import japgolly.scalajs.react.vdom.html_<^._
import scalacss.ScalaCssReact._

import services.AppRouter.{AppPage}
import containers.{Query}
import vangogh500.lolstats.components.{LoadingScreen}
import components.{NotFoundScreen, Banner}
import services.lolstats.Types.{SummonerProfile => SummonerProfileData, NormalizedSummonerStats => NormalizedSummonerStatsData, Queue => Queue}
import services.lolstats.{API => LolStatAPI}

object Scene {
  private val pQuery = Query[SummonerProfileData]()
  case class Props(ctl: RouterCtl[AppPage], summonerName: String)

  private val component = ScalaComponent.builder[Props]("Home Page")
    .render_P {
      case Props(ctl, summonerName) =>
        pQuery(LolStatAPI.summonerProfile(summonerName), {
          case (true, _, _) =>
            <.div(^.className := "w-100 h-100 d-flex flex-column",
              LoadingScreen(false)
            )
          case (false, Some(error), _) =>
            <.div(^.className := "w-100 h-100 d-flex flex-column",
              LoadingScreen(true),
              NotFoundScreen()
            )
          case (false, None, Some(data)) => data match {
            case SummonerProfileData(_, None) =>
              <.div(^.className := "w-100 h-100 d-flex flex-column",
                LoadingScreen(true),
                NotFoundScreen()
              )
            case SummonerProfileData(queues, Some(NormalizedSummonerStatsData(id, accountId, name, profileIconId, level, _))) =>
              <.div(^.className := "w-100 h-100 d-flex flex-column",
                LoadingScreen(true),
                Banner(name, profileIconId)(
                  <.div(^.className := "btn-group btn-group-toggle ml-auto", Attr("dataToggle") := "buttons",
                    queues.map {
                      case Queue(id, name, url, icon) =>
                      <.a(^.key := "queue-nav-" + id,
                        ^.className := "btn px-3 py-2 text-white",
                        <.i(^.className := "material-icons align-middle", icon),
                        <.span(^.className := "align-middle", name))
                    }.toTagMod
                  )
                )
              )
          }
        })
    }.build
  def apply(ctl: RouterCtl[AppPage], summonerName: String) = component(Props(ctl = ctl, summonerName = summonerName))
}
