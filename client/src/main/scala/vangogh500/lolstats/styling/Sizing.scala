package vangogh500.lolstats.styling

import scalacss.DevDefaults._
import japgolly.univeq._

/**
 * Size styling
 */
object Sizing extends StyleSheet.Inline {
  import dsl._
  /**
   * ScalaCSS domain
   */
  private val domain = Domain.ofRange(50 to 500 by 50)

  /**
   * Height styling
   * @param px Pixels
   */
  val h = styleF(domain)(num => styleS(
    height := num + "px"
  ))
  /**
   * Width styling
   * @param px Pixels
   */
  val w = styleF(domain)(num => styleS(
    width := num + "px"
  ))

  /**
   * Border width styling
   * @param px Pixels
   */
  val bWidth = styleF(Domain.ofRange(5 to 15 by 5))(num => styleS(
    borderWidth := num + "px !important"
  ))
}
