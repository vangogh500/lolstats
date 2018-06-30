package vangogh500.lolstats.styling

import scalacss.DevDefaults._

/**
 * Zindex styling
 */
object Zindex extends StyleSheet.Inline {
  import dsl._

  /**
   * ScalaCSS domain
   */
  private val domain = Domain.ofRange(1 to 5)

  /**
   * Zindex styling
   */
  private val zindex = styleF(domain)(num => styleS(
    zIndex(num)
  ))

  /**
   * Zindex styling
   * @param num Zindex
   */
  def apply(num: Int) = zindex(num)
}
