package vangogh500.lolstats.styling

import scalacss.DevDefaults._
import japgolly.univeq._

object Typography extends StyleSheet.Inline {
  import dsl._
  val fonts = Map[String, (String, String)](
    "VT323" -> ("VT323", "monospace")
  )
  val domain = Domain.ofValues(fonts.keys.toList:_*)
  val ff = styleF(domain)(fontName => fonts(fontName) match {
    case (name, family) => styleS(
      fontFamily := s"'$name', $family"
    )
  })
}
