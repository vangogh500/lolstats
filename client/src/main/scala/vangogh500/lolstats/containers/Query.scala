package vangogh500.lolstats.containers

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import scala.util.{Success, Failure}
import japgolly.scalajs.react._
import japgolly.scalajs.react.vdom.html_<^._

class Query[T](component: ScalaComponent[Query.Props[T], Query.State[T], _, CtorType.Props]) {
  def apply(getData: Future[T], child: (Boolean, Option[String], Option[T]) => VdomElement) = component(Query.Props(getData, child))
}

object Query {
  case class Props[T](getData: Future[T], child: (Boolean, Option[String], Option[T]) => VdomElement)
  case class State[T](loading: Boolean = true, error: Option[String] = None, data: Option[T] = None)
  class Backend[T]($: BackendScope[Props[T], State[T]]) {
    def componentDidMount = {
      $.props >>= { props =>
        Callback.future(props.getData transform {
          case Success(data) => Success($.modState(_.copy(loading = false, data = Some(data))))
          case Failure(e) => Success($.modState(_.copy(loading = false, error = Some(e.getMessage))))
        })
      }
    }
    def render(props: Props[T], state: State[T]) = state match {
      case State(loading, error, data) => props.child(loading, error, data)
    }
  }
  def apply[T]() = new Query(ScalaComponent.builder[Props[T]]("Query")
    .initialState(State[T]())
    .renderBackend[Backend[T]]
    .componentDidMount(_.backend.componentDidMount)
    .build)
}


// Query[]
