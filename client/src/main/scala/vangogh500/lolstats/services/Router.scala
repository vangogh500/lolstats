package vangogh500.lolstats.services

import japgolly.scalajs.react.extra.router._
import japgolly.scalajs.react.vdom.html_<^._

import vangogh500.lolstats.scenes._
import vangogh500.lolstats.components._

object AppRouter {
  sealed trait AppPage
  case object HomePage extends AppPage

  def apply() = Router(BaseUrl.fromWindowOrigin, RouterConfigDsl[AppPage].buildConfig { dsl =>
    import dsl._
    (emptyRule
    |  staticRoute(root, HomePage) ~> render(
        <.div(^.className := "w-100 h-100 d-flex flex-column",
          PrimaryNavBar(),
          SecondaryNavBar(),
          home.Scene()
        )
      )
    ).notFound(redirectToPage(HomePage)(Redirect.Replace))
  })()
}
