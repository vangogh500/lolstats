package vangogh500.lolstats.containers

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import scala.util.{Success, Failure}
import japgolly.scalajs.react._
import japgolly.scalajs.react.vdom.html_<^._

/**
 * Query builder
 * @param component React component
 */
class QueryBuilder[T](component: ScalaComponent[QueryBuilder.Props[T], QueryBuilder.State[T], _, CtorType.Props]) {
  /**
   * Returns an instance of react component
   * @param data Future to data that is being fetched
   * @param child React child
   */
  def apply(data: Future[T], child: (Boolean, Option[String], Option[T]) => VdomElement) = component(QueryBuilder.Props(data, child))
}

/**
 * Query builder
 */
object QueryBuilder {
  /**
   * React props
   * @param data Future to data that is being fetched
   * @param child React child
   */
  sealed case class Props[T](data: Future[T], child: (Boolean, Option[String], Option[T]) => VdomElement)
  /**
   * React state
   * @param loading Whether the resource is still being fetched
   * @param error Error during fetching of resource
   * @param data Data which was retrieved
   */
  sealed case class State[T](loading: Boolean = true, error: Option[String] = None, data: Option[T] = None)
  /**
   * React backend
   * @param $ React backend scope
   */
  private class Backend[T]($: BackendScope[Props[T], State[T]]) {
    def componentDidMount = {
      $.props >>= { props =>
        Callback.future(props.data transform {
          case Success(data) => Success($.modState(_.copy(loading = false, data = Some(data))))
          case Failure(e) => Success($.modState(_.copy(loading = false, error = Some(e.getMessage))))
        })
      }
    }
    def render(props: Props[T], state: State[T]) = state match {
      case State(loading, error, data) => props.child(loading, error, data)
    }
  }
  /**
   * Returns an instance of a query builder
   */
  def apply[T]() = new QueryBuilder[T](ScalaComponent.builder[Props[T]]("Query")
    .initialState(State[T]())
    .renderBackend[Backend[T]]
    .componentDidMount(_.backend.componentDidMount)
    .build)
}


// Query[]
