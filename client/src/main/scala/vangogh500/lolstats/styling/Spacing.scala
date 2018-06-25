package vangogh500.lolstats.styling

import scalacss.DevDefaults._
import japgolly.univeq._

object Spacing extends StyleSheet.Inline {
  import dsl._
  val domain = Domain.ofRange(-100 to 100 by 20)
  val mb = styleF(domain)(num => styleS(
    marginBottom := num + "px"
  ))
}
