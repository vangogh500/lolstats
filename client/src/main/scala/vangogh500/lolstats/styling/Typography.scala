package vangogh500.lolstats.styling

import scalacss.DevDefaults._
import japgolly.univeq._

/**
 * Typography styling
 */
object Typography extends StyleSheet.Inline {
  import dsl._

  /**
   * Font types and font type/font family
   */
  private val fonts = Map[String, (String, String)](
    "VT323" -> ("VT323", "monospace")
  )

  /**
   * ScalaCSS domain
   */
  private val domain = Domain.ofValues(fonts.keys.toList:_*)

  /**
   * Font family styling
   * @param fontType Font type
   */
  val ff = styleF(domain)(fontName => fonts(fontName) match {
    case (name, family) => styleS(
      fontFamily := s"'$name', $family"
    )
  })
}
