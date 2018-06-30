package vangogh500.lolstats
package scenes.summonerprofile

import japgolly.scalajs.react.extra.router.RouterCtl
import japgolly.scalajs.react._
import japgolly.scalajs.react.vdom.Attr
import japgolly.scalajs.react.vdom.html_<^._
import scalacss.ScalaCssReact._

import services.AppRouter.{AppPage}
import containers.{QueryBuilder}
import vangogh500.lolstats.components.{LoadingScreen}
import components.{NotFoundScreen, Banner}
import services.lolstats.{Schema => AppSchema}
import services.lolstats.{API => AppAPI}

/**
 * Summoner profile page
 */
object Scene {
  /**
   * React query component
   */
  private val pQuery = QueryBuilder[AppSchema.SummonerProfilePage]()
  /**
   * React props
   * @param ctl Router controller for redirects and links.
   * @param summonerName Summoner name
   */
  sealed case class Props(ctl: RouterCtl[AppPage], summonerName: String)

  /**
   * React component
   */
  private val component = ScalaComponent.builder[Props]("Home Page")
    .render_P {
      case Props(ctl, summonerName) =>
        pQuery(AppAPI.summonerProfilePage(summonerName), {
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
            case AppSchema.SummonerProfilePage(_, None) =>
              <.div(^.className := "w-100 h-100 d-flex flex-column",
                LoadingScreen(true),
                NotFoundScreen()
              )
            case AppSchema.SummonerProfilePage(queues, Some(AppSchema.SummonerProfile(id, accountId, name, profileIconId, level, _))) =>
              <.div(^.className := "w-100 h-100 d-flex flex-column",
                LoadingScreen(true),
                Banner(name, profileIconId)(
                  <.div(^.className := "btn-group btn-group-toggle ml-auto", Attr("dataToggle") := "buttons",
                    queues.map {
                      case AppSchema.Queue(id, name, url, icon) =>
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

  /**
   * Returns an instance of react component
   * @param ctl Router controller for redirects and links.
   * @param summonerName Summoner name
   */
  def apply(ctl: RouterCtl[AppPage], summonerName: String) = component(Props(ctl = ctl, summonerName = summonerName))
}
