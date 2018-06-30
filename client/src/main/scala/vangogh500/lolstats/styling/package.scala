package vangogh500.lolstats

import scalacss.DevDefaults._
import vangogh500.lolstats.scenes._

/**
 * Styling for app
 */
package object styling {
  /**
   * Initialize/load styles into page
   */
  def initializeStyling(): Unit = {
    Coloring.addToDocument()
    Layout.addToDocument()
    Sizing.addToDocument()
    Spacing.addToDocument()
    Typography.addToDocument()
    Zindex.addToDocument()
  }
}
