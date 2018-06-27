package vangogh500.lolstats.scenes.home.components

import japgolly.scalajs.react._
import japgolly.scalajs.react.vdom.html_<^._
import scalacss.ScalaCssReact._
import vangogh500.lolstats.styling.{Coloring, Zindex}

object SummonerSearchBar {
  case class State(summoner: String = "")
  class Backend($: BackendScope[Unit, State]) {
    def onChange(e: ReactEventFromInput) = {
      val newVal = e.target.value
      $.modState(_.copy(summoner = newVal))
    }
    def onSubmit(e: ReactEventFromInput) = {
      e.preventDefaultCB
    }
    def render(state: State): VdomElement = state match {
      case State(summoner) =>
        println(summoner)
        <.form(^.className := "w-50 mt-5", ^.onSubmit ==> onSubmit,
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
  private val component = ScalaComponent.builder[Unit]("SummonerSearchBar")
    .initialState(State())
    .renderBackend[Backend]
    .build

  def apply() = component()
}
