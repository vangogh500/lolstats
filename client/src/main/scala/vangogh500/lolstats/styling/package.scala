package vangogh500.lolstats

import scalacss.DevDefaults._
import vangogh500.lolstats.scenes._

package object styling {
  def initializeStyling(): Unit = {
    home.Styling.addToDocument()
    Coloring.addToDocument()
    Layout.addToDocument()
    Spacing.addToDocument()
    Typography.addToDocument()
    Zindex.addToDocument()
  }
}
