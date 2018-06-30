package vangogh500.lolstats
package services

import japgolly.scalajs.react.extra.router._
import japgolly.scalajs.react.vdom.html_<^._

import scenes._
import vangogh500.lolstats.components._

/**
 * App router
 */
object AppRouter {
  /**
   * App page
   */
  trait AppPage
  /**
   * Home page
   */
  case object HomePage extends AppPage

  /**
   * Summoner profile page
   * @param summonerName Summoner name
   * @param seasonId Season id
   * @param queueId Queue id
   */
  case class SummonerProfilePage(summonerName: String, seasonId: String, queueId: String) extends AppPage

  /**
   * Determines layout for app
   * @param ctl Router controller used for redirects and links
   * @param res Resolution of router page
   */
  def layout(ctl: RouterCtl[AppPage], res: Resolution[AppPage]) = {
    <.div(^.className := "w-100 h-100 d-flex flex-column",
      PrimaryNavBar(),
      SecondaryNavBar(),
      res.render()
    )
  }

  /**
   * React component
   */
  val component = Router(BaseUrl.fromWindowOrigin_/, RouterConfigDsl[AppPage].buildConfig { dsl =>
    import dsl._
    (emptyRule
    |   staticRoute(root, HomePage) ~> renderR(ctl => home.Scene(ctl))
    |   dynamicRouteCT(("summoner" / string("\\w+") / string("\\w+") / string("\\w+")).caseClass[SummonerProfilePage]) ~> dynRenderR {
          case (SummonerProfilePage(summonerName, _, _), ctl) => summonerprofile.Scene(ctl, summonerName)
        }
    ).notFound(redirectToPage(HomePage)(Redirect.Push))
    .renderWith(layout)
  })
  
  /**
   * Returns instance of react component
   */
  def apply() = component()
}
