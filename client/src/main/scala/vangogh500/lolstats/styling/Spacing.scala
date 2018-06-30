package vangogh500.lolstats.styling

import scalacss.DevDefaults._
import japgolly.univeq._

/**
 * Space styling
 */
object Spacing extends StyleSheet.Inline {
  import dsl._
  /**
   * ScalaCSS domain
   */
  private val domain = Domain.ofRange(-100 to 100 by 20)

  /**
   * Margin bottom styling
   * @param px Pixels
   */
  val mb = styleF(domain)(num => styleS(
    marginBottom := num + "px"
  ))

  /**
   * Margin top styling
   * @param px Pixels
   */
  val mt = styleF(domain)(num => styleS(
    marginTop := num + "px"
  ))

  /**
   * Margin left styling
   * @param px Pixels
   */
  val ml = styleF(domain)(num => styleS(
    marginLeft := num + "px"
  ))

  /**
   * Margin vertical styling
   * @param px Pixels
   */
  val my = styleF(domain)(num => styleS(
    marginTop := num + "px",
    marginBottom := num + "px"
  ))

  /**
   * Padding top styling
   * @param px Pixels
   */
  val pt = styleF(domain)(num => styleS(
    paddingTop := num + "px"
  ))
}
