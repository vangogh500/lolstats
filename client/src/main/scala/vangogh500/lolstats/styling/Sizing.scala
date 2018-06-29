package vangogh500.lolstats.styling

import scalacss.DevDefaults._
import japgolly.univeq._

object Sizing extends StyleSheet.Inline {
  import dsl._
  val domain = Domain.ofRange(50 to 500 by 50)
  val h = styleF(domain)(num => styleS(
    height := num + "px"
  ))
  val w = styleF(domain)(num => styleS(
    width := num + "px"
  ))
  val bWidth = styleF(Domain.ofRange(5 to 15 by 5))(num => styleS(
    borderWidth := num + "px !important"
  ))
}
