package vangogh500.lolstats

import org.scalajs.dom.document
import japgolly.scalajs.react._
import japgolly.scalajs.react.vdom.html_<^._

object Client extends App {
  val NoArgs = ScalaComponent.static("No args")(<.div("Hello!"))
  NoArgs().renderIntoDOM(document.getElementById("app"))
}
