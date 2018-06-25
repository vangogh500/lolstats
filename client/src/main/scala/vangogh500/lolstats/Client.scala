package vangogh500.lolstats

import org.scalajs.dom.document
import vangogh500.lolstats.services.AppRouter
import vangogh500.lolstats.styling.initializeStyling

object Client extends App {
  initializeStyling()
  AppRouter().renderIntoDOM(document.getElementById("app"))
}
