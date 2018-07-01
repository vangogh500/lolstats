package vangogh500.lolstats
package scenes.summonerprofile

import japgolly.scalajs.react.extra.router.RouterCtl
import japgolly.scalajs.react._
import japgolly.scalajs.react.vdom.Attr
import japgolly.scalajs.react.vdom.html_<^._
import scalacss.ScalaCssReact._

import services.AppRouter
import containers.{QueryBuilder}
import vangogh500.lolstats.components.{LoadingScreen}
import components.{NotFoundScreen, Banner}
import services.lolstats.{Schema => AppSchema}
import services.lolstats.{API => AppAPI}
import styling.Coloring

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
  sealed case class Props(ctl: RouterCtl[AppRouter.AppPage], summonerName: String, seasonUrl: String, queueUrl: String)

  /**
   * React component
   */
  private val component = ScalaComponent.builder[Props]("Summoner Profile Page")
    .render_P {
      case Props(ctl, summonerName, seasonUrl, queueUrl) =>
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
                      case AppSchema.Queue(id, name, url, icon) if url == queueUrl =>
                        <.a(^.key := "queue-nav-" + id,
                          ^.className := "btn px-3 py-2 text-white",
                          Coloring.button("Ternary"),
                          <.i(^.className := "material-icons align-middle", icon),
                          <.span(^.className := "align-middle", name))
                      case AppSchema.Queue(id, name, url, icon) =>
                        ctl.link(AppRouter.SummonerProfilePage(summonerName = summonerName, seasonUrl = seasonUrl, queueUrl = url))(
                          ^.key := "queue-nav-" + id,
                            ^.className := "btn px-3 py-2 text-white",
                            Coloring.button("Primary"),
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
  def apply(ctl: RouterCtl[AppRouter.AppPage], summonerName: String, seasonUrl: String, queueUrl: String) = component(
    Props(ctl = ctl, summonerName = summonerName, seasonUrl = seasonUrl, queueUrl = queueUrl))
}
