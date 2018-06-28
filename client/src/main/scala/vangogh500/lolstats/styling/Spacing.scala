package vangogh500.lolstats.styling

import scalacss.DevDefaults._
import japgolly.univeq._

object Spacing extends StyleSheet.Inline {
  import dsl._
  val domain = Domain.ofRange(-100 to 100 by 20)
  val mb = styleF(domain)(num => styleS(
    marginBottom := num + "px"
  ))
  val mt = styleF(domain)(num => styleS(
    marginTop := num + "px"
  ))
  val ml = styleF(domain)(num => styleS(
    marginLeft := num + "px"
  ))
  val my = styleF(domain)(num => styleS(
    marginTop := num + "px",
    marginBottom := num + "px"
  ))
  val pt = styleF(domain)(num => styleS(
    paddingTop := num + "px"
  ))
}
