package vangogh500.lolstats
package scenes.home.components

import japgolly.scalajs.react._
import japgolly.scalajs.react.vdom.html_<^._
import scalacss.ScalaCssReact._

import styling.{Coloring, Zindex}

object SummonerSearchBar {
  case class Props(onSubmit: String => Callback)
  case class State(summoner: String = "")
  class Backend($: BackendScope[Props, State]) {
    def onChange(e: ReactEventFromInput) = {
      val newVal = e.target.value
      $.modState(_.copy(summoner = newVal))
    }
    def render(props: Props, state: State): VdomElement = state match {
      case State(summoner) =>
        <.form(^.className := "w-50 mt-5",
          ^.onSubmit ==> { e =>
            e.preventDefaultCB >>
            props.onSubmit(state.summoner)
          },
          <.div(^.className := "input-group",
            <.input.search(^.className := "form-control text-muted",
              ^.placeholder := "Search",
              ^.aria.label := "Search",
              ^.value := summoner,
              ^.onChange ==> onChange
            ),
            <.div(^.className := "input-group-append",
              <.button(^.className := "btn btn-dark bg-primary-darken-2",
                ^.`type` := "submit",
                <.i(^.className := "material-icons", "search")
              )
            )
          )
        )
    }
  }
  private val component = ScalaComponent.builder[Props]("SummonerSearchBar")
    .initialState(State())
    .renderBackend[Backend]
    .build

  def apply(onSubmit: String => Callback) = component(Props(onSubmit))
}
