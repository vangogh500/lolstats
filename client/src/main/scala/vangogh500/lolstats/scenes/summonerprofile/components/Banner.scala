package vangogh500.lolstats
package scenes.summonerprofile.components

import japgolly.scalajs.react._
import japgolly.scalajs.react.vdom.html_<^._
import scalacss.ScalaCssReact._

import services.riot.api.{Static => RiotStaticAPI}
import styling.{Spacing, Layout, Sizing, Coloring}

object Banner {
  case class Props(name: String, profileIconId: String)

  class Backend($: BackendScope[Props, Unit]) {
    def render(props: Props, propsChildren: PropsChildren) = props match {
      case Props(name, profileIconId) =>
        <.div(Layout.bgCenter, Layout.bgCover, Spacing.pt(40),
          VdomStyle("backgroundImage") := "url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg)",
          <.div(^.className := "container",
            <.div(^.className := "d-flex flex-row align-items-center my-4",
              <.img(^.src := RiotStaticAPI.profileIconUrl(profileIconId),
                ^.className := "img-thumbnail p-0 rounded-circle border border-platinum",
                Coloring.border("Platinum"), Sizing.bWidth(5), Sizing.h(100), Sizing.w(100)),
              <.h4(^.className := "text-white ml-3", name),
              propsChildren
            )
          )
        )
    }
  }

  private val component = ScalaComponent.builder[Props]("SummonerProfileBanner")
    .renderBackendWithChildren[Backend]
    .build

  def apply(name: String, profileIconId: String)(children: CtorType.ChildArg*) = component(Props(name, profileIconId))(children: _*)
}
