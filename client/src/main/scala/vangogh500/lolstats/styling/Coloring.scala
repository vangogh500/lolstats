package vangogh500.lolstats.styling

import scalacss.DevDefaults._
import japgolly.univeq._

/**
 * Color styling
 */
object Coloring extends StyleSheet.Inline {
  import dsl._

  /**
   * Utility
   */
  private object Util {
    /**
     * Regex representing color string prepended by hash like #F8F8F8 or #F8F
     */
    private val hexWithHash = """^(#)(.*)$""".r
    /**
     * Regex representing color string with 6 characters like #F8F8F8
     */
    private val hexSix = """^([0-9a-fA-F]{2,2})([0-9a-fA-F]{2,2})([0-9a-fA-F]{2,2})$""".r
    /**
     * Regex representing color string with 3 characters like #F8F
     */
    private val hexThree = """^([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$""".r
    /**
     * Converts a hex string to rgb values
     * @param hex Hex string
     */
    def hexToRGB(hex: String): (Int, Int, Int) = hex match {
      case hexWithHash(_, hexWOHash) =>
        hexToRGB(hexWOHash)
      case hexThree(r,b,g) =>
        hexToRGB(r + r + b + b + g + g)
      case hexSix(red, blue, green) =>
        (Integer.parseInt(red, 16), Integer.parseInt(blue, 16), Integer.parseInt(green, 16))
    }
  }

  /**
   * Color types and hex values
   */
  private val colors = Map[String, String](
    "Primary" -> "#0D0C1D",
    "Secondary" -> "#474973",
    "Ternary" -> "#474973",
    "Neon Pink" -> "#ff73d5",
    "Bronze" -> "#8C7853",
    "Silver" -> "#E6E8FA",
    "Gold" -> "#CFB53B",
    "Platinum" -> "#A0BFB4",
    "Diamond" -> "#b9f2ff"
  )

  /**
   * Color options
   * @param hex Hex string representing color
   * @param alpha Alpha
   */
  sealed case class ColorOpts(hex: String, alpha: Int)
  /**
   * Color options singleton
   */
  private object ColorOpts {
    /**
     * ScalaCSS universal equality
     */
    implicit def univEq: UnivEq[ColorOpts] = UnivEq.derive
    /**
     * Instantiate color opts
     * @param name Color type name
     * @param alpha Alpha from 0 to 1
     */
    def apply(name: String, alpha: Double): ColorOpts = new ColorOpts(hex = colors(name), alpha = (alpha * 100).toInt)
    /**
     * Instantiates color opts
     * @param name Color type name
     * @param alpha Alpha from 0 to 100
     */
    def apply(name: String, alpha: Int): ColorOpts = new ColorOpts(hex = colors(name), alpha = alpha)
  }
  /**
   * ScalaCSS domain
   */
  private val domain = Domain.ofValues(colors.keys.toList.flatMap(
    name => (0 to 10).map(i => ColorOpts(name = name, alpha = i * 10))
  ): _*)

  /**
   * Background color styling
   */
  private val p_bg = styleF(domain) {
    case ColorOpts(hex, alpha) =>
      val (red, blue, green) = Util.hexToRGB(hex)
      styleS(
        backgroundColor(dsl.rgba(red, blue, green, alpha / 100.0))
      )
  }
  /**
   * Color styling
   */
  private val p_color = styleF(domain) {
    case ColorOpts(hex, alpha) =>
      val (red, blue, green) = Util.hexToRGB(hex)
      styleS(
        dsl.color(dsl.rgba(red, blue, green, alpha / 100.0))
      )
  }
  /**
   * Border color styling
   */
  val p_border = styleF(domain) {
    case ColorOpts(hex, alpha) =>
      val (red, blue, green) = Util.hexToRGB(hex)
      styleS(
        borderColor(dsl.rgba(red, blue, green, alpha / 100.0)).important
      )
  }

  /**
   * Background styling
   * @param name Color type
   * @param alpha Alpha
   */
  def bg(name: String, alpha: Double = 1) = p_bg(ColorOpts(name = name, alpha = alpha))

  /**
   * Color styling
   * @param name Color type
   * @param alpha Alpha
   */
  def color(name: String, alpha: Double = 1) = p_color(ColorOpts(name = name, alpha = alpha))
  
  /**
   * Border color styling
   * @param name Color type
   * @param alpha Alpha
   */
  def border(name: String, alpha: Double = 1) = p_border(ColorOpts(name = name, alpha = alpha))
}
