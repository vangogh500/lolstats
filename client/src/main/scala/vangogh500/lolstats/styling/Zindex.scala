package vangogh500.lolstats.styling

import scalacss.DevDefaults._

object Zindex extends StyleSheet.Inline {
  import dsl._

  val domain = Domain.ofRange(1 to 5)

  val zindex = styleF(domain)(num => styleS(
    zIndex(num)
  ))
  def apply(num: Int) = zindex(num)
}
