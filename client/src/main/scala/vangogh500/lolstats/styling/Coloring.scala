package vangogh500.lolstats.styling

import scalacss.DevDefaults._
import japgolly.univeq._

object Coloring extends StyleSheet.Inline {
  import dsl._

  object Util {
    val hexWithHash = """^(#)(.*)$""".r
    val hexSix = """^([0-9a-fA-F]{2,2})([0-9a-fA-F]{2,2})([0-9a-fA-F]{2,2})$""".r
    val hexThree = """^([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$""".r
    def hexToRGB(hex: String): (Int, Int, Int) = hex match {
      case hexWithHash(_, hexWOHash) =>
        hexToRGB(hexWOHash)
      case hexThree(r,b,g) =>
        hexToRGB(r + r + b + b + g + g)
      case hexSix(red, blue, green) =>
        (Integer.parseInt(red, 16), Integer.parseInt(blue, 16), Integer.parseInt(green, 16))
    }
  }
  private val colors = Map[String, String](
    "Primary" -> "#0D0C1D",
    "Secondary" -> "#474973",
    "Ternary" -> "#474973",
    "Neon Pink" -> "#ff73d5"
  )

  case class ColorOpts(hex: String, alpha: Int)
  object ColorOpts {
    implicit def univEq: UnivEq[ColorOpts] = UnivEq.derive
    def apply(name: String, alpha: Double): ColorOpts = new ColorOpts(hex = colors(name), alpha = (alpha * 100).toInt)
    def apply(name: String, alpha: Int): ColorOpts = new ColorOpts(hex = colors(name), alpha = alpha)
  }

  val domain = Domain.ofValues(colors.keys.toList.flatMap(
    name => (0 to 10).map(i => ColorOpts(name = name, alpha = i * 10))
  ): _*)

  val p_bg = styleF(domain) {
    case ColorOpts(hex, alpha) =>
      val (red, blue, green) = Util.hexToRGB(hex)
      styleS(
        backgroundColor(dsl.rgba(red, blue, green, alpha / 100.0))
      )
  }
  val p_color = styleF(domain) {
    case ColorOpts(hex, alpha) =>
      val (red, blue, green) = Util.hexToRGB(hex)
      styleS(
        dsl.color(dsl.rgba(red, blue, green, alpha / 100.0))
      )
  }
  def bg(name: String, alpha: Double = 1) = p_bg(ColorOpts(name = name, alpha = alpha))
  def color(name: String, alpha: Double = 1) = p_color(ColorOpts(name = name, alpha = alpha))
}
