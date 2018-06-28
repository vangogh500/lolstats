package vangogh500.lolstats.services

import japgolly.scalajs.react.extra.router._
import japgolly.scalajs.react.vdom.html_<^._

import vangogh500.lolstats.scenes._
import vangogh500.lolstats.components._

object AppRouter {
  trait AppPage
  case object HomePage extends AppPage
  case object TestPage extends AppPage
  case class SummonerProfilePage(summonerName: String, seasonId: String, queueId: String) extends AppPage

  def layout(ctl: RouterCtl[AppPage], res: Resolution[AppPage]) = {
    <.div(^.className := "w-100 h-100 d-flex flex-column",
      PrimaryNavBar(),
      SecondaryNavBar(),
      res.render()
    )
  }
  val component = Router(BaseUrl.fromWindowOrigin_/, RouterConfigDsl[AppPage].buildConfig { dsl =>
    import dsl._
    (emptyRule
    |   staticRoute(root, HomePage) ~> renderR(ctl => home.Scene(ctl))
    |   staticRoute("test", TestPage) ~> render(<.h1("TEST"))
    |   dynamicRouteCT(("summoner" / string("\\w+") / string("\\w+") / string("\\w+")).caseClass[SummonerProfilePage]) ~> render(<.h1("TEST"))
    ).notFound(redirectToPage(HomePage)(Redirect.Push))
    .renderWith(layout)
  })
  def apply() = component()
}
